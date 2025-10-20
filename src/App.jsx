import { Routes, Route, Navigate } from "react-router-dom"
import { ProtectedRoute } from "./protectedComponent.jsx"
// import { Home } from "./components/home/Home"
// import { LogIn } from "./components/login/LogIn"
// import { SignUp } from "./components/signup/SignUp"
import { HomeScreen } from "./components/homescreen/homescreen.jsx"
import Home from "./pages/Home/Home.jsx"
import SocialStory from "./pages/SocialStory/SocialStory.jsx"
import Introduction from "./pages/Introduction/Introduction.jsx"
// import { StoryPage } from "./components/SocialStory/StoryPage.jsx"
// import { SocialStory1 } from './components/SocialStory/Story1/SocialStory1'
// import { Questions1 } from "./components/SocialStory/Story1/Question1.jsx"
// import { SocialStory2 } from './components/SocialStory/Story2/SocialStory2'
// import { Questions2 } from "./components/SocialStory/Story2/Question2.jsx"
// import { SocialStory3 } from './components/SocialStory/Story3/SocialStory3'
// import { Questions3 } from "./components/SocialStory/Story3/Question3.jsx"
// import { Phase1 } from './components/pecs/Phase1.jsx'
// import { Phase2 } from "./components/pecs/Phase2.jsx"
// import { Phase3p1 } from "./components/pecs/Phase3p1.jsx"
// import { Phase3p2 } from "./components/pecs/Phase3p2.jsx"
// import { Phase3p3 } from "./components/pecs/Phase3p3.jsx"
// import { Phase4 } from "./components/pecs/Phase4.jsx"
// import { Phase5p1 } from "./components/pecs/Phase5p1.jsx"
// import { Phase5p2 } from "./components/pecs/Phase5p2.jsx"
// import { Phase5p3 } from "./components/pecs/Phase5p3.jsx"
// import { Phase5p4 } from "./components/pecs/Phase5p4.jsx"
// import { Phase6p1 } from "./components/pecs/Phase6p1.jsx"
// import { Phase6p2 } from "./components/pecs/Phase6p2.jsx"
// import { Phase6p3 } from "./components/pecs/Phase6p3.jsx"

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/social-story" element={<SocialStory />} />
      <Route path="/" element={<Navigate to="/introduction"/>} />
      <Route path="/introduction" element={<Introduction/>} />
      {/* <Route path="/" element={<Navigate to="/" />} /> */}
      {/* <Route path="/introduction" element={<Introduction />} /> */}
      {/* <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />


      <Route path="/StoryPage" element={
          <StoryPage />
      } />
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } /> */}

      <Route path="/SocialStory1" element={
          <SocialStory1 />
      } />
      <Route path="/questionsStory1" element={
        <ProtectedRoute>
          <Questions1 />
        </ProtectedRoute>
      } />
      <Route path="/SocialStory2" element={
        <ProtectedRoute>
          <SocialStory2 />
        </ProtectedRoute>
      } />
      <Route path="/questionsStory2" element={
        <ProtectedRoute>
          <Questions2 />
        </ProtectedRoute>
      } />
      <Route path="/SocialStory3" element={
        <ProtectedRoute>
          <SocialStory3 />
        </ProtectedRoute>
      } />
      <Route path="/questionsStory3" element={
        <ProtectedRoute>
          <Questions3 />
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
      <Route path="/phase6p1" element={
        <ProtectedRoute>
          <Phase6p1 />
        </ProtectedRoute>
      } />
      <Route path="/phase6p2" element={
        <ProtectedRoute>
          <Phase6p2 />
        </ProtectedRoute>
      } />
      <Route path="/phase6p3" element={
        <ProtectedRoute>
          <Phase6p3 />
        </ProtectedRoute>
      } /> */}
    </Routes>
  )
}

export default App
