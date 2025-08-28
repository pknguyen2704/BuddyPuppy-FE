// src/components/ConfettiEffect.jsx
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

export const ConfettiEffect = ({ run = false, duration = 3000, onDone }) => {
    const [show, setShow] = useState(run);

    useEffect(() => {
        if (run) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                onDone?.(); // báo cho parent reset runConfetti
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [run, duration, onDone]);

    if (!show) return null;

    return (
        <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={300}
        />
    );
};
