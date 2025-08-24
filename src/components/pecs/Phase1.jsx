import React, { useRef, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import bg from '~/assets/Pecs/bg.png';
import pig from '~/assets/Pecs/pig.png';
import boy from '~/assets/Pecs/boy.png';

import { DraggableCard } from './Card/Card';
import { DroppableCharacter } from './Character/Character';
import './Phase.css';
import soundEffect from '~/assets/Pecs/pig-sound.mp3';

export const Phase1 = () => {
    const frameRef = useRef(null);
    const [parent, setParent] = useState(null);
    const [effect, setEffect] = useState(false);
    const [animate, setAnimate] = useState(false);


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
        pig: { xPct: 30, yPct: 40 },
    });

    const clamp = (v) => Math.max(0, Math.min(100, v));

    // Xử lý kéo thả
    function handleDragEnd({ active, over }) {
        if (!frameRef.current || !active) return;

        // Nếu thả vào droppable thì xóa luôn
        if (over) {
            setParent(over.id);
            playSoundNTimes(soundEffect, 3);

            // bật hiệu ứng
            setEffect(true);

            // sau 1s (bằng thời gian animation) thì tắt effect
            setTimeout(() => {
                setEffect(false);
            }, 1000);
        }
    }

    const cards = [
        { id: "pig", src: pig, caption: "Pig", pos: pos.pig },
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
            <div className="phase-background" ref={frameRef}>
                <img src={bg} alt="Phase Background" className="phase-image" />
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
        </div>
    );
};
