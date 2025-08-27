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
import { ttsFunction } from '~/service/ttsService';

export const Phase5p3 = () => {
    const frameRef = useRef(null);
    const modalRef = useRef(null);
    const [showInstruction, setShowInstruction] = useState(true);
    const [sentence, setSentence] = useState('....... .......');
    const [parentText, setParentText] = useState(null);
    const [cards, setCards] = useState([]);
    const [droppedAnimals, setDroppedAnimals] = useState([]);
    const [effectAnimal, setEffectAnimal] = useState(null);
    const [incorrect, setIncorrect] = useState(false);

    const navigate = useNavigate();
    const question = 'Do you want a rabbit or a bear?';

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

    const posText = { text1: { xPct: 30, yPct: 70 } };

    // chỉ 1 thẻ "I want"
    const texts = [
        { id: 'word1', text: 'I want', pos: posText.text1 }
    ];

    function randomIndex(start, finish) {
        return Math.floor(Math.random() * (finish - start + 1) + start);
    }

    useEffect(() => {
        async function fetchData() {
            const response = await getAllAnimalsService();
            const animals = response.animals || [];

            const positionsCopy = [...pos.animalsPositions];
            const cardsWithPos = animals.map(item => {
                let position;
                if (item.name === 'fish') position = pos.fish;
                else {
                    const idx = randomIndex(0, Math.max(positionsCopy.length - 1, 0));
                    position = positionsCopy[idx] || pos.fish;
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
        }
        fetchData();
    }, []);

    const onSound = async (text, gender = 'female') => {
        const response = await ttsFunction({ text, gender });
        const audioBlob = new Blob([response], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
    };


   

    async function handleDragEnd({ active, over }) {
        if (!active || !over) return;

        // kéo thẻ chữ
        const draggedText = texts.find(t => t.id === active.id);
        if (draggedText) {
            setParentText(over.id);
            setSentence(`${draggedText.text} .......`);
            return;
        }

        if (!parentText) {
            await onSound("The sentence must start with 'I want'. Please try again!");
            return;
        }

        const draggedCard = cards.find(c => c.id === active.id);
        if (draggedCard) {
            if (draggedCard.id === 'rabbit' || draggedCard.id === 'bear') {
                setDroppedAnimals(prev => [...prev, draggedCard.id]);
                setSentence(`I want ${draggedCard.id}`);

                await onSound(`I want ${draggedCard.id}`, 'male');
                if (draggedCard.sound) playSoundNTimes(draggedCard.sound, 1);

                setEffectAnimal(draggedCard.id);
                setTimeout(() => setEffectAnimal(null), 1000);
                setTimeout(() => navigate('/phase5p4'), 1000);
            }
            else {
                setIncorrect(true);
                await onSound("The question is 'do you want a rabbit or a bear. Please try again!");
                return;
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
                position: 'absolute'
            }}
        />
    );

    return (
        <div className="container-phase">
            <div className={`stage`} aria-hidden={showInstruction}>
                <div className="phase-background" ref={frameRef}>
                    <img src={bg} alt="Phase Background" className="phase-image" />

                    <DndContext onDragEnd={handleDragEnd}>
                        {cards
                            .filter(c => !droppedAnimals.includes(c.id))
                            .map(c => (
                                <DraggableCard
                                    key={c.id}
                                    id={c.id}
                                    src={c.src}
                                    caption={c.caption}
                                    style={{
                                        left: `${c.pos.xPct}%`,
                                        top: `${c.pos.yPct}%`,
                                        position: 'absolute',
                                        outline: (incorrect && (c.id === 'rabbit' || c.id === 'bear')) ? '3px solid red' : 'none',
                                        outlineOffset: (incorrect && (c.id === 'rabbit' || c.id === 'bear')) ? '3px' : '0',
                                        backgroundColor: (incorrect && (c.id === 'rabbit' || c.id === 'bear')) ? 'rgba(255,0,0,0.15)' : 'transparent',
                                        boxShadow: (incorrect && (c.id === 'rabbit' || c.id === 'bear')) ? '0 0 12px 4px rgba(255,0,0,0.6)' : 'none',
                                        borderRadius: '8px',
                                    }}

                                    animate={false}
                                />
                            ))}

                        {!parentText &&
                            texts.map(t => (
                                <DraggableText
                                    key={t.id}
                                    id={t.id}
                                    text={t.text}
                                    style={{ left: `${t.pos.xPct}%`, top: `${t.pos.yPct}%` }}
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

                    <BoxChat posX={900} posY={270} text={question} />
                    <BoxChat posX={950} posY={330} text={sentence} />
                </div>

                <div className="setting-phase">
                    <img src={instruction} alt="instruction" onClick={() => setShowInstruction(true)} className="btn-icon" />
                    <img src={exit} alt="exit" onClick={() => navigate('/homescreen')} className="btn-icon" />
                </div>
            </div>

            
        </div>
    );
};
