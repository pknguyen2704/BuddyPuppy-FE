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
import { getAllAnimalsService, getAnimalByIdService } from '~/service/animalService'
import { ttsFunction } from '~/service/ttsService'

export const Phase1 = () => {
    const frameRef = useRef(null);
    const modalRef = useRef(null);
    const [parent, setParent] = useState(null);
    const [effect, setEffect] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [showInstruction, setShowInstruction] = useState(true);
    const [indexAnimal, setIndexAnimal] = useState(0);
    const [animalSelect, setAnimalSelect] = useState();
    const [isContinue, setIsContinue] = useState(false);
    const navigate = useNavigate();

    // Random index of array animal
    function randomIndex(start, finish) {
        return Math.floor(Math.random() * (finish - start + 1) + start);
    }

    // Get data from backend
    useEffect(() => {
        async function fetchData() {
            const response = await getAllAnimalsService();
            const index = randomIndex(0, 7)
            setIndexAnimal(index);
            setAnimalSelect(response.animals[index]);
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
    // Nếu random ra cá thì phải setPosition theo fish còn lại thì random theo animals
    const [pos, setPos] = useState({
        char: { xPct: 70, yPct: 50 },
        animals: { xPct: randomIndex(35, 65), yPct: randomIndex(20, 80) },
        fish: { xPct: 20, yPct: 75 }
    });

    const clamp = (v) => Math.max(0, Math.min(100, v));

    // Xử lý kéo thả
    async function handleDragEnd({ active, over }) {
        try {
            if (!frameRef.current || !active) return;

            // Nếu thả vào droppable thì xóa luôn
            if (over) {
                setParent(over.id);
                await onSound(`I want ${animalSelect.name}`, 'male')

                playSoundNTimes(animalSelect.sound, 1);

                // bật hiệu ứng
                setEffect(true);

                // sau 1s (bằng thời gian animation) thì tắt effect
                setTimeout(() => {
                    setEffect(false);
                }, 1000);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsContinue(true);
        }
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


    const cards = animalSelect ? [
        { id: animalSelect.name, src: animalSelect.image, caption: animalSelect.name, pos: (indexAnimal === 5) ? pos.fish : pos.animals },
    ] : [];

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
            {isContinue &&
                <button
                    className='button-continue'
                    onClick={() => navigate('/phase2')}
                > Continue
                </button>
            }
            <div className={`stage ${showInstruction ? "dimmed" : ""}`} aria-hidden={showInstruction}>
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
                            <h2 className="modal-title">Phase 1 Instructions</h2>
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
