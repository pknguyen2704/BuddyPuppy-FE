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
import { ttsFunction } from '~/service/ttsService'

export const Phase5 = () => {
  const frameRef = useRef(null);
  const modalRef = useRef(null);
  const [isContinue, setIsContinue] = useState(false);
  const navigate = useNavigate();
  const [showInstruction, setShowInstruction] = useState(true);
  const questions = ['What do you want?', 'What do you see?'];
  const [questionIndex, setQuestionIndex] = useState(Math.floor(Math.random() * 2));
  const [sentence, setSentence] = useState('....... .......');
  const [parentText, setParentText] = useState(null);
  const [cards, setCards] = useState([]);
  const [droppedAnimals, setDroppedAnimals] = useState([]);
  const [effectAnimal, setEffectAnimal] = useState(null);
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

  const [posText] = useState({
    text1: { xPct: 30, yPct: 70 },
    text2: { xPct: 40, yPct: 80 }
  });

  // Hai thẻ chữ phải kéo đúng theo câu hỏi
  const texts = [
    { id: 'word1', text: 'I want', pos: posText.text1, index: 0 },
    { id: 'word2', text: 'I see', pos: posText.text2, index: 1 }
  ];

  // tiện ích
  function randomIndex(start, finish) {
    return Math.floor(Math.random() * (finish - start + 1) + start);
  }

  // Lấy data 1 lần và gán vị trí cố định
  useEffect(() => {
    async function fetchData() {
      const response = await getAllAnimalsService();
      const animals = response.animals || [];

      const positionsCopy = [...pos.animalsPositions];
      const cardsWithPos = animals.map((item) => {
        let position;
        if (item.name === 'fish') {
          position = pos.fish;
        } else {
          const idx = randomIndex(0, Math.max(positionsCopy.length - 1, 0));
          position = positionsCopy[idx] || pos.fish;
          positionsCopy.splice(idx, 1);
        }
        return {
          id: item.name,
          src: item.image,
          caption: item.name,
          sound: item.sound, // âm thanh riêng từng con
          pos: position
        };
      });

      setCards(cardsWithPos);
    }

    fetchData();
  }, []);
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

  const closeInstruction = () => {
    setShowInstruction(false);
    onSound(questions[questionIndex], 'female');
  }

  // ESC -> đóng popup
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeInstruction();
    window.addEventListener('keydown', onKey);
    closeInstruction
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // click ngoài modal -> đóng
  useEffect(() => {
    if (!showInstruction) return;
    const onClickAnywhere = (e) => {
      if (!modalRef.current) return;
      if (!modalRef.current.contains(e.target)) closeInstruction();
    };
    document.addEventListener('mousedown', onClickAnywhere);
    return () => document.removeEventListener('mousedown', onClickAnywhere);
  }, [showInstruction]);

  // chặn scroll khi mở modal
  useEffect(() => {
    if (showInstruction) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showInstruction]);

  function ModalPortal({ children }) {
    return createPortal(children, document.body);
  }

  // Handler kéo thả
  async function handleDragEnd({ active, over }) {
    if (!frameRef.current || !active) return;
    if (!over) return;

    // Nếu là thẻ chữ
    const draggedText = texts.find((t) => t.id === active.id);
    if (draggedText) {
      if (draggedText.index !== questionIndex) {
        await onSound(`The question is ${questions[questionIndex]}. Try again!`, 'female');
        return;
      }
      setParentText(over.id);
      setSentence(`${draggedText.text} .......`);
      return;
    }

    // Bắt buộc phải kéo thẻ chữ trước
    if (!parentText) {
      await onSound(`The sentence starts with I see or I want. Try again!`);
      return;
    }

    // Nếu là thẻ ảnh (con vật)
    const draggedCard = cards.find((c) => c.id === active.id);
    if (draggedCard) {
      // Ẩn riêng con vừa thả
      setDroppedAnimals((prev) => [...prev, draggedCard.id]);

      // Cập nhật câu
      const leading = texts[questionIndex].text;
      setSentence(`${leading} ${draggedCard.id}`);

      await onSound(`I ${questionIndex === 0 ? 'want' : 'see'} ${draggedCard.id}`, 'male')
      // Phát âm thanh từng con (nếu có)
      if (draggedCard.sound) {
        playSoundNTimes(draggedCard.sound, 1);
      }

      // Hiệu ứng ghost chỉ cho con vừa thả
      setEffectAnimal(draggedCard.id);
      setTimeout(() => setEffectAnimal(null), 1000);

      // Chuyển sang câu hỏi tiếp theo sau 1.2s (đợi effect ~1s)
      setTimeout(() => {
        setIsContinue(true);
      }, 1200);

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
        position: 'absolute'
      }}
    />
  );

  return (
    <div className="container-phase">
      {isContinue &&
        <button
          className='button-continue'
          onClick={() => navigate('/phase6')}
        > Continue
        </button>
      }
      <div className={`stage ${showInstruction ? 'dimmed' : ''}`} aria-hidden={showInstruction}>
        <div className="phase-background" ref={frameRef}>
          <img src={bg} alt="Phase Background" className="phase-image" />

          <DndContext onDragEnd={handleDragEnd}>
            {/* render động vật - ẩn riêng từng con đã thả */}
            {cards
              .filter((c) => !droppedAnimals.includes(c.id))
              .map((c) => (
                <DraggableCard
                  key={c.id}
                  id={c.id}
                  src={c.src}
                  caption={c.caption}
                  style={{ left: `${c.pos.xPct}%`, top: `${c.pos.yPct}%` }}
                  animate={false}
                />
              ))}

            {/* render thẻ chữ - chỉ hiển thị khi chưa ghép vào character */}
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
              ))}

            {character}

            {/* effect ghost duy nhất cho con vừa thả */}
            {effectAnimal &&
              (() => {
                const c = cards.find((c) => c.id === effectAnimal);
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

          {/* Hộp chat: câu hỏi + câu của người chơi */}
          <BoxChat posX={900} posY={270} text={questions[questionIndex]} />
          <BoxChat posX={950} posY={330} text={sentence} />
        </div>

        <div className="setting-phase">
          <img
            src={instruction}
            alt="instruction"
            onClick={() => setShowInstruction(true)}
            className="btn-icon"
          />
          <img
            src={exit}
            alt="exit"
            onClick={() => navigate('/homescreen')}
            className="btn-icon"
          />
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
              <h2 className="modal-title">Phase 5 Instructions</h2>
              <div className="modal-body">
                <p>
                  Kéo thả thẻ chữ phù hợp với câu hỏi (“I want” hoặc “I see”), sau đó kéo con vật để
                  hoàn thành câu. Mỗi lần hoàn thành sẽ tự chuyển sang câu hỏi kế tiếp.
                </p>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
};
