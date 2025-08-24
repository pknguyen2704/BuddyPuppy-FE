import { useDraggable } from '@dnd-kit/core';
import './BoxChat.css';
import React from 'react';

// Card/Card.jsx
export function BoxChat({posX, posY, text}) {
    return (
        <div className='contain-boxChat' style={{
            position: 'absolute',
            top: posY,
            left: posX,
        }}>
            <h4>{text}</h4>
        </div>
    );
}


