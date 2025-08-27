import React, { useRef, useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import bg from '~/assets/Pecs/bg.png';
import boy from '~/assets/Pecs/boy.png';
import instruction from '~/assets/Pecs/instruction.png';
import exit from '~/assets/Pecs/exit.png';
import { DraggableCard } from './Card/Card';
import { DroppableCharacter } from './Character/Character';
import { BoxChat } from './BoxChat/BoxChat';
import { getAllAnimalsService } from '~/service/animalService';
import { ttsFunction } from '../../service/ttsService';
import { playSoundNTimes } from './Sound/Sound';
import './Phase.css';

export const Phase2 = () => {
    const frameRef = useRef(null);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const [cards, setCards] = useState([]);
    const [animalSelect, setAnimalSelect] = useState(null);
    const [droppedAnimals, setDroppedAnimals] = useState([]);
    const [effectAnimal, setEffectAnimal] = useState(null);
    const [showInstruction, setShowInstruction] = useState(true);
    const [textSelect, setTextSelect] = useState('');
    const [firstRoundDone, setFirstRoundDone] = useState(0);
    const [isContinue, setIsContinue] = useState(false);

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

    useEffect(() => {
        async function fetchData() {
            const response = await getAllAnimalsService();
            const animals = response.animals;
            const shuffled = [...animals].sort(() => 0.5 - Math.random());
            const selectedAnimals = shuffled.slice(0, 5);

            const positionsCopy = [...pos.animalsPositions];
            const cardsWithPos = selectedAnimals.map(item => {
                let position = item.name === 'fish'
                    ? pos.fish
                    : positionsCopy.splice(randomIndex(0, positionsCopy.length - 1), 1)[0];
                return {
                    id: item.name,
                    src: item.image,
                    caption: item.name,
                    sound: item.sound,
                    pos: position
                };
            });

            setCards(cardsWithPos);

            const firstAnimal = cardsWithPos[randomIndex(0, cardsWithPos.length - 1)];
            setAnimalSelect(firstAnimal);
            setTextSelect(`Find the ${firstAnimal.id}!`);
        }
        fetchData();
    }, []);

    const handleCloseInstruction = () => {
        setShowInstruction(false);
        if (animalSelect) onSound(textSelect, 'male');
    };

    // ESC -> đóng popup
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && handleCloseInstruction();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [animalSelect, textSelect]);

    // Click ngoài modal -> đóng
    useEffect(() => {
        if (!showInstruction) return;
        const onClickAnywhere = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleCloseInstruction();
            }
        };
        document.addEventListener("mousedown", onClickAnywhere);
        return () => document.removeEventListener("mousedown", onClickAnywhere);
    }, [showInstruction, animalSelect, textSelect]);

    // Chặn scroll khi mở modal
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

    const onSound = async (text, gender) => {
        const response = await ttsFunction({ text, gender });
        const audioBlob = new Blob([response], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
        new Audio(audioUrl).play();
    };

    const handleDragEnd = async ({ active, over }) => {
        if (!active || !over) return;

        const draggedCard = cards.find(c => c.id === active.id);
        if (!draggedCard) return;

        setDroppedAnimals(prev => {
            const newDropped = [...prev, draggedCard.id];

            if (firstRoundDone < 2) {
                if (draggedCard.id === animalSelect?.id) {
                    onSound(`I want ${draggedCard.id}`, 'male');
                    playSoundNTimes(draggedCard.sound, 1);

                    const nextRound = firstRoundDone + 1;
                    setFirstRoundDone(nextRound);

                    if (nextRound === 1) {
                        const remaining = cards.filter(c => !newDropped.includes(c.id));
                        if (remaining.length > 0) {
                            const nextAnimal = remaining[randomIndex(0, remaining.length - 1)];
                            setAnimalSelect(nextAnimal);
                            const newText = `Now, find the ${nextAnimal.id}!`;
                            setTextSelect(newText);
                            setTimeout(() => onSound(newText, 'male'), 1500);
                        }
                    } else if (nextRound === 2) {
                        const newText = `Now, choose an animal that you like !`;
                        setTextSelect(newText);
                        setTimeout(() => onSound(newText, 'male'), 1500);
                    }

                    setEffectAnimal(draggedCard.id);
                    setTimeout(() => setEffectAnimal(null), 1000);
                } else {
                    onSound('Try again!', 'female');
                }
            } else {
                // Các lượt sau: kéo thoải mái
                onSound(`I want ${draggedCard.id}`, 'male');
                playSoundNTimes(draggedCard.sound, 1);
                setEffectAnimal(draggedCard.id);
                setTimeout(() => setEffectAnimal(null), 1000);
            }

            if (newDropped.length === cards.length) setIsContinue(true);
            return newDropped;
        });
    };

    const character = (
        <DroppableCharacter
            id="droppable"
            src={boy}
            style={{ left: `${pos.char.xPct}%`, top: `${pos.char.yPct}%`, position: "absolute" }}
        />
    );

    return (
        <div className="container-phase">
            {isContinue && (
                <button className="button-continue" onClick={() => navigate('/phase3p1')}>
                    Continue
                </button>
            )}

            <div className={`stage ${showInstruction ? "dimmed" : ""}`} aria-hidden={showInstruction}>
                <div className="phase-background" ref={frameRef}>
                    <img src={bg} alt="Phase Background" className="phase-image" />
                    <DndContext onDragEnd={handleDragEnd}>
                        {cards.filter(c => !droppedAnimals.includes(c.id)).map(c => (
                            <DraggableCard
                                key={c.id}
                                id={c.id}
                                src={c.src}
                                caption={c.caption}
                                style={{ left: `${c.pos.xPct}%`, top: `${c.pos.yPct}%` }}
                                animate={false}
                            />
                        ))}
                        {character}
                        {effectAnimal && (() => {
                            const c = cards.find(c => c.id === effectAnimal);
                            if (!c) return null;
                            return (
                                <div key={`ghost-${c.id}`} className="card animate ghost"
                                    style={{ left: `${pos.char.xPct}%`, top: `${pos.char.yPct}%`, position: 'absolute' }}>
                                    <div className="caption">{c.caption}</div>
                                    <img src={c.src} alt={c.caption} draggable="false" />
                                </div>
                            );
                        })()}
                    </DndContext>
                    <BoxChat posX={600} posY={100} text={textSelect} />
                </div>

                <div className="setting-phase">
                    <img src={instruction} alt="instruction" onClick={() => setShowInstruction(true)} className="btn-icon" />
                    <img src={exit} alt="exit" onClick={() => navigate("/homescreen")} className="btn-icon" />
                </div>
            </div>

            {showInstruction && <ModalPortal><div className="screen-dim" /></ModalPortal>}

            {showInstruction && (
                <ModalPortal>
                    <div className="modal" role="dialog" aria-modal="true" aria-label="Hướng dẫn">
                        <div className="modal-backdrop" onClick={() => setShowInstruction(false)} />
                        <div className="modal-content" ref={modalRef} tabIndex={-1}>
                            <h2 className="modal-title">Phase 2 Instructions</h2>
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
