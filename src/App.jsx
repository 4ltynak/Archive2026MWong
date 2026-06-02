import LoadingScreen from './components/LoadingScreen.jsx'
import './index.css'
import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import LandingPage from './components/sections/LandingPage.jsx';
import MobileMenu from './components/MobileMenu.jsx';
import LandscapeWork from './components/sections/LandscapeWork.jsx';
import ReelsWork from './components/sections/ReelsWork.jsx';
import StillsWork from './components/sections/StillsWork.jsx';
import Footer from './components/Footer.jsx';

function App () {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}{" "}
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth grid grid-cols-12 auto-rows-[100vh]">
    <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <LandingPage />
    <LandscapeWork />
    <ReelsWork />
    <StillsWork />
    </div>
    </>
    
  )
}

export default App;