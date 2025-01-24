import {BrowserRouter, Routes, Route} from "react-router-dom"

import LandingPage from "./pages/landingPage"
import Header from "./pages/header"
import Dashboard from "./pages/dashboard"
import Logout from "./components/logout"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import MeetingRoom from "./pages/MeetingRoom"
import CreateJoinMeeting from "./pages/CreateJoinMeeting"
import FeaturesPage from "./pages/feature"
import PricingPage from "./pages/PricingPage"
import ContactPage from "./pages/ContactPage"

import { useSelector } from "react-redux"
import { useState } from "react"

function App() { 
  const { currentUser } = useSelector(state=> state.user);

  return (
    <div className="text-red-300">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={currentUser? <CreateJoinMeeting/> : <LandingPage/>}/>
          <Route path="/features" element={<FeaturesPage/>}/>
          <Route path="/Pricing" element={<PricingPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          
          <Route path="/login" element={currentUser?<Logout/>:<SignIn />}/>
          <Route path="/register" element={currentUser?<Logout/>:<SignUp/>}/>
          
          <Route path="/dashboard" element={<Dashboard/>}/>
          
          
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
