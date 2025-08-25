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

import { BoxChat } from './BoxChat/BoxChat';
import { getAllAnimalsService, getAnimalByIdService } from '~/service/animalService'

export const Phase3 = () => {
    const frameRef = useRef(null);
    const modalRef = useRef(null);
    const [parent, setParent] = useState(null);
    const [effect, setEffect] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [findAnimal, setFindAnimal] = useState('bear');
    const [showInstruction, setShowInstruction] = useState(true);
    const [animalsArray, setAnimalsArray] = useState([]);
    const [textSelect, setTextSelect] = useState('Find the bear!');
    const [animalSelect, setAnimalSelect] = useState(0);


    //Animal bị xóa
    const [droppedAnimals, setDroppedAnimals] = useState([]);
    const [effectAnimal, setEffectAnimal] = useState(null);


    const navigate = useNavigate();

    // Random index of array animal
    function randomIndex(start, finish) {
        return Math.floor(Math.random() * (finish - start + 1) + start);
    }

    // Get data from backend
    useEffect(() => {
        async function fetchData() {
            const response = await getAllAnimalsService();
            setAnimalsArray(response.animals);
            let indexSel = randomIndex(0, 7);
            let animSel = response.animals[indexSel]
            setAnimalSelect(animSel);
            setTextSelect(`Find the ${animSel.name}!`)
        }
        fetchData()
    }, [])

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

    const clamp = (v) => Math.max(0, Math.min(100, v));

    // Xử lý kéo thả
    function handleDragEnd({ active, over }) {
        if (!frameRef.current || !active) return;

        // Nếu thả vào droppable thì xóa luôn
        if (over) {
            const draggedCard = cards.find(c => c.id === active.id);

            if (draggedCard.id === animalSelect.name) {
                setDroppedAnimals(prev => [...prev, draggedCard.id]);
                playSoundNTimes(animalSelect.sound, 3);


                // bật hiệu ứng
                // setEffect(true);
                setEffectAnimal(draggedCard.id);

                // sau 1s (bằng thời gian animation) thì tắt effect
                setTimeout(() => {
                    setEffectAnimal(null);
                }, 1000);

            }
            else {
                alert('Sai roi!')
            }


        }
    }
    const positions = [...pos.animalsPositions];
    const cards = animalsArray.map((item, index) => {
        let posision;
        if (item.name === 'fish') {
            posision = pos.fish
        }
        else {
            let indexTemp = randomIndex(0, positions.length - 1);
            posision = positions[indexTemp];
            positions.splice(indexTemp, 1);
        }
        return {
            id: item.name,
            src: item.image,
            caption: item.name,
            sound: item.sound,
            pos: posision
        }
    })


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
