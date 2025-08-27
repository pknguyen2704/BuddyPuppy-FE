
import { Routes, Route } from "react-router-dom"
import { Home } from "./components/home/Home"
import { LogIn } from "./components/login/LogIn"
import { SignUp } from "./components/signup/SignUp"
import { HomeScreen } from "./components/homescreen/homescreen.jsx"
import { StoryPage } from "./components/SocialStory/StoryPage.jsx"
import { SocialStory1 } from './components/SocialStory/Story1/SocialStory1'
import { SocialStory2 } from './components/SocialStory/Story2/SocialStory2'
import { SocialStory3 } from './components/SocialStory/Story3/SocialStory3'
import { Phase1 } from './components/pecs/Phase1.jsx'
import { Phase2 } from "./components/pecs/Phase2.jsx"
import { Phase3p1 } from "./components/pecs/Phase3p1.jsx"
import { Phase3p2 } from "./components/pecs/Phase3p2.jsx"
import { Phase3p3 } from "./components/pecs/Phase3p3.jsx"
import { Phase4 } from "./components/pecs/Phase4.jsx"
import { Phase5p1 } from "./components/pecs/Phase5p1.jsx"
import { Phase5p2 } from "./components/pecs/Phase5p2.jsx"
import { Phase5p3 } from "./components/pecs/Phase5p3.jsx"
import { Phase5p4 } from "./components/pecs/Phase5p4.jsx"
import { Phase6 } from "./components/pecs/Phase6.jsx"
import { ProtectedRoute } from "./protectedComponent.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<h1>About BuddyPuppy</h1>} />
      <Route path="/contact" element={<h1>Contact Us</h1>} />


      <Route path="/StoryPage" element={
        <ProtectedRoute>
          <StoryPage />
        </ProtectedRoute>
      } />


      <Route path="/homescreen" element={
        <ProtectedRoute>
          <HomeScreen />
        </ProtectedRoute>
      } />

      <Route path="/SocialStory1" element={
        <ProtectedRoute>
          <SocialStory1 />
        </ProtectedRoute>
      } />
      <Route path="/SocialStory2" element={
        <ProtectedRoute>
          <SocialStory2 />
        </ProtectedRoute>
      } />
      <Route path="/SocialStory3" element={
        <ProtectedRoute>
          <SocialStory3 />
        </ProtectedRoute>
      } />

      <Route path="/phase1" element={
        <ProtectedRoute>
          <Phase1 />
        </ProtectedRoute>
      } />
      <Route path="/phase2" element={
        <ProtectedRoute>
          <Phase2 />
        </ProtectedRoute>
      } />
      <Route path="/phase3p1" element={
        <ProtectedRoute>
          <Phase3p1 />
        </ProtectedRoute>
      } />
      <Route path="/phase3p2" element={
        <ProtectedRoute>
          <Phase3p2 />
        </ProtectedRoute>
      } />
      <Route path="/phase3p3" element={
        <ProtectedRoute>
          <Phase3p3 />
        </ProtectedRoute>
      } />
      <Route path="/phase4" element={
        <ProtectedRoute>
          <Phase4 />
        </ProtectedRoute>
      } />
      <Route path="/phase5p1" element={
        <ProtectedRoute>
          <Phase5p1 />
        </ProtectedRoute>
      } />
      <Route path="/phase5p2" element={
        <ProtectedRoute>
          <Phase5p2 />
        </ProtectedRoute>
      } />
      <Route path="/phase5p3" element={
        <ProtectedRoute>
          <Phase5p3 />
        </ProtectedRoute>
      } />
      <Route path="/phase5p4" element={
        <ProtectedRoute>
          <Phase5p4 />
        </ProtectedRoute>
      } />
      <Route path="/phase6" element={
        <ProtectedRoute>
          <Phase6 />
        </ProtectedRoute>
      } />

    </Routes>
  )
}

export default App
