import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { motion, AnimatePresence } from "framer-motion";
import { ttsFunction } from "~/service/ttsService";
import { useNavigate } from "react-router-dom";
import q1s3 from "~/assets/SocialStory3/q1s3.png"
import q2s3 from "~/assets/SocialStory3/q2s3.png"
import q3s3 from "~/assets/SocialStory3/q3s3.png"
import "../Story1/Question1.css"
import { ConfettiEffect } from "../Confetti";
export const Questions3 = () => {
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
        q1s3, q2s3, q3s3
    ]

    const dataQuestions3 = [
        {
            question: "You see your friend at school. They wave and say, “Hi!”",
            A: "Look away and say nothing.",
            B: "Wave back and say, “Hi, buddy!”",
            C: "Shout loudly and run past them.",
            feedbackA: "Ignoring can make your friend feel sad. Let’s try again.",
            feedbackB: "Good job! Saying hi back makes your friend happy.",
            feedbackC: "Running away is not polite. Let’s use kind words.",
            ansA: false,
            ansB: true,
            ansC: false,
            gender: "male",
        },
        {
            question: "Your grandma comes to visit and says, “Hello!”",
            A: "Say, “Hi Grandma!” and smile.",
            B: "Hide and don’t answer.",
            C: "Say, “What’s up?” in a silly voice.",
            feedbackA: "Well done! Saying hi to Grandma is polite.",
            feedbackB: "Hiding is not friendly. Let’s greet Grandma nicely.",
            feedbackC: "Silly words may confuse Grandma. Use kind greetings.",
            ansA: true,
            ansB: false,
            ansC: false,
            gender: "female",
        },
        {
            question: "Your teacher says, “Goodbye, see you tomorrow!”",
            A: "Say, “Bye!” and wave back.",
            B: "Walk away without saying anything.",
            C: "Make a funny face instead of saying goodbye.",
            feedbackA: "Great choice! Saying goodbye shows good manners.",
            feedbackB: "Not saying goodbye is not polite. Let’s remember next time.",
            feedbackC: "Funny faces are not the same as saying goodbye.",
            ansA: true,
            ansB: false,
            ansC: false,
            gender: "male",
        },
    ];

    const DataGrade = [
        "You did not greet people today. Let’s try again tomorrow. 💡",           // 0 correct
        "You greeted people 1 time today. Let’s keep practicing! 🙂",             // 1 correct
        "Well done! You greeted people 2 out of 3 times today. 🌟",               // 2 correct
        "Great job! You said hi and goodbye 3 out of 3 times today. 🎉",          // 3 correct
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
            if (index < dataQuestions3.length - 1) {
                setSelected(null);
                setDirection(1);
                setIndex(index + 1);
            } else {
                setOpen(true);
                onSound(DataGrade[grade], "female");
                setRunConfetti(true);
            }
            setWaiting(false);
        }, 5000);
    };



    const onSound = async (text, gender) => {
        const response = await ttsFunction({
            text,
            gender,
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
                            <h3 className="mb-4">{dataQuestions3[index].question}</h3>
                            <img src={image[index]} style={{ maxWidth: "40vh" }} />
                        </div>
                        <div className="d-flex flex-column gap-3">
                            <ConfettiEffect run={runConfetti} duration={3000} onDone={() => setRunConfetti(false)} />
                            <button
                                className={`btn mt-2 ${selected === "A"
                                    ? dataQuestions3[index].ansA
                                        ? "btn-success"   // xanh nếu đúng
                                        : "btn-danger"   // đỏ nếu sai
                                    : "btn-outline-primary"
                                    }`}
                                onClick={() => {
                                    setSelected("A");
                                    onSound(dataQuestions3[index].feedbackA, dataQuestions3[index].gender);
                                    handleAnswer();
                                    handleGrade(dataQuestions3[index].ansA);
                                }}
                                disabled={waiting}
                            >
                                {dataQuestions3[index].A}
                            </button>
                            <button
                                className={`btn mt-2 ${selected === "B"
                                    ? dataQuestions3[index].ansB
                                        ? "btn-success"   // xanh nếu đúng
                                        : "btn-danger"   // đỏ nếu sai
                                    : "btn-outline-primary"
                                    }`}
                                onClick={() => {
                                    setSelected("B")
                                    onSound(dataQuestions3[index].feedbackB, dataQuestions3[index].gender);
                                    handleAnswer();
                                    handleGrade(dataQuestions3[index].ansB);
                                }}
                                disabled={waiting}
                            >
                                {dataQuestions3[index].B}
                            </button>
                            <button
                                className={`btn mt-2 ${selected === "C"
                                    ? dataQuestions3[index].ansC
                                        ? "btn-success"   // xanh nếu đúng
                                        : "btn-danger"   // đỏ nếu sai
                                    : "btn-outline-primary"
                                    }`}
                                onClick={() => {
                                    setSelected("C")
                                    onSound(dataQuestions3[index].feedbackC, dataQuestions3[index].gender);
                                    handleAnswer();
                                    handleGrade(dataQuestions3[index].ansC)
                                }}
                                disabled={waiting}
                            >
                                {dataQuestions3[index].C}
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
