import React, { useRef, useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import bg from '~/assets/Pecs/bg.png';
import boy from '~/assets/Pecs/boy.png';
import instruction from '~/assets/Pecs/instruction.png';
import exit from '~/assets/Pecs/exit.png';
import { createPortal } from 'react-dom';
import { DraggableCard } from './Card/Card';
import { DroppableCharacter } from './Character/Character';
import './Phase.css';
import { playSoundNTimes } from './Sound/Sound';
import { useNavigate } from 'react-router-dom';
import { BoxChat } from './BoxChat/BoxChat';
import { getAllAnimalsService } from '~/service/animalService';
import { ttsFunction } from '../../service/ttsService';

export const Phase1 = () => {
    const frameRef = useRef(null);
    const modalRef = useRef(null);

    const [cards, setCards] = useState([]);
    const [animalSelect, setAnimalSelect] = useState(null);
    const [showInstruction, setShowInstruction] = useState(true);
    const [firstRoundDone, setFirstRoundDone] = useState(false);
    const [droppedAnimals, setDroppedAnimals] = useState([]);
    const [effectAnimal, setEffectAnimal] = useState(null);
    const [isContinue, setIsContinue] = useState(false);
    const navigate = useNavigate();

    const pos = {
        char: { xPct: 70, yPct: 50 },
        fish: { xPct: 20, yPct: 80 },
        animalsPositions: [
            { xPct: 35, yPct: 44 },
            { xPct: 40, yPct: 68 },
            { xPct: 45, yPct: 32 },
            { xPct: 50, yPct: 56 },
            { xPct: 55, yPct: 30 },
            { xPct: 60, yPct: 76 },
            { xPct: 65, yPct: 48 }
        ]
    };

    function randomIndex(start, finish) {
        return Math.floor(Math.random() * (finish - start + 1) + start);
    }

    // Lấy data từ backend
    useEffect(() => {
        async function fetchData() {
            const response = await getAllAnimalsService();
            const animals = response.animals;

            const positionsCopy = [...pos.animalsPositions];
            const cardsWithPos = animals.map((item) => {
                let position;
                if (item.name === 'fish') {
                    position = pos.fish;
                } else {
                    let idx = randomIndex(0, positionsCopy.length - 1);
                    position = positionsCopy[idx];
                    positionsCopy.splice(idx, 1);
                }
                return {
                    id: item.name,
                    src: item.image,
                    caption: item.name,
                    sound: item.sound,
                    pos: position
                };
            });

            setCards(cardsWithPos);

            // chọn 1 con random làm mục tiêu đầu tiên
            const indexSel = randomIndex(0, animals.length - 1);
            setAnimalSelect(animals[indexSel]);
            const textSpeed = `Find the ${animals[indexSel].name}!`
            setTextSelect(textSpeed);
        }

        fetchData();
    }, []);


    // ESC -> đóng popup
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setShowInstruction(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [animalSelect]);


    // click ngoài modal -> đóng
    useEffect(() => {
        if (!showInstruction) return;
        const onClickAnywhere = (e) => {
            if (!modalRef.current) return;
            if (!modalRef.current.contains(e.target)) {
                setShowInstruction(false);
            }
        };
        document.addEventListener("mousedown", onClickAnywhere);
        return () => document.removeEventListener("mousedown", onClickAnywhere);
    }, [showInstruction, animalSelect]);


    // chặn scroll khi mở modal
    useEffect(() => {
        if (showInstruction) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = prev; };
        }
    }, [showInstruction]);

    function ModalPortal({ children }) {
        return createPortal(children, document.body);
    }

    // Xử lý kéo thả
    async function handleDragEnd({ active, over }) {
        if (!frameRef.current || !active) return;
        if (!over) return;

        const draggedCard = cards.find(c => c.id === active.id);
        if (!draggedCard) return;

        setDroppedAnimals(prev => [...prev, draggedCard.id]);
        await onSound(`I want a ${draggedCard.id}`, 'male');
        playSoundNTimes(draggedCard.sound, 1);

        setEffectAnimal(draggedCard.id);
        setTimeout(() => setEffectAnimal(null), 1000);

        console.log(droppedAnimals.length);

        if (droppedAnimals.length === 7) {
            setIsContinue(true);
        }
    }
    const onSound = async (text, gender) => {
        const response = await ttsFunction({
            text: text,
            gender: gender,
        });

        const audioBlob = new Blob([response], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        audio.play();
    };

    const character = (
        <DroppableCharacter
            id="droppable"
            src={boy}
            style={{
                left: `${pos.char.xPct}%`,
                top: `${pos.char.yPct}%`,
                position: "absolute"
            }}
        />
    );

    return (
        <div className="container-phase">
            {isContinue && (
                <button
                    className="button-continue"
                    onClick={() => navigate('/phase2')}
                >
                    Continue
                </button>
            )}

            <div className={`stage ${showInstruction ? "dimmed" : ""}`} aria-hidden={showInstruction}>
                <div className="phase-background" ref={frameRef}>
                    <img src={bg} alt="Phase Background" className="phase-image" />

                    <DndContext onDragEnd={handleDragEnd}>
                        {/* Chỉ hiển thị 1 con vật chưa thả */}
                        {cards.length > 0 && droppedAnimals.length < cards.length && (() => {
                            const nextAnimal = cards[droppedAnimals.length];
                            return (
                                <DraggableCard
                                    key={nextAnimal.id}
                                    id={nextAnimal.id}
                                    src={nextAnimal.src}
                                    caption={nextAnimal.caption}
                                    style={{
                                        left: `${nextAnimal.pos.xPct}%`,
                                        top: `${nextAnimal.pos.yPct}%`
                                    }}
                                    animate={false}
                                />
                            );
                        })()}

                        {character}

                        {/* hiệu ứng khi thả đúng */}
                        {effectAnimal && (() => {
                            const c = cards.find(c => c.id === effectAnimal);
                            if (!c) return null;
                            return (
                                <div
                                    key={`ghost-${c.id}`}
                                    className="card animate ghost"
                                    style={{
                                        left: `${pos.char.xPct}%`,
                                        top: `${pos.char.yPct}%`,
                                        position: 'absolute'
                                    }}
                                >
                                    <div className="caption">{c.caption}</div>
                                    <img src={c.src} alt={c.caption} draggable="false" />
                                </div>
                            );
                        })()}
                    </DndContext>
                </div>

                <div className="setting-phase">
                    <img src={instruction} alt="instruction" onClick={() => setShowInstruction(true)} className="btn-icon" />
                    <img src={exit} alt="exit" onClick={() => navigate("/homescreen")} className="btn-icon" />
                </div>
            </div>

            {showInstruction && (
                <ModalPortal>
                    <div className="screen-dim" />
                </ModalPortal>
            )}

            {showInstruction && (
                <ModalPortal>
                    <div className="modal" role="dialog" aria-modal="true" aria-label="Hướng dẫn">
                        <div className="modal-backdrop" onClick={() => setShowInstruction(false)} />
                        <div className="modal-content" ref={modalRef} tabIndex={-1}>
                            <h2 className="modal-title">Phase 1 Instructions</h2>
                            <div className="modal-body">
                                <p>Hãy kéo thả con vật đúng theo hướng dẫn, sau đó thử với những con khác!</p>
                            </div>
                        </div>
                    </div>
                </ModalPortal>
            )}
        </div>
    );

};
