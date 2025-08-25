import bell from "../../assets/bell 1.png";
import corgi from "../../assets/corgi 3.png";
import story from "../../assets/story.png";
import study from "../../assets/pecs.png";
import speakers from "../../assets/speakers.png";
import avatar from "../../assets/avatar.png";
import "./homescreen.css";
import { useNavigate } from "react-router-dom";

export const HomeScreen = () => {

    const navigate = useNavigate();

    return (
        <div className="home-screen">
            <div className="hs-container">
                <div className="hs-container-btn">
                    <img src={bell} alt="Notifications" className="hs-motifications" />
                    <img src={speakers} alt="Music" className="hs-music" />
                    <img src={avatar} alt="avatar" className="hs-avatar" />
                </div>
                <div className="hs-container-text-hello">
                    <h3 className="hs-hello">Hi, My Name Is Buddy Puppy</h3>
                </div>
                <div className="hs-container-character">
                    <img src={corgi} alt="Character" className="hs-character" />
                </div>
                <div className="hs-main-content">
                    <div className="hs-container-text-title">
                        <h1 className="hs-title">Welcome to Buddy Puppy</h1>
                        <h2 className="hs-subtitle">An English Learning Application</h2>
                        <h2 className="hs-subtitle">For ASD Children</h2>
                    </div>
                    <div className="hs-utilities">
                        <div className="hs-container-util">
                            <img src={study} alt="Study" className="hs-util-image" onClick={() => navigate("/phase1")} />
                            <h1 className="hs-util-title">STUDY WITH PUPPY</h1>
                        </div>
                        <div className="hs-container-util">
                            <img src={story} alt="Story" className="hs-util-image" onClick={() => navigate("/StoryPage")} />
                            <h1 className="hs-util-title">SOCIAL STORY</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}