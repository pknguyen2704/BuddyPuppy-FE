// Card/TextCard.jsx
import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import './wordCard.css';

export function DraggableText({ id, text, style, className }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const dragStyle = transform
        ? { transform: `translate(-50%, -50%) translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : { transform: 'translate(-50%, -50%)' };

    return (
        <div
            ref={setNodeRef}
            className={`card-text ${className || ""}`}
            {...listeners}
            {...attributes}
            style={{ ...style, ...dragStyle }}
        >
            {text}
        </div>
    );
}
