import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SocialStory.css"
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

    return (
        <div className="container-fluid bg-warning p-3 vh-100 d-flex justify-content-center align-items-center">
            <div className="bg-white rounded-4 shadow position-relative w-100 h-100 d-flex justify-content-center align-items-center">

                {/* Slide 1 */}
                {index === 0 && (
                    <div className="position-relative w-100 text-center div-1">
                        <img src={image1} alt="story-1" className="img-fluid rounded" />
                        <button className="btn btn-light rounded-circle position-absolute m-3">
                            <Volume2 />
                        </button>
                    </div>
                )}

                {/* Slide 2 */}
                {index === 1 && (
                    <div className="position-relative w-100 text-center div-2">
                        <img src={image2} alt="story-2" className="img-fluid rounded" />
                        <button className="btn btn-light rounded-circle position-absolute m-3">
                            <Volume2 />
                        </button>
                    </div>
                )}

                {/* Slide 3 */}
                {index === 2 && (
                    <div className="position-relative w-100 text-center div-3">
                        <img src={image3} alt="story-3" className="img-fluid rounded" />
                        <button className="btn btn-light rounded-circle position-absolute m-3">
                            <Volume2 />
                        </button>
                    </div>
                )}

                {/* Slide 4 */}
                {index === 3 && (
                    <div className="position-relative w-100 text-center div-4">
                        <img src={image4} alt="story-4" className="img-fluid rounded" />
                        <button className="btn btn-light rounded-circle position-absolute m-3">
                            <Volume2 />
                        </button>
                    </div>
                )}

                {/* Slide 5 */}
                {index === 4 && (
                    <div className="position-relative w-100 text-center div-5">
                        <img src={image5} alt="story-5" className="img-fluid rounded" />
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-1">
                            <Volume2 />
                        </button>
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-2">
                            <Volume2 />
                        </button>
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-3">
                            <Volume2 />
                        </button>
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-4">
                            <Volume2 />
                        </button>
                    </div>
                )}

                {/* Slide 6 */}
                {index === 5 && (
                    <div className="position-relative w-100 text-center div-6">
                        <img src={image6} alt="story-6" className="img-fluid rounded" />
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-1">
                            <Volume2 />
                        </button>
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-2">
                            <Volume2 />
                        </button>
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-3">
                            <Volume2 />
                        </button>
                        <button className="btn btn-light rounded-circle position-absolute m-3 bt-4">
                            <Volume2 />
                        </button>
                    </div>
                )}

                {/* Slide 7 */}
                {index === 6 && (
                    <div className="position-relative w-100 text-center div-7">
                        <img src={image7} alt="story-7" className="img-fluid rounded" />
                        <button className="btn btn-light rounded-circle position-absolute me-3">
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
