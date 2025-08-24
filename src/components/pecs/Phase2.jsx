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
import './Phase.css';
import { playSoundNTimes } from './Sound/Sound';
import soundEffect from '~/assets/Pecs/pig-sound.mp3';
import { useNavigate } from 'react-router-dom';

import { BoxChat } from './BoxChat/BoxChat';

export const Phase2 = () => {
    const frameRef = useRef(null);
    const modalRef = useRef(null);
    const [parent, setParent] = useState(null);
    const [effect, setEffect] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [findAnimal, setFindAnimal] = useState('bear');
    const [showInstruction, setShowInstruction] = useState(true);

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

    const clamp = (v) => Math.max(0, Math.min(100, v));

    // Xử lý kéo thả
    function handleDragEnd({ active, over }) {
        if (!frameRef.current || !active) return;

        // Nếu thả vào droppable thì xóa luôn
        if (over) {
            const draggedCard = cards.find(c => c.id === active.id);

            if (draggedCard.id === findAnimal) {
                setParent(over.id);
                playSoundNTimes(soundEffect, 3);

                // bật hiệu ứng
                setEffect(true);

                // sau 1s (bằng thời gian animation) thì tắt effect
                setTimeout(() => {
                    setEffect(false);
                }, 1000);
            }
            else {
                alert('Sai roi!')
            }
        }
    }

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
                    <BoxChat
                        posX={650}
                        posY={100}
                        text={'Find the bear!'}
                    />
                    <DndContext onDragEnd={handleDragEnd}>
                        {/* Chỉ hiện card nếu chưa drop */}
                        {!parent
                            ? cards.map((c) => (
                                <DraggableCard
                                    key={c.id}
                                    id={c.id}
                                    src={c.src}
                                    caption={c.caption}
                                    style={{ left: `${c.pos.xPct}%`, top: `${c.pos.yPct}%` }}
                                    animate={false} // <-- đúng prop
                                />
                            ))
                            : null}

                        {character}

                        {effect &&
                            cards.map((c) => (
                                <div
                                    key={`ghost-${c.id}`}
                                    className="card animate ghost"
                                    style={{ left: `${pos.char.xPct}%`, top: `${pos.char.yPct}%`, position: 'absolute' }}
                                >
                                    <div className="caption">{c.caption}</div>
                                    <img src={c.src} alt={c.caption} draggable="false" />
                                </div>
                            ))}
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
                            <h2 className="modal-title">Phase 2 Instructions</h2>
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
