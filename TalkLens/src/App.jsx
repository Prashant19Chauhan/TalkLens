import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import LandingPage from "./pages/landingPage"
import Header from "./pages/header"
import Dashboard from "./pages/dashboard"
import Logout from "./components/logout"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import CreateJoinMeeting from "./pages/CreateJoinMeeting"
import FeaturesPage from "./pages/feature"
import PricingPage from "./pages/PricingPage"
import ContactPage from "./pages/ContactPage"
import JoiningRoom from "./pages/joiningRoom"
import { useSelector } from "react-redux"
import MeetingRoom from "./pages/MeetingRoom"
import { useState } from "react"
import SingleUserCall from './pages/singleUserCall'

function App() { 
  const [myStream, setMyStream1] = useState(null);
  const { currentUser } = useSelector(state=> state.user);

  return (
    <div className="text-red-300">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/landing" element={<LandingPage/>}/>
          <Route path="/" element={currentUser? <CreateJoinMeeting/> : <Navigate to="/landing"/>}/>
          <Route path="/features" element={<FeaturesPage/>}/>
          <Route path="/Pricing" element={<PricingPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/logout" element={currentUser?<Logout/> : <Navigate to="/login"/>}/>
          
          <Route path="/login" element={currentUser?<Navigate to="/"/>:<SignIn />}/>
          <Route path="/register" element={currentUser?<Navigate to="/"/>:<SignUp/>}/>
          <Route path="/joinroom/:meetingId" element={<JoiningRoom setMyStream1={setMyStream1}/>}/>
          <Route path="/room/:meetingId" element={<MeetingRoom myStream={myStream}/>}/>
          <Route path="/single" element={<SingleUserCall/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          
          
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
