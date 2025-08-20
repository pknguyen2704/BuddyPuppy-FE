
import { Routes, Route } from "react-router-dom"
import { Home } from "./components/Home/Home"
import { LogIn } from "./components/login/LogIn"
import { SignUp } from "./components/signup/signup"
import { HomeScreen } from "./components/homescreen/homescreen"
import { SocialStory } from './components/SocialStory/SocialStory'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup1" element={<SignUp />} />
      <Route path="/about" element={<h1>About BuddyPuppy</h1>} />
      <Route path="/contact" element={<h1>Contact Us</h1>} />
      <Route path="/home-screen" element={<HomeScreen />} />
      <Route path="/SocialStory" element={<SocialStory />} />

    </Routes>
  )
}

export default App
