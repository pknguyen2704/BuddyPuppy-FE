
import { Routes, Route } from "react-router-dom"
import { Home } from "./components/Home/Home"
import { LogIn } from "./components/login/LogIn"
import { SignUp } from "./components/signup/signup"
import { HomeScreen } from "./components/homescreen/homescreen"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home-screen" element={<HomeScreen />} />
      <Route path="/about" element={<h1>About BuddyPuppy</h1>} />
      <Route path="/contact" element={<h1>Contact Us</h1>} />
    </Routes>
  )
}

export default App
