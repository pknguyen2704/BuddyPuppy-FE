import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./SocialStory1.css";

import { ttsFunction } from "~/service/ttsService";
import { Volume2, ArrowLeft, ArrowRight } from "lucide-react";
import image1 from "~/assets/SocialStory1/S1-image1.png";
import image2 from "~/assets/SocialStory1/S1-image2.png";
import image3 from "~/assets/SocialStory1/S1-image3.png";
import image4 from "~/assets/SocialStory1/S1-image4.png";
import image5 from "~/assets/SocialStory1/S1-image6.png";
import image6 from "~/assets/SocialStory1/S1-image5.png";
import image7 from "~/assets/SocialStory1/S1-image7.png";
import { useNavigate } from "react-router-dom";


import { motion, AnimatePresence } from "framer-motion";

export const SocialStory1 = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const closeBtnRef = useRef(null);

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

    const dataText = [
        { text: "Sometimes I get angry. That's okay", gender: "male" },
        { text: "But I have to learn how to control it!", gender: "male" },
        { text: "When I get too angry, my engine runs really high!", gender: "male" },
        { text: "To bring my engine down to be right, I can ...", gender: "female" },
        { text: "I can ask for help", gender: "female" },
        { text: "I can ask for hugs", gender: "male" },
        { text: "I can do what I enjoy", gender: "male" },
        { text: "I can talk with someone", gender: "female" },
        { text: "I can take deep breath", gender: "male" },
        { text: "I can count to ten", gender: "female" },
        { text: "I can ask for space", gender: "male" },
        { text: "I can take a walk", gender: "female" },
        { text: "I did it! Now I feel better", gender: "male" },
    ];

    const images = [image1, image2, image3, image4, image5, image6, image7];

    const prevImage = () => {
        if (index > 0) {
            setDirection(-1);
            setIndex(index - 1);
        }
    };

    const nextImage = () => {
        if (index < images.length - 1) {
            setDirection(1);
            setIndex(index + 1);
        }
    };

    const onSound = async (idx) => {
        const response = await ttsFunction({
            text: dataText[idx].text,
            gender: dataText[idx].gender,
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
                        className="w-100 h-100 d-flex justify-content-center align-items-center"
                    >
                        {/* Slide 1 */}
                        {index === 0 && (
                            <div className="position-relative w-100 text-center s1div-1">
                                <img src={image1} alt="story-1" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3"
                                    onClick={() => onSound(0)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 2 */}
                        {index === 1 && (
                            <div className="position-relative w-100 text-center s1div-2">
                                <img src={image2} alt="story-2" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3"
                                    onClick={() => onSound(1)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 3 */}
                        {index === 2 && (
                            <div className="position-relative w-100 text-center s1div-3">
                                <img src={image3} alt="story-3" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3"
                                    onClick={() => onSound(2)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 4 */}
                        {index === 3 && (
                            <div className="position-relative w-100 text-center s1div-4">
                                <img src={image4} alt="story-4" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3"
                                    onClick={() => onSound(3)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 5 */}
                        {index === 4 && (
                            <div className="position-relative w-100 text-center s1div-5">
                                <img src={image5} alt="story-5" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-1"
                                    onClick={() => onSound(4)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-2"
                                    onClick={() => onSound(5)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-3"
                                    onClick={() => onSound(6)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-4"
                                    onClick={() => onSound(7)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 6 */}
                        {index === 5 && (
                            <div className="position-relative w-100 text-center s1div-6">
                                <img src={image6} alt="story-6" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-1"
                                    onClick={() => onSound(8)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-2"
                                    onClick={() => onSound(9)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-3"
                                    onClick={() => onSound(10)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-4"
                                    onClick={() => onSound(11)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 7 */}
                        {index === 6 && (
                            <div className="position-relative w-100 text-center s1div-7">
                                <img src={image7} alt="story-7" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute me-3"
                                    onClick={() => onSound(12)}
                                >
                                    <Volume2 />
                                </button>
                                <div className="finish-container" >
                                    <h2 className="finish" onClick={() => setOpen(true)} >Finish</h2>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
                <div className="container-back" onClick={() => navigate("/StoryPage")}>
                    <h2 className="Back">Exit</h2>
                </div>
                {/* nút điều hướng */}
                <button
                    className="btn btn-light rounded-circle position-absolute top-50 start-0 translate-middle-y ms-2 d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "60px" }}
                    onClick={prevImage}
                >
                    <ArrowLeft size={20} />
                </button>

                <button
                    className="btn btn-light rounded-circle position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "60px" }}
                    onClick={nextImage}
                >
                    <ArrowRight size={20} />

                </button>
                {open && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="finishTitle"
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{ background: "rgba(0,0,0,0.5)", zIndex: 2000 }}
                        onClick={() => setOpen(false)} // click nền để đóng
                    >
                        <div
                            className="bg-white rounded-4 shadow p-4"
                            style={{ width: 420, maxWidth: "90%" }}
                            onClick={(e) => e.stopPropagation()} // chặn click xuyên
                        >
                            <h5 id="finishTitle" className="mb-3">🎉 Congratulations!</h5>
                            <p className="mb-4 text-center">You finished the story!<br></br> Now let answer some questions</p>
                            <div className="d-flex justify-content-end gap-2">
                                <button
                                    ref={closeBtnRef}
                                    type="button"
                                    className="btn btn-secondary hover-1"
                                    onClick={() => setOpen(false)}
                                >
                                    Close
                                </button>
                                <button
                                    ref={closeBtnRef}
                                    type="button"
                                    className="btn btn-secondary hover-2"
                                    onClick={() => navigate("/questionsStory1")}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
