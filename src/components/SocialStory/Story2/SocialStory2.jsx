import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SocialStory2.css";

import { ttsFunction } from "~/service/ttsService";
import { Volume2, ArrowLeft, ArrowRight } from "lucide-react";
import image1 from "~/assets/SocialStory2/S2-image1.jpg";
import image2 from "~/assets/SocialStory2/S2-image2.jpg";
import image3 from "~/assets/SocialStory2/S2-image3.jpg";
import image4 from "~/assets/SocialStory2/S2-image4.jpg";
import image5 from "~/assets/SocialStory2/S2-image6.jpg";
import image6 from "~/assets/SocialStory2/S2-image5.jpg";
import image7 from "~/assets/SocialStory2/S2-image7.jpg";
import image8 from "~/assets/SocialStory2/S2-image8.jpg";
import image9 from "~/assets/SocialStory2/S2-image9.jpg";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

export const SocialStory2 = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const navigate = useNavigate();

    const dataText = [
        { text: "When my family members and friends see me, they say hi, hello, or they wave.", gender: "female" },
        { text: "When they say hi or wave, I should say hi or wave back.", gender: "male" },
        { text: "Hey there!", gender: "male" },
        { text: "Hi, buddy!", gender: "male" },
        { text: "How’s it going?", gender: "male" },
        { text: "What's up?", gender: "male" },
        { text: "When I say “hi” to my friends, I can say ...", gender: "female" },
        { text: "Hi Mom! Hi Dad!", gender: "female" },
        { text: "Hi, Grandma! Hi, Grandpa!", gender: "female" },
        { text: "Hello, everyone!", gender: "female" },
        { text: "Hi, brother! Hi, sister!", gender: "female" },
        { text: "When I say hi to my family, I can say ...", gender: "male" },
        { text: "Good morning!", gender: "male" },
        { text: "Hello, Sir/Ma’am", gender: "male" },
        { text: "Nice to meet you", gender: "male" },
        { text: "When I say “hi” to an adult, I can say ...", gender: "female" },
        { text: "When they are leaving, they say bye, or wave.", gender: "female" },
        { text: "When they say bye or way, I should say bye or wave back", gender: "male" },
        { text: "Goodbye!", gender: "male" },
        { text: "See you!", gender: "male" },
        { text: "So long!", gender: "male" },
        { text: "Later!", gender: "male" },
        { text: "I can say ...", gender: "female" },
        { text: "Now I know how to say “hi” and “goodbye” to people.", gender: "female" },
    ];

    const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

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
                            <div className="position-relative w-100 text-center s2div-1">
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
                            <div className="position-relative w-100 text-center s2div-2">
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
                            <div className="position-relative w-100 text-center s2div-3">
                                <img src={image3} alt="story-3" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-1"
                                    onClick={() => onSound(2)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-2"
                                    onClick={() => onSound(3)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-3"
                                    onClick={() => onSound(4)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-4"
                                    onClick={() => onSound(5)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-5"
                                    onClick={() => onSound(6)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 4 */}
                        {index === 3 && (
                            <div className="position-relative w-100 text-center s2div-4">
                                <img src={image4} alt="story-4" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-1"
                                    onClick={() => onSound(7)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-2"
                                    onClick={() => onSound(8)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-3"
                                    onClick={() => onSound(9)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-4"
                                    onClick={() => onSound(10)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-5"
                                    onClick={() => onSound(11)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}



                        {/* Slide 5 */}
                        {index === 4 && (
                            <div className="position-relative w-100 text-center s2div-6">
                                <img src={image6} alt="story-5" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-1"
                                    onClick={() => onSound(12)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-2"
                                    onClick={() => onSound(13)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-3"
                                    onClick={() => onSound(14)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-4"
                                    onClick={() => onSound(15)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 6 */}
                        {index === 5 && (
                            <div className="position-relative w-100 text-center s2div-5">
                                <img src={image5} alt="story-6" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3"
                                    onClick={() => onSound(16)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 7 */}
                        {index === 6 && (
                            <div className="position-relative w-100 text-center s2div-7">
                                <img src={image7} alt="story-7" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute me-3"
                                    onClick={() => onSound(17)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}
                        {index === 7 && (
                            <div className="position-relative w-100 text-center s2div-8">
                                <img src={image8} alt="story-8" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-1"
                                    onClick={() => onSound(18)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-2"
                                    onClick={() => onSound(19)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-3"
                                    onClick={() => onSound(20)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-4"
                                    onClick={() => onSound(21)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-5"
                                    onClick={() => onSound(22)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}
                        {index === 8 && (
                            <div className="position-relative w-100 text-center s2div-9">
                                <img src={image9} alt="story-9" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute me-3"
                                    onClick={() => onSound(23)}
                                >
                                    <Volume2 />
                                </button>
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
            </div>
        </div>
    );
};
