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

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Automatically trigger your onComplete when the window asset lifecycle finishes
  useEffect(() => {
    if (document.readyState === "complete") {
      setIsLoaded(true);
    } else {
      const handleLoad = () => setIsLoaded(true);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      {/* 1. Keep your Loading Screen overlay on top until finished */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {/* 2. Modified Layout Wrapper */}
      <div 
        className={`h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth grid grid-cols-12 auto-rows-[100vh] transition-opacity duration-700
          ${isLoaded ? "opacity-100" : "opacity-0 pointer-events-none max-h-screen overflow-hidden"}`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        
        <LandingPage />
        <LandscapeWork />
        <ReelsWork />
        <StillsWork />
      </div>
    </>
  );
}

export default App;