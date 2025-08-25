import character from "~/assets/corgi 3.png"
import "./StoryPage.css"
import story1 from "~/assets/SocialStory1/story1.png"
import story2 from "~/assets/SocialStory2/story2.png"
import story3 from "~/assets/SocialStory3/story3.png"
import { useNavigate, Outlet } from "react-router-dom"

export const StoryPage = () => {
    const navigate = useNavigate();
    return (
        <div className="StoryPage">
            <div className="Story-container">
                <div className="st-header">
                    <div className="st-back">Back</div>
                    <div className="st-title">SOCIAL STORY</div>
                </div>
                <div className="st-container-character">
                    <img src={character} className="st-character"></img>
                </div>
                <div className="st-container-util">
                    <div className="st-util-title">Let's Start</div>
                    <div className="st-utilities">
                        <div className="util-container" onClick={() => navigate("/SocialStory1")}>
                            <img src={story1} alt="Story1" className="st-util-image" />
                            <h1 className="st-util-title">CONTROL YOUR ANGER</h1>
                        </div>
                        <div className="util-container" onClick={() => navigate("/SocialStory2")}>
                            <img src={story2} alt="Story1" className="st-util-image" />
                            <h1 className="st-util-title">POTTY-TRAINING</h1>
                        </div>
                        <div className="util-container" onClick={() => navigate("/SocialStory3")}>
                            <img src={story3} alt="Story1" className="st-util-image" />
                            <h1 className="st-util-title">SAY HI AND GOODBYE</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}