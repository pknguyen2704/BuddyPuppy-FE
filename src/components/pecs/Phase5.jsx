import React, { useRef, useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import bg from '~/assets/Pecs/bg.png';
import pig from '~/assets/Pecs/pig.png';
import boy from '~/assets/Pecs/boy.png';
import instruction from '~/assets/Pecs/instruction.png';
import exit from '~/assets/Pecs/exit.png';
import { createPortal } from 'react-dom';
import { DraggableCard } from './Card/Card';
import { DroppableCharacter } from './Character/Character';
import { DraggableText } from './wordCard/wordCard';
import './Phase.css';
import { playSoundNTimes } from './Sound/Sound';
import soundEffect from '~/assets/Pecs/pig-sound.mp3';
import { useNavigate } from 'react-router-dom';
import { BoxChat } from './BoxChat/BoxChat';

export const Phase5 = () => {
    const frameRef = useRef(null);
    const modalRef = useRef(null);
    const [parentCard, setparentCard] = useState(null);
    const [parentText, setparentText] = useState(null);
    const [effect, setEffect] = useState(false);
    const [textAnimal, setTextAnimal] = useState('....... .......');
    const textQuestion = ['What do you want?', 'What do you see?'];
    const [showInstruction, setShowInstruction] = useState(true);
    const navigate = useNavigate();

    let indexQuestion = 0;
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setShowInstruction(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Click ở bất kỳ đâu ngoài popup -> đóng
    useEffect(() => {
        if (!showInstruction) return;
        const onClickAnywhere = (e) => {
            if (!modalRef.current) return;
            if (!modalRef.current.contains(e.target)) setShowInstruction(false);
        };
        document.addEventListener("mousedown", onClickAnywhere);
        return () => document.removeEventListener("mousedown", onClickAnywhere);
    }, [showInstruction]);
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
        text1: { xPct: 30, yPct: 70 },
        text2: { xPct: 40, yPct: 80 }
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
        { id: "word1", text: "I want", pos: posText.text1, index: 0 },
        { id: "word2", text: "I see", pos: posText.text2, index: 1 },
    ];

    // xử lý khi thả
    function handleDragEnd({ active, over }) {
        if (!frameRef.current || !active) return;
        if (!over) return;

        // Nếu là card chữ
        const draggedText = texts.find(t => t.id === active.id);

        if (draggedText) {
            if (draggedText.index !== indexQuestion) {
                alert(`The question is ${textQuestion[indexQuestion]}`)
                return;
            }
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

    return (
        <div className="container-phase">
            <div className={`stage ${showInstruction ? "dimmed" : ""}`} aria-hidden={showInstruction}>
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
                    <BoxChat posX={900} posY={270} text={textQuestion[indexQuestion]} />
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
                            <h2 className="modal-title">Phase 5 Instructions</h2>
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
