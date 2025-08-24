
import { Routes, Route } from "react-router-dom"
import { Home } from "./components/home/Home"
import { LogIn } from "./components/login/LogIn"
import { SignUp } from "./components/signup/SignUp"
import { SocialStory1 } from './components/SocialStory/Story1/SocialStory1'
import { SocialStory2 } from './components/SocialStory/Story2/SocialStory2'
import { SocialStory3 } from './components/SocialStory/Story3/SocialStory3'
import { Phase1 } from './components/pecs/Phase1.jsx'
import { Phase2 } from "./components/pecs/Phase2.jsx"
import { Phase3 } from "./components/pecs/Phase3.jsx"
import { Phase4 } from "./components/pecs/Phase4.jsx"
import { Phase5 } from "./components/pecs/Phase5.jsx"
import { Phase6 } from "./components/pecs/Phase6.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup1" element={<SignUp />} />
      <Route path="/about" element={<h1>About BuddyPuppy</h1>} />
      <Route path="/contact" element={<h1>Contact Us</h1>} />

      <Route path="/SocialStory1" element={<SocialStory1 />} />
      <Route path="/SocialStory2" element={<SocialStory2 />} />
      <Route path="/SocialStory3" element={<SocialStory3 />} />

      <Route path="/phase1" element={<Phase1 />} />
      <Route path="/phase2" element={<Phase2 />} />
      <Route path="/phase3" element={<Phase3 />} />
      <Route path="/phase4" element={<Phase4 />} />
      <Route path="/phase5" element={<Phase5 />} />
      <Route path="/phase6" element={<Phase6 />} />

    </Routes>
  )
}

export default App
