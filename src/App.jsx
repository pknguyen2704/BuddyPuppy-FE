
import { Routes, Route } from "react-router-dom"
import { Home } from "./components/home/Home"
import { LogIn } from "./components/login/LogIn"
import { SignUp } from "./components/signup/SignUp"
import { SocialStory1 } from './components/SocialStory/Story1/SocialStory1'
import { SocialStory2 } from './components/SocialStory/Story2/SocialStory2'

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

    </Routes>
  )
}

export default App
