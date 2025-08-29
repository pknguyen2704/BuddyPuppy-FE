import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { motion, AnimatePresence } from "framer-motion";
import { ttsFunction } from "~/service/ttsService";
import { useNavigate } from "react-router-dom";
import q1s1 from "~/assets/SocialStory1/q1s1.png"
import q2s1 from "~/assets/SocialStory1/q2s1.png"
import q3s1 from "~/assets/SocialStory1/q3s1.png"
import "./Question1.css"
import { ConfettiEffect } from "../Confetti";
export const Questions1 = () => {
    const [index, setIndex] = useState(0);
    const [grade, setGrade] = useState(0);
    const [direction, setDirection] = useState(0);
    const [waiting, setWaiting] = useState(false); // trạng thái chờ 5s
    const [open, setOpen] = useState(false);
    const closeBtnRef = useRef(null);
    const [selected, setSelected] = useState(null);
    const [runConfetti, setRunConfetti] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (open) {
            // focus vào nút Close khi popup mở
            closeBtnRef.current?.focus();
            // chặn scroll nền
            document.body.style.overflow = "hidden";
            onSound(DataGrade[grade]);
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [open]);
    const image = [
        q1s1, q2s1, q3s1
    ]

    const dataQuestions1 = [
        {
            question: "Your friend takes your toy without asking.",
            A: "Yell and hit your friend.",
            B: "Take a deep breath and count to 10.",
            C: "Tell your friend calmly, “I don’t like that. Please give it back.”",
            feedbackA: "Hitting hurts people. Let’s try another way to stay calm.",
            feedbackB: "Good job! Deep breaths help you stay calm.",
            feedbackC: "Well done! Talking calmly makes things better.",
            ansA: false,
            ansB: true,
            ansC: true,
        },
        {
            question: "You lose a game and feel very angry.",
            A: "Throw the game pieces.",
            B: "Breathe slowly and relax your hands.",
            C: "Say, “I feel angry. Can we play again later?”",
            feedbackA: "Throwing things is not safe. Let’s choose a better way.",
            feedbackB: "Nice work! Breathing helps you feel better.",
            feedbackC: "Great choice! Using words is a good way to share your feelings.",
            ansA: false,
            ansB: true,
            ansC: true,
        },
        {
            question:
                "You feel your body is hot and your fists are tight. What should you do?",
            A: "Punch the wall.",
            B: "Count slowly to ten: 1…2…3…10 and breathe.",
            C: "Tell an adult, “I feel angry. I need help.”",
            feedbackA: "Punching can hurt you. Let’s try a safer way.",
            feedbackB:
                "Good job! Counting and breathing help your body calm down.",
            feedbackC: "Well done! Asking for help is a smart way.",
            ansA: false,
            ansB: true,
            ansC: true,
        },
    ];
    const DataGrade = [
        "You did not use a calm choice today. Let’s try again tomorrow. ", // index 0
        "You stayed calm 1 time today. Let’s keep practicing! ",           // index 1
        "Well done! You stayed calm 2 out of 3 times today. ",             // index 2
        "Great job! You stayed calm 3 out of 3 times today. ",             // index 3
    ];

    const handleGrade = (check) => {
        if (check) {
            setGrade(grade => grade + 1);
            setRunConfetti(true);
        }
    }
    const handleAnswer = () => {
        if (waiting) return; // đang chờ thì không click thêm
        setWaiting(true);

        setTimeout(() => {
            if (index < dataQuestions1.length - 1) {
                setSelected(null);
                setDirection(1);
                setIndex(index + 1);
            } else {
                setOpen(true);
                setRunConfetti(true);
            }
            setWaiting(false);
        }, 5000);
    };

    const onSound = async (text) => {
        const response = await ttsFunction({
            text,
            gender: "male", // hoặc "female"
        });

        const audioBlob = new Blob([response], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        audio.play();
    };

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
    };

    return (
        <div className="container-fluid bg-warning p-3 vh-100 d-flex justify-content-center align-items-center">
            <div className="bg-white rounded-4 shadow position-relative w-100 h-100 d-flex justify-content-center align-items-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className="w-100 h-100 d-flex flex-column justify-content-center align-items-center"
                    >
                        <div className="d-flex flex-column gap-3" style={{ justifyContent: "center", alignItems: "center" }}>
                            <h3 className="mb-4">{dataQuestions1[index].question}</h3>
                            <img src={image[index]} style={{ maxWidth: "40vw", maxHeight: "45vh" }} />
                        </div>
                        <div className="d-flex flex-column gap-3">
                            <ConfettiEffect run={runConfetti} duration={3000} onDone={() => setRunConfetti(false)} />
                            <button
                                className={`btn btn-a mt-2 ${selected === "A"
                                    ? dataQuestions1[index].ansA
                                        ? "btn-success"   // xanh nếu đúng
                                        : "btn-danger"   // đỏ nếu sai
                                    : "btn-outline-primary"
                                    }`}
                                onClick={() => {
                                    setSelected("A");
                                    onSound(dataQuestions1[index].feedbackA);
                                    handleGrade(dataQuestions1[index].ansA);
                                    handleAnswer();
                                }}
                                disabled={waiting}
                            >
                                {dataQuestions1[index].A}
                            </button>
                            <button
                                className={`btn btn-a mt-2 ${selected === "B"
                                    ? dataQuestions1[index].ansB
                                        ? "btn-success"   // xanh nếu đúng
                                        : "btn-danger"   // đỏ nếu sai
                                    : "btn-outline-primary"
                                    }`}
                                onClick={() => {
                                    setSelected("B")
                                    onSound(dataQuestions1[index].feedbackB);
                                    handleGrade(dataQuestions1[index].ansB);
                                    handleAnswer();
                                }}
                                disabled={waiting}
                            >
                                {dataQuestions1[index].B}
                            </button>
                            <button
                                className={`btn btn-a mt-2 ${selected === "C"
                                    ? dataQuestions1[index].ansC
                                        ? "btn-success"   // xanh nếu đúng
                                        : "btn-danger"   // đỏ nếu sai
                                    : "btn-outline-primary"
                                    }`}
                                onClick={() => {
                                    setSelected("C")
                                    onSound(dataQuestions1[index].feedbackC);
                                    handleGrade(dataQuestions1[index].ansC);
                                    handleAnswer();
                                }}
                                disabled={waiting}
                            >
                                {dataQuestions1[index].C}
                            </button>
                        </div>
                        {waiting && (
                            <p className="mt-3 text-muted">⏳ Wait for the next question ...</p>
                        )}
                    </motion.div>
                </AnimatePresence>
                {open && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="finishTitle"
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{ background: "rgba(0,0,0,0.5)", zIndex: 2000 }}
                        onClick={() => navigate('/StoryPage')} // click nền để đóng
                    ><div
                        className="bg-white rounded-4 shadow p-4"
                        style={{ width: 420, maxWidth: "90%", alignItems: "center", justifyContent: "center" }}
                        onClick={(e) => e.stopPropagation()} // chặn click xuyên
                    >
                            <h5 id="finishTitle" className="mb-3">{grade}/3 Corrects<br></br>{DataGrade[grade]}</h5>
                            <p className="mb-4 text-center"></p>
                            <div className="d-flex justify-content-end gap-2">
                                <button
                                    ref={closeBtnRef}
                                    type="button"
                                    className="btn btn-secondary hover-3"
                                    onClick={() => navigate('/StoryPage')}
                                >
                                    Exit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};
