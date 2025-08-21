import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SocialStory3.css";

import { ttsFunction } from "~/service/ttsService";
import { Volume2, ArrowLeft, ArrowRight } from "lucide-react";
import image1 from "~/assets/SocialStory3/S3-image1.jpg";
import image2 from "~/assets/SocialStory3/S3-image2.jpg";
import image3 from "~/assets/SocialStory3/S3-image3.jpg";
import image4 from "~/assets/SocialStory3/S3-image4.jpg";
import image5 from "~/assets/SocialStory3/S3-image6.jpg";
import image6 from "~/assets/SocialStory3/S3-image5.jpg";
import image7 from "~/assets/SocialStory3/S3-image7.jpg";
import image8 from "~/assets/SocialStory3/S3-image8.jpg";
import image9 from "~/assets/SocialStory3/S3-image9.jpg";
import image10 from "~/assets/SocialStory3/S3-image10.jpg";
import image11 from "~/assets/SocialStory3/S3-image11.jpg";
import image12 from "~/assets/SocialStory3/S3-image12.jpg";

import { motion, AnimatePresence } from "framer-motion";

export const SocialStory3 = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const dataText = [
        { text: "I want to go to the potty !", gender: "female" },
        { text: "When my tummy feels like I need to pee or poop, I need to say ...", gender: "male" },
        { text: "May I go to the potty, please?", gender: "male" },
        { text: "When my bracelet shakes and lights up, I need to say...", gender: "female"},
        { text: "May I go to the potty, please?", gender: "female" },
        { text: "Pee and poop do not go in your underwear. That is gross.", gender: "male" },
        { text: "First, when I get to the potty:", gender: "male" },
        { text: "I need to pull my pants and panties down", gender: "male" },
        { text: "Pee and poop go into the potty !", gender: "male" },
        { text: "Next, I sit on the potty and go pee and poop.", gender: "female" },
        { text: "When I am done, I use toilet paper to wipe my bottom all clean.", gender: "male" },
        { text: "Then, I need to flush the toilet.", gender: "male" },
        { text: "Next, I put my panties and pants back up.", gender: "male" },
        { text: "Last, I wash my hands...", gender: "male" },
        { text: "... until they're all clean !", gender: "female" },
        { text: "I did it ! I can pee and poop in the potty.", gender: "female" },

    ];

    const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12];

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
                            <div className="position-relative w-100 text-center div-1">
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
                            <div className="position-relative w-100 text-center div-2">
                                <img src={image2} alt="story-2" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-1"
                                    onClick={() => onSound(1)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-2"
                                    onClick={() => onSound(2)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 3 */}
                        {index === 2 && (
                            <div className="position-relative w-100 text-center div-3">
                                <img src={image3} alt="story-3" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-1"
                                    onClick={() => onSound(3)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-2"
                                    onClick={() => onSound(4)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 4 */}
                        {index === 3 && (
                            <div className="position-relative w-100 text-center div-4">
                                <img src={image4} alt="story-4" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-1"
                                    onClick={() => onSound(5)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 5 */}
                        {index === 4 && (
                            <div className="position-relative w-100 text-center div-5">
                                <img src={image5} alt="story-5" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-1"
                                    onClick={() => onSound(6)}
                                >
                                    <Volume2 />
                                </button> 
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-2"
                                    onClick={() => onSound(7)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 6 */}
                        {index === 5 && (
                            <div className="position-relative w-100 text-center div-6">
                                <img src={image6} alt="story-6" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3"
                                    onClick={() => onSound(8)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}

                        {/* Slide 7 */}
                        {index === 6 && (
                            <div className="position-relative w-100 text-center div-7">
                                <img src={image7} alt="story-7" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute me-3"
                                    onClick={() => onSound(9)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}
                        {index === 7 && (
                            <div className="position-relative w-100 text-center div-8">
                                <img src={image8} alt="story-8" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute m-3 bt-1"
                                    onClick={() => onSound(10)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}
                        {index === 8 && (
                            <div className="position-relative w-100 text-center div-9">
                                <img src={image9} alt="story-9" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute me-3"
                                    onClick={() => onSound(11)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}
                        {index === 9 && (
                            <div className="position-relative w-100 text-center div-10">
                                <img src={image10} alt="story-9" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute me-3"
                                    onClick={() => onSound(12)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}
                        {index === 10 && (
                            <div className="position-relative w-100 text-center div-11">
                                <img src={image11} alt="story-9" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute me-3 bt-1"
                                    onClick={() => onSound(13)}
                                >
                                    <Volume2 />
                                </button>
                                <button
                                    className="btn btn-light rounded-circle position-absolute me-3 bt-2"
                                    onClick={() => onSound(14)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}
                        {index === 11 && (
                            <div className="position-relative w-100 text-center div-12">
                                <img src={image12} alt="story-9" className="img-fluid rounded" />
                                <button
                                    className="btn btn-light rounded-circle position-absolute me-3"
                                    onClick={() => onSound(15)}
                                >
                                    <Volume2 />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

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
