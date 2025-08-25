import React, { useRef, useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import bg from '~/assets/Pecs/bg.png';
import boy from '~/assets/Pecs/boy.png';
import instruction from '~/assets/Pecs/instruction.png';
import exit from '~/assets/Pecs/exit.png';
import { createPortal } from 'react-dom';
import { DraggableCard } from './Card/Card';
import { DroppableCharacter } from './Character/Character';
import { DraggableText } from './wordCard/wordCard';
import './Phase.css';
import { playSoundNTimes } from './Sound/Sound';
import { useNavigate } from 'react-router-dom';
import { BoxChat } from './BoxChat/BoxChat';
import { getAllAnimalsService } from '~/service/animalService';
import pig from '~/assets/Pecs/pig.png';

export const Phase6 = () => {
    const frameRef = useRef(null);
    const modalRef = useRef(null);
    const [showInstruction, setShowInstruction] = useState(true);

    const [cards, setCards] = useState([]);
    const [animalSelect, setAnimalSelect] = useState(null);
    const [textAnimal, setTextAnimal] = useState('....... .......');
    const [parentText, setParentText] = useState(null);
    const [droppedAnimals, setDroppedAnimals] = useState([]);
    const [effectAnimal, setEffectAnimal] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const textQuestion = 'What do you see?';
    const [dataAnimals, setDataAnimals] = useState([]);
    const [indexAnimals, setIndexAnimals] = useState(0);

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
            { xPct: 55, yPct: 48 }
        ]
    };

    const posText = {
        text1: { xPct: 48, yPct: 80 }
    };

    const texts = [
        { id: "word1", text: "I see", pos: posText.text1 },
    ];

    function randomIndex(start, finish) {
        return Math.floor(Math.random() * (finish - start + 1) + start);
    }

    // Fetch data và khởi tạo vị trí con vật chỉ 1 lần
    useEffect(() => {
        async function fetchData() {
            const response = await getAllAnimalsService();
            const animals = response.animals;
            setDataAnimals(animals);
            setIndexAnimals(randomIndex(0, animals.length));


            const positionsCopy = [...pos.animalsPositions];
            const cardsWithPos = animals.map((item) => {
                let posision;
                if (item.name === 'fish') {
                    posision = pos.fish;
                } else {
                    let indexTemp = randomIndex(0, positionsCopy.length - 1);
                    posision = positionsCopy[indexTemp];
                    positionsCopy.splice(indexTemp, 1);
                }
                return {
                    id: item.name,
                    src: item.image,
                    caption: item.name,
                    sound: item.sound,
                    pos: posision
                };
            });

            setCards(cardsWithPos);

            const indexSel = randomIndex(0, animals.length - 1);
            setAnimalSelect(animals[indexSel]);
        }

        fetchData();
    }, []);

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setShowInstruction(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => {
        if (!showInstruction) return;
        const onClickAnywhere = (e) => {
            if (!modalRef.current) return;
            if (!modalRef.current.contains(e.target)) setShowInstruction(false);
        };
        document.addEventListener("mousedown", onClickAnywhere);
        return () => document.removeEventListener("mousedown", onClickAnywhere);
    }, [showInstruction]);

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

    function handleDragEnd({ active, over }) {
        if (!frameRef.current || !active || !over) return;

        // Kéo thả text card
        const draggedText = texts.find(t => t.id === active.id);
        if (draggedText) {
            setParentText(over.id);
            setTextAnimal(draggedText.text + " .......");
            return;
        }

        if (!parentText) {
            alert("Start with 'I see'");
            return;
        }

        // Kéo thả ảnh
        const draggedCard = cards.find(c => c.id === active.id);
        if (draggedCard) {
            if (draggedCard.id === dataAnimals[indexAnimals].name) {
                setDroppedAnimals(prev => [...prev, draggedCard.id]);
                setTextAnimal("I want " + draggedCard.id);

                // Play âm thanh riêng của con vật
                if (draggedCard.sound) {
                    playSoundNTimes(draggedCard.sound, 3);
                }

                setEffectAnimal(draggedCard.id);
                setTimeout(() => setEffectAnimal(null), 1000);
            } else {
                alert('sai roio');
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
    const clickReplay = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="container-phase">

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <img src={dataAnimals[indexAnimals].image} alt="Replay" />
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}


            <div className={`stage ${showInstruction ? "dimmed" : ""}`} aria-hidden={showInstruction}>
                <div className="phase-background" ref={frameRef}>
                    <img src={bg} alt="Phase Background" className="phase-image" />

                    <DndContext onDragEnd={handleDragEnd}>
                        {/* render ảnh */}
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

                        {/* render chữ */}
                        {!parentText &&
                            texts.map((t) => (
                                <DraggableText
                                    key={t.id}
                                    id={t.id}
                                    text={t.text}
                                    style={{
                                        left: `${t.pos.xPct}%`,
                                        top: `${t.pos.yPct}%`
                                    }}
                                />
                            ))
                        }

                        {character}

                        {/* hiệu ứng khi đúng */}
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

                    {/* chat hiển thị câu */}
                    <BoxChat posX={950} posY={330} text={textAnimal} />
                    <button
                        onClick={() => clickReplay()}
                    >
                        <BoxChat posX={900} posY={270} text={textQuestion} />
                    </button>
                </div>

                <div className="setting-phase">
                    <img src={instruction} alt="instruction" onClick={() => setShowInstruction(true)} className="btn-icon" />
                    <img src={exit} alt="exit" onClick={() => navigate("/homescreen")} className="btn-icon" />
                </div>
            </div>

            {/* Overlay làm mờ nền */}
            {showInstruction && (
                <ModalPortal>
                    <div className="screen-dim" />
                </ModalPortal>
            )}

            {/* Popup hướng dẫn */}
            {showInstruction && (
                <ModalPortal>
                    <div className="modal" role="dialog" aria-modal="true" aria-label="Hướng dẫn">
                        <div className="modal-backdrop" onClick={() => setShowInstruction(false)} />
                        <div className="modal-content" ref={modalRef} tabIndex={-1}>
                            <h2 className="modal-title">Phase 6 Instructions</h2>
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
