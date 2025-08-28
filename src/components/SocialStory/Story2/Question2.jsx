import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { motion, AnimatePresence } from "framer-motion";
import { ttsFunction } from "~/service/ttsService";
import { useNavigate } from "react-router-dom";
import q1s2 from "~/assets/SocialStory2/q1s2.png"
import q2s2 from "~/assets/SocialStory2/q2s2.png"
import q3s2 from "~/assets/SocialStory2/q3s2.png"
import "../Story1/Question1.css"
import { ConfettiEffect } from "../Confetti";
export const Questions2 = () => {
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
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [open]);
    const image = [
        q1s2, q2s2, q3s2
    ]

    const dataQuestions2 = [
        {
            question: "You feel your tummy telling you that you need to pee. What should you do?",
            A: "Stay silent and pee in your underwear.",
            B: "Say, “May I go to the potty, please?”",
            C: "Run around and hold your tummy.",
            feedbackA: "Pee belongs in the potty, not in underwear.",
            feedbackB: "Good job! Asking to go potty is the right choice.",
            feedbackC: "Running around doesn’t help. Let’s ask for the potty.",
            ansA: false,
            ansB: true,
            ansC: false,
        },
        {
            question: "You are sitting on the potty. What should you do next?",
            A: "Pull your pants back up without going.",
            B: "Sit and pee or poop in the potty.",
            C: "Yell and play loudly in the bathroom.",
            feedbackA: "Oops, you forgot to go potty first.",
            feedbackB: "Well done! Pee and poop go in the potty.",
            feedbackC: "Playing in the bathroom is not safe. Let’s focus on potty time.",
            ansA: false,
            ansB: true,
            ansC: false,
        },
        {
            question: "You finish going potty. What should you do after flushing the toilet?",
            A: "Wash your hands with soap and water.",
            B: "Run out of the bathroom without washing.",
            C: "Wipe your hands on your pants.",
            feedbackA: "Great choice! Clean hands keep you healthy.",
            feedbackB: "Not washing can spread germs. Let’s wash next time.",
            feedbackC: "Pants don’t make hands clean. Soap and water do!",
            ansA: true,
            ansB: false,
            ansC: false,
        },
    ];

    const DataGrade = [
        "You did not use the potty today. Let’s try again tomorrow.",     // 0 correct
        "You used the potty 1 time today. Let’s keep practicing! 🙂",     // 1 correct
        "Well done! You used the potty 2 out of 3 times today. 🌟",       // 2 correct
        "Great job! You used the potty 3 out of 3 times today. 🎉",       // 3 correct
    ];

    const handleGrade = (check) => {
        if (check) {
            setGrade(grade + 1);
            setRunConfetti(true);
        }
    }
    const handleAnswer = () => {
        if (waiting) return; // đang chờ thì không click thêm
        setWaiting(true);

        setTimeout(() => {
            if (index < dataQuestions2.length - 1) {
                setSelected(null);
                setDirection(1);
                setIndex(index + 1);
            } else {
                setOpen(true);
                onSound(DataGrade[grade]);
                setRunConfetti(true);
            }
            setWaiting(false);
        }, 5000);
    };



    const onSound = async (text) => {
        const response = await ttsFunction({
            text,
            gender: "female", // hoặc "female"
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
                            <h3 className="mb-4">{dataQuestions2[index].question}</h3>
                            <img src={image[index]} style={{ maxWidth: "40vw", maxHeight: "45vh" }} />
                        </div>
                        <div className="d-flex flex-column gap-3">
                            <ConfettiEffect run={runConfetti} duration={3000} onDone={() => setRunConfetti(false)} />
                            <button
                                className={`btn mt-2 ${selected === "A"
                                    ? dataQuestions2[index].ansA
                                        ? "btn-success"   // xanh nếu đúng
                                        : "btn-danger"   // đỏ nếu sai
                                    : "btn-outline-primary"
                                    }`}
                                onClick={() => {
                                    setSelected("A");
                                    onSound(dataQuestions2[index].feedbackA);
                                    handleAnswer();
                                    handleGrade(dataQuestions2[index].ansA);
                                }}
                                disabled={waiting}
                            >
                                {dataQuestions2[index].A}
                            </button>
                            <button
                                className={`btn mt-2 ${selected === "B"
                                    ? dataQuestions2[index].ansB
                                        ? "btn-success"   // xanh nếu đúng
                                        : "btn-danger"   // đỏ nếu sai
                                    : "btn-outline-primary"
                                    }`}
                                onClick={() => {
                                    setSelected("B")
                                    onSound(dataQuestions2[index].feedbackB);
                                    handleAnswer();
                                    handleGrade(dataQuestions2[index].ansB);
                                }}
                                disabled={waiting}
                            >
                                {dataQuestions2[index].B}
                            </button>
                            <button
                                className={`btn mt-2 ${selected === "C"
                                    ? dataQuestions2[index].ansC
                                        ? "btn-success"   // xanh nếu đúng
                                        : "btn-danger"   // đỏ nếu sai
                                    : "btn-outline-primary"
                                    }`}
                                onClick={() => {
                                    setSelected("C")
                                    onSound(dataQuestions2[index].feedbackC);
                                    handleAnswer();
                                    handleGrade(dataQuestions2[index].ansC)
                                }}
                                disabled={waiting}
                            >
                                {dataQuestions2[index].C}
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
