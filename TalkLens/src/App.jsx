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
import SingleUserCall from "./pages/singleUserCall"
import JoinRoom from "./pages/joinRoom"
import Room from "./pages/room"
import EndCall from "./pages/endCall"
import { useSelector } from "react-redux"
import { useState } from "react"

function App() { 
  const { currentUser } = useSelector(state=> state.user);
  const [stream1, setStream1] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [ownerStream, setOwnerStream] = useState(null);

  return (
    <div className="text-red-300">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/landing" element={<LandingPage/>}/>
          <Route path="/" element={currentUser? <CreateJoinMeeting setOwnerId={setOwnerId}/> : <Navigate to="/landing"/>}/>
          <Route path="/features" element={<FeaturesPage/>}/>
          <Route path="/Pricing" element={<PricingPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/logout" element={currentUser?<Logout/> : <Navigate to="/login"/>}/>
          
          <Route path="/login" element={currentUser?<Navigate to="/"/>:<SignIn />}/>
          <Route path="/register" element={currentUser?<Navigate to="/"/>:<SignUp/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>

          <Route path='/join-room/:meetingId' element={<JoinRoom setStream1={setStream1} ownerId={ownerId} setOwnerStream={setOwnerStream}/>}/>
          <Route path="/call" element={<SingleUserCall/>}/>
          <Route path="/room/:meetingId" element={<Room stream1={stream1} ownerStream={ownerStream}/>}/>
          <Route path="/room/end-call" element={<EndCall/>}/>
          
          
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
