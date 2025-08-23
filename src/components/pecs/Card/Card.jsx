import { useDraggable } from '@dnd-kit/core';
import './Card.css';
import React from 'react';

// Card/Card.jsx
export function DraggableCard({ id, src, caption, style, animate, className }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const dragStyle = transform
        ? { transform: `translate(-50%, -50%) translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : { transform: 'translate(-50%, -50%)' };

    return (
        <div
            ref={setNodeRef}
            className={`card ${animate ? "animate" : ""} ${className || ""}`}
            {...listeners}
            {...attributes}
            style={{ ...style, ...dragStyle }}
        >
            <div className="caption">{caption}</div>
            <img src={src} alt={caption} draggable="false" />
        </div>
    );
}


