import React, { useRef, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import bg from '~/assets/Pecs/bg.png';
import pig from '~/assets/Pecs/pig.png';
import boy from '~/assets/Pecs/boy.png';
import soundEffect from '~/assets/Pecs/pig-sound.mp3';

import './Phase.css';

import { DraggableCard } from './Card/Card';
import { DraggableText } from './wordCard/wordCard';
import { DroppableCharacter } from './Character/Character';
import { BoxChat } from './BoxChat/BoxChat';

export const Phase6 = () => {
    const frameRef = useRef(null);
    const [parentCard, setparentCard] = useState(null);
    const [parentText, setparentText] = useState(null);
    const [effect, setEffect] = useState(false);
    const [textAnimal, setTextAnimal] = useState('....... .......');
    const textQuestion = 'What do you see?';

    const [showPopup, setShowPopup] = useState(false);


    let indexQuestion = 0;

    function playSoundNTimes(src, n) {
        let count = 0;
        const audio = new Audio(src);

        audio.addEventListener("ended", () => {
            count++;
            if (count < n) {
                audio.currentTime = 0; // tua về đầu
                audio.play();
            }
        });

        audio.play();
    }

    // set vị trí ban đầu của các thẻ
    const [pos, setPos] = useState({
        char: { xPct: 70, yPct: 50 },
        animal1: { xPct: 30, yPct: 30 },
        animal2: { xPct: 40, yPct: 40 },
        animal3: { xPct: 50, yPct: 50 },
        animal4: { xPct: 60, yPct: 30 },
        animal5: { xPct: 55, yPct: 40 },
        animal6: { xPct: 20, yPct: 80 },
        animal7: { xPct: 50, yPct: 83 },
        bear: { xPct: 30, yPct: 40 }
    });

    const [posText, setPosText] = useState({
        text1: { xPct: 30, yPct: 70 }
    })

    const cards = [
        { id: "animal1", src: pig, caption: "animal1", pos: pos.animal1 },
        { id: "animal2", src: pig, caption: "animal2", pos: pos.animal2 },
        { id: "animal3", src: pig, caption: "animal3", pos: pos.animal3 },
        { id: "animal4", src: pig, caption: "animal4", pos: pos.animal4 },
        { id: "animal5", src: pig, caption: "animal5", pos: pos.animal5 },
        { id: "animal6", src: pig, caption: "animal6", pos: pos.animal6 },
        { id: "animal7", src: pig, caption: "animal7", pos: pos.animal7 },
        { id: "bear", src: pig, caption: "bear", pos: pos.bear },
    ];

    const texts = [
        { id: "word2", text: "I see", pos: posText.text1 },
    ];

    // xử lý khi thả
    function handleDragEnd({ active, over }) {
        if (!frameRef.current || !active) return;
        if (!over) return;

        // Nếu là card chữ
        const draggedText = texts.find(t => t.id === active.id);

        if (draggedText) {
            setparentText(over.id);
            setTextAnimal(draggedText.text + " .......");
            return;
        }
        if (!parentText) {
            alert("Start with 'I want' or 'I see'")
            return
        }
        // Nếu là card ảnh
        const draggedCard = cards.find(c => c.id === active.id);
        if (draggedCard) {
            setTextAnimal("I want " + draggedCard.id);
            setparentCard(over.id);
            playSoundNTimes(soundEffect, 3);

            setEffect(true);
            setTimeout(() => setEffect(false), 1000);
            return;
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
                        <img src={pig} alt="Replay" />
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}

            <div className="phase-background" ref={frameRef}>
                <img src={bg} alt="Phase Background" className="phase-image" />

                <DndContext onDragEnd={handleDragEnd}>
                    {/* render ảnh */}
                    {!parentCard &&
                        cards.map((c) => (
                            <DraggableCard
                                key={c.id}
                                id={c.id}
                                src={c.src}
                                caption={c.caption}
                                style={{
                                    left: `${c.pos.xPct}%`,
                                    top: `${c.pos.yPct}%`
                                }}
                                animate={false}
                            />
                        ))
                    }

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
                    {effect &&
                        cards.map((c) => (
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
                        ))
                    }
                </DndContext>

                {/* chat hiển thị câu */}
                <BoxChat posX={950} posY={330} text={textAnimal} />
                <button
                    onClick={() => clickReplay()}
                >
                    <BoxChat posX={900} posY={270} text={textQuestion} />
                </button>
            </div>
        </div>
    );
};
