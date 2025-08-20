import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SocialStory.css"
import { ttsFunction } from "../../service/ttsService";
import { Volume2, ArrowLeft, ArrowRight } from "lucide-react";
import image1 from "../../assets/SocialStory1/S1-image1.jpg";
import image2 from "../../assets/SocialStory1/S1-image2.jpg";
import image3 from "../../assets/SocialStory1/S1-image3.png";
import image4 from "../../assets/SocialStory1/S1-image4.png";
import image5 from "../../assets/SocialStory1/S1-image6.png";
import image6 from "../../assets/SocialStory1/S1-image5.png";
import image7 from "../../assets/SocialStory1/S1-image7.jpg";

export const SocialStory = () => {
    const [index, setIndex] = useState(0);

    const prevImage = () => setIndex((prev) => (prev === 0 ? 0 : prev - 1));
    const nextImage = () => setIndex((prev) => (prev === 6 ? 6 : prev + 1));

    const dataText = [
        {
            text: "Sometimes I get angry. That's okay",
            gender: "male"
        },
        {
            text: "But I have to learn how to control it!",
            gender: "male"
        },
        {
            text: "When I get too angry, my engine runs really high!",
            gender: "male"
        },
        {
            text: "To bring my engine down to be right, I can ...",
            gender: "female"
        },
        {
            text: "I can ask for help",
            gender: "female"
        },
        {
            text: "I can ask for hugs",
            gender: "male"
        },
        {
            text: "I can do what I enjoy",
            gender: "male"
        },
        {
            text: "I can talk with someone",
            gender: "female"
        },
        {
            text: "I can take deep breath",
            gender: "male"
        },
        {
            text: "I can count to ten",
            gender: "female"
        },
        {
            text: "I can ask for space",
            gender: "male"
        },
        {
            text: "I can take a walk",
            gender: "female"
        },
        {
            text: "I did it! Now I feel better",
            gender: "male"
        },

    ]

    const onSound = async (index) => {
        const response = await ttsFunction({
            "text": dataText[index].text,
            "gender": dataText[index].gender
        })
        console.log(response)
        const audioBlob = new Blob([response], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        console.log(audio)
        audio.play();
    }

    return (
        <div className="container-fluid bg-warning p-3 vh-100 d-flex justify-content-center align-items-center">
            <div className="bg-white rounded-4 shadow position-relative w-100 h-100 d-flex justify-content-center align-items-center">

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
                        <button className="btn btn-light rounded-circle position-absolute m-3"
                            onClick={() => onSound(1)}
                        >
                            <Volume2 />
                        </button>
                    </div>
                )}

                {/* Slide 3 */}
                {index === 2 && (
                    <div className="position-relative w-100 text-center div-3">
                        <img src={image3} alt="story-3" className="img-fluid rounded" />
                        <button className="btn btn-light rounded-circle position-absolute m-3"
                            onClick={() => onSound(2)}
                        >
                            <Volume2 />
                        </button>
                    </div>
                )}

                {/* Slide 4 */}
                {index === 3 && (
                    <div className="position-relative w-100 text-center div-4">
                        <img src={image4} alt="story-4" className="img-fluid rounded" />
                        <button className="btn btn-light rounded-circle position-absolute m-3"
                            onClick={() => onSound(3)}
                        >
                            <Volume2 />
                        </button>
                    </div>
                )}

                {/* Slide 5 */}
                {index === 4 && (
                    <div className="position-relative w-100 text-center div-5">
                        <img src={image5} alt="story-5" className="img-fluid rounded" />
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-1"
                            onClick={() => onSound(4)}>


                            <Volume2 />
                        </button>
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-2"
                            onClick={() => onSound(5)}>
                            <Volume2 />
                        </button>
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-3"
                            onClick={() => onSound(6)}>
                            <Volume2 />
                        </button>
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-4"
                            onClick={() => onSound(7)}>
                            <Volume2 />
                        </button>
                    </div>
                )}

                {/* Slide 6 */}
                {index === 5 && (
                    <div className="position-relative w-100 text-center div-6">
                        <img src={image6} alt="story-6" className="img-fluid rounded" />
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-1"
                            onClick={() => onSound(8)}>
                            <Volume2 />
                        </button>
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-2"
                            onClick={() => onSound(9)}>
                            <Volume2 />
                        </button>
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-3"
                            onClick={() => onSound(10)}>
                            <Volume2 />
                        </button>
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-4"
                            onClick={() => onSound(11)}>
                            <Volume2 />
                        </button>
                    </div>
                )}

                {/* Slide 7 */}
                {index === 6 && (
                    <div className="position-relative w-100 text-center div-7">
                        <img src={image7} alt="story-7" className="img-fluid rounded" />
                        <button className="btn btn-light rounded-circle position-absolute me-3"
                            onClick={() => onSound(12)}>
                            <Volume2 />
                        </button>
                    </div>
                )}

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
