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
import { DraggableText } from './wordCard/wordCard';
import { BoxChat } from './BoxChat/BoxChat';
import { getAllAnimalsService } from '~/service/animalService';
import { ttsFunction } from '~/service/ttsService';
import { playSoundNTimes } from './Sound/Sound';

import './Phase.css';

export const Phase6p3 = () => {
    const frameRef = useRef(null);
    const modalRef = useRef(null);

    const navigate = useNavigate();

    const [isDone, setIsDone] = useState(false);
    const [showInstruction, setShowInstruction] = useState(false);
    const [dataAnimals, setDataAnimals] = useState([]);
    const [cards, setCards] = useState([]);
    const [targetAnimals, setTargetAnimals] = useState([]);
    const [parentText, setParentText] = useState(null);
    const [textAnimal, setTextAnimal] = useState('....... ....... and .......');
    const [droppedAnimals, setDroppedAnimals] = useState([]);
    const [effectAnimal, setEffectAnimal] = useState(null);
    const [showPopup, setShowPopup] = useState(true);
    const [textTemp, setTextTemp] = useState('I see ');

    const textQuestion = 'What do you see?';

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

    const posText = { text1: { xPct: 48, yPct: 80 } };
    const texts = [{ id: "word1", text: "I see", pos: posText.text1 }];

    function randomIndex(start, finish) {
        return Math.floor(Math.random() * (finish - start + 1) + start);
    }

    function shuffle(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        async function fetchData() {
            const response = await getAllAnimalsService();
            const animals = shuffle(response.animals);

            const chosen = animals.slice(0, 5);
            setTargetAnimals(chosen);

            setDataAnimals(animals);

            const positionsCopy = [...pos.animalsPositions];
            const cardsWithPos = animals.map((item) => {
                let posision;
                if (item.name === 'fish') posision = pos.fish;
                else {
                    const idx = randomIndex(0, positionsCopy.length - 1);
                    posision = positionsCopy[idx];
                    positionsCopy.splice(idx, 1);
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
            setShowPopup(true);
        }
        fetchData();
    }, []);

    const onSound = async (text, gender) => {
        const response = await ttsFunction({ text, gender });
        const audioBlob = new Blob([response], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
    };

    const closeInstruction = () => {
        setShowInstruction(false);
        onSound(textQuestion, 'female');
    };
    // Khi animalSelect thay đổi (sau fetch) thì phát âm thanh
    useEffect(() => {
        if (targetAnimals) {
            const timer = setTimeout(() => onSound(textQuestion, 1000), 500);
            return () => clearTimeout(timer);
        }
    }, [targetAnimals]);

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && closeInstruction();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        if (!showInstruction) return;
        const onClickAnywhere = (e) => {
            if (!modalRef.current) return;
            if (!modalRef.current.contains(e.target)) closeInstruction();
        };
        document.addEventListener('mousedown', onClickAnywhere);
        return () => document.removeEventListener('mousedown', onClickAnywhere);
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

    const handleDragEnd = async ({ active, over }) => {
        if (!frameRef.current || !active || !over) return;

        const draggedText = texts.find(t => t.id === active.id);
        if (draggedText) {
            setParentText(over.id);
            setTextAnimal(draggedText.text + " ......., .......");
            return;
        }

        if (!parentText) {
            await onSound(`The sentence starts with I see. Try again!`);
            return;
        }

        const draggedCard = cards.find(c => c.id === active.id);
        if (draggedCard) {
            const isCorrect = targetAnimals.some(animal => animal.name === draggedCard.id);
            if (isCorrect) {
                if (!droppedAnimals.includes(draggedCard.id)) {
                    setDroppedAnimals(prev => [...prev, draggedCard.id]);
                }
                if (targetAnimals.every(a => droppedAnimals.concat(draggedCard.id).includes(a.name))) {
                    const textSpeed = textTemp + 'and ' + draggedCard.id;
                    setTextAnimal(textSpeed);
                    await onSound(textSpeed, 'male');
                    setTimeout(() => playSoundNTimes(draggedCard.sound, 1), 2000);
                    setTimeout(() =>setIsDone(true), 3000);
                    
                }
                else {
                    let textSpeed = textTemp + draggedCard.id + ",\n ";
                    setTextTemp(textSpeed);
                    setTextAnimal(textSpeed + " .......");
                    if (draggedCard.sound) playSoundNTimes(draggedCard.sound, 1);
                }
                if (draggedCard.sound) playSoundNTimes(draggedCard.sound, 1);

                setEffectAnimal(draggedCard.id);
                setTimeout(() => {
                    setEffectAnimal(null);
                }, 1000);
            } else {
                await onSound('Try again!');
            }
        }
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
            {/* Popup ảnh hiện cả 2 con target */}
            {showPopup && targetAnimals.length === 5 && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className='special'>
                            {targetAnimals.map(animal => (
                                <img key={animal.name} src={animal.image} alt={animal.name} />
                            ))}
                        </div>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </div>
            )}
            {isDone && <button className='button-continue' onClick={() => navigate('/homescreen')}> Done </button>}

            <div className={`stage ${showInstruction ? "dimmed" : ""}`} aria-hidden={showInstruction}>
                <div className="phase-background" ref={frameRef}>
                    <img src={bg} alt="Phase Background" className="phase-image" />

                    <DndContext onDragEnd={handleDragEnd}>
                        {/* render ảnh */}
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

                        {/* render chữ */}
                        {!parentText && texts.map(t => (
                            <DraggableText
                                key={t.id}
                                id={t.id}
                                text={t.text}
                                style={{
                                    left: `${t.pos.xPct}%`,
                                    top: `${t.pos.yPct}%`
                                }}
                            />
                        ))}

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
                    <button onClick={() => setShowPopup(true)}>
                        <BoxChat posX={900} posY={270} text={textQuestion} />
                    </button>
                    <BoxChat posX={950} posY={330} text={textAnimal} />

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
