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
import { useState } from "react"

function App() {
  const [isLogin, setLogin] = useState(false);
  return (
    <div className="text-red-300">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={isLogin? <CreateJoinMeeting/> : <LandingPage/>}/>
          <Route path="/features" element={<FeaturesPage/>}/>
          <Route path="/Pricing" element={<PricingPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          
          <Route path="/login" element={isLogin?<Logout/>:<SignIn/>}/>
          <Route path="/register" element={isLogin?<Logout/>:<SignUp/>}/>
          
          <Route path="/dashboard" element={<Dashboard/>}/>
          
          
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
