import {myProjects} from '../../assets/projects.js';
import { useState, useRef, useEffect } from 'react';
import DesktopReels from './blocks/DesktopReels.jsx';

export default function ReelsWork() {
    const reelsProjects = myProjects.filter(project => project.media_type == "reel");
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // We need refs to control the videos manually
    const mainVideoRef = useRef(null);
    const bgVideoRef = useRef(null);

    const activeProject = reelsProjects[currentIndex] || {};

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === reelsProjects.length - 1 ? 0 : prevIndex + 1
        );
    };
    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? reelsProjects.length - 1 : prevIndex - 1
        );
    };

    // SYNC LOGIC
    const syncPlay = () => bgVideoRef.current?.play();
    const syncPause = () => bgVideoRef.current?.pause();
    const syncSeeking = () => {
        if (bgVideoRef.current && mainVideoRef.current) {
            bgVideoRef.current.currentTime = mainVideoRef.current.currentTime;
        }
    };

    return (
        <section id="reels-work" className="lg:snap-start col-span-12 grid grid-cols-12 md:grid-cols-subgrid overflow-hidden select-none items-center h-screen grid-rows-12 gap-4">
            
                        {/* NAVIGATION */}
            <div className="hidden lg:flex col-span-8 col-start-3 row-start-2 justify-between self-start">
                <a href="#landscape-work" className="hover:underline"><h3 className="text-lg text-color/70 font-news-cycle">01 / Landscape</h3></a>
                <a href="#reels-work" className="hover:underline"><h3 className="text-lg text-color/70 font-news-cycle">02 / Reels</h3></a>
                <a href="#stills-work" className="hover:underline"><h3 className="text-lg text-color/70 font-news-cycle">03 / Stills</h3></a>
            </div>

            {/* TEXT CONTENT */}
            <div className="@container col-span-10 col-start-2 row-start-2 lg:col-span-3 lg:col-start-3 lg:row-start-3 lg:grid gap-0.5 text-md text-color/70 font-news-cycle self-start">
                <p className="font-semibold text-color leading-tight">{activeProject.client || ""}</p>
                <h2 className="text-[clamp(1.8rem,8cqw,2.5rem)] lg:text-3xl xl:text-left min-h-[40px] flex items-center font-instrument-serif leading-none -mt-1.5 lg:mt-0">
                    {activeProject.title ? activeProject.title.toUpperCase() : ""}
                </h2>
            </div>
            
            <div className="col-span-10 col-start-2 row-start-3 lg:col-span-4 lg:col-start-7 lg:row-start-3 self-start">
                <p className="-mt-4 lg:mt-0 text-md text-color/70 font-news-cycle text-justify overflow-hidden leading-4 lg:leading-tight">
                    {activeProject.snippet || ""}
                </p>
            </div>

            {/* GALLERY AREA */}
            <div id="custom-controls-gallery" className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 row-start-4 row-span-7 w-full h-full relative" data-carousel="static">
                <div className="relative w-full h-full overflow-hidden rounded-lg group">
                    <div className="duration-700 ease-in-out w-full h-full relative" data-carousel-item="active" key={activeProject.url}>
                        
                        {/* 1. Background Blur Layer */}
                        <video 
                            ref={bgVideoRef}
                            muted 
                            loop 
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover blur-md opacity-40 scale-110 pointer-events-none"
                        >
                            <source src={activeProject.url} type="video/mp4" />
                        </video>

                        {/* 2. Foreground Layer - now with onSeeking */}
                        <video 
                            ref={mainVideoRef}
                            controls 
                            onPlay={syncPlay}
                            onPause={syncPause}
                            onSeeking={syncSeeking}
                            className="absolute inset-0 w-full h-full object-contain z-10 rounded-sm shadow-lg transition-transform duration-500 ease-out group-hover:scale-102 bg-transparent"
                        >
                            <source src={activeProject.url} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>

                        <div className="-mt-4 lg:-mt-0 col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 row-start-11 w-full flex flex-col pt-4 border-t border-color/20 z-10">
                <div className="flex justify-between items-center w-full -mt-2 lg:-mt-0">
                    <button className="text-lg text-color/70 font-news-cycle text-left cursor-pointer hover:underline" onClick={handlePrev}>&lt; Previous</button>
                    <button className="text-lg text-color/70 font-news-cycle text-right cursor-pointer hover:underline" onClick={handleNext}>Next &gt;</button>
                </div>
            </div>
        </section>
    );
}