import React, { useRef, useState, useEffect, use } from 'react';
import { DndContext } from '@dnd-kit/core';
import bg from '~/assets/Pecs/bg.png';
import pig from '~/assets/Pecs/pig.png';
import boy from '~/assets/Pecs/boy.png';
import instruction from '~/assets/Pecs/instruction.png';
import exit from '~/assets/Pecs/exit.png';
import { createPortal } from 'react-dom';
import { DraggableCard } from './Card/Card';
import { DroppableCharacter } from './Character/Character';
import './Phase.css';
import { playSoundNTimes } from './Sound/Sound';
import soundEffect from '~/assets/Pecs/pig-sound.mp3';
import { useNavigate } from 'react-router-dom';
import { ttsFunction } from '~/service/ttsService'

import { BoxChat } from './BoxChat/BoxChat';
import { getAllAnimalsService, getAnimalByIdService } from '~/service/animalService'

export const Phase3p3 = () => {
    const frameRef = useRef(null);
    const modalRef = useRef(null);
    const [cards, setCards] = useState([]);
    const [parent, setParent] = useState(null);
    const [effect, setEffect] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [findAnimal, setFindAnimal] = useState('bear');
    const [showInstruction, setShowInstruction] = useState(false);
    const [animalsArray, setAnimalsArray] = useState([]);
    const [textSelect, setTextSelect] = useState('Find the bear!');
    const [animalSelect, setAnimalSelect] = useState(0);
    const [isContinue, setIsContinue] = useState(false);

    //Animal bị xóa
    const [droppedAnimals, setDroppedAnimals] = useState([]);
    const [effectAnimal, setEffectAnimal] = useState(null);


    const navigate = useNavigate();
    const [pos, setPos] = useState({
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
    });

    // Random index of array animal
    function randomIndex(start, finish) {
        return Math.floor(Math.random() * (finish - start + 1) + start);
    }

    // Get data from backend
    useEffect(() => {
        async function fetchData() {
            const response = await getAllAnimalsService();
            const animals = response.animals;

            // 🔹 Chọn ngẫu nhiên 2 con từ mảng animals
            const shuffled = [...animals].sort(() => 0.5 - Math.random());
            const selectedAnimals = shuffled.slice(0, 8);

            const positionsCopy = [...pos.animalsPositions];
            const cardsWithPos = selectedAnimals.map((item) => {
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

            // 🔹 Chọn 1 trong 2 con làm mục tiêu hiển thị trong BoxChat
            const indexSel = randomIndex(0, selectedAnimals.length - 1);
            setAnimalSelect(selectedAnimals[indexSel]);
            const textSpeed = `Choose the ${selectedAnimals[indexSel].name}!`
            setTextSelect(textSpeed);
        }

        fetchData();
    }, []);

    const handleCloseInstruction = () => {
        setShowInstruction(false);
        if (animalSelect) {
            onSound(textSelect, 'male');
        }
    };

    // Khi animalSelect thay đổi (sau fetch) thì phát âm thanh
    useEffect(() => {
        if (animalSelect && animalSelect.name) {
            setTimeout(() => onSound(`Choose the ${animalSelect.name}!`, 'male'), 1000);
        }
    }, [animalSelect]);


    // ESC -> đóng popup
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && handleCloseInstruction();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [animalSelect, textSelect]);


    // click ngoài modal -> đóng
    useEffect(() => {
        if (!showInstruction) return;
        const onClickAnywhere = (e) => {
            if (!modalRef.current) return;
            if (!modalRef.current.contains(e.target)) {
                handleCloseInstruction();
            }
        };
        document.addEventListener("mousedown", onClickAnywhere);
        return () => document.removeEventListener("mousedown", onClickAnywhere);
    }, [showInstruction, animalSelect, textSelect]);

    const openInstruction = () => setShowInstruction(true);
    const closeInstruction = () => setShowInstruction(false);

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
        const response = await ttsFunction({
            text: text,
            gender: gender,
        });

        const audioBlob = new Blob([response], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        audio.play();
    };


    // set vị trí ban đầu của các thẻ


    const clamp = (v) => Math.max(0, Math.min(100, v));

    // Xử lý kéo thả
    async function handleDragEnd({ active, over }) {
        if (!frameRef.current || !active) return;

        // Nếu thả vào droppable thì xóa luôn
        if (over) {
            const draggedCard = cards.find(c => c.id === active.id);

            if (draggedCard.id === animalSelect.name) {
                setDroppedAnimals(prev => [...prev, draggedCard.id]);
                await onSound(`I want ${animalSelect.name}`);
                playSoundNTimes(animalSelect.sound, 1);


                // bật hiệu ứng
                // setEffect(true);
                setEffectAnimal(draggedCard.id);

                // sau 1s (bằng thời gian animation) thì tắt effect
                setTimeout(() => {
                    setEffectAnimal(null);
                }, 1000);
                setTimeout(() => {
                    setIsContinue(true)
                }, 1500);
            }
            else {
                await onSound('Try again!', 'female');
            }


        }
    }



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
                <button className="button-continue" onClick={() => navigate('/phase4')}>
                    Continue
                </button>
            )}
            <div className={`stage ${showInstruction ? "dimmed" : ""}`} aria-hidden={showInstruction}>
                <div className="phase-background" ref={frameRef}>
                    <img src={bg} alt="Phase Background" className="phase-image" />
                    <BoxChat
                        posX={800}
                        posY={100}
                        text={textSelect}
                    />
                    <DndContext onDragEnd={handleDragEnd}>
                        {/* Chỉ hiện card nếu chưa drop */}
                        {cards.filter(c => !droppedAnimals.includes(c.id)).map((c) => (
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
                    <img src={instruction} alt="instruction" onClick={openInstruction} className="btn-icon" />
                    <img src={exit} alt="exit" onClick={() => navigate("/homescreen")} className="btn-icon" />
                </div>
            </div>
            {/* Overlay làm mờ nền nhưng KHÔNG ảnh hưởng modal */}
            {showInstruction && (
                <ModalPortal>
                    <div className="screen-dim" />
                </ModalPortal>
            )}

            {/* Popup hướng dẫn */}
            {showInstruction && (
                <ModalPortal>
                    <div className="modal" role="dialog" aria-modal="true" aria-label="Hướng dẫn">
                        <div className="modal-backdrop" onClick={closeInstruction} />
                        <div className="modal-content" ref={modalRef} tabIndex={-1}>
                            <h2 className="modal-title">Phase 3 Instructions</h2>
                            <div className="modal-body">
                                <p>Hãy kéo thả các thẻ vào đúng vị trí để hoàn thành nhiệm vụ…</p>
                            </div>
                        </div>
                    </div>
                </ModalPortal>
            )}
        </div>
    );
};
