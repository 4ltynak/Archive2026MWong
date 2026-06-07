import {myProjects} from '../../assets/projects.js';
import { useState, useRef, useEffect, useMemo } from "react";
import DesktopReels from './blocks/DesktopReels.jsx';

// Individual Reel Card Component

// Individual Reel Card Component
function ReelCard({ project, onHover }) {
    if (!project || !project.url) return null;

    return (
        <div 
            className="relative w-full lg:w-[32%] h-[60vh] lg:h-full overflow-hidden rounded-lg group"
            onMouseEnter={onHover} 
        >
            {/* 1. BACKGROUND BLUR LAYER (No autoplay, no loop, no refs—frozen on first frame) */}
            <video 
                muted 
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover blur-md opacity-40 scale-110 pointer-events-none"
            >
                <source src={project.url} type="video/mp4" />
            </video>

            {/* 2. FOREGROUND LAYER (Plays independently) */}
            <video 
                controls 
                className="absolute inset-0 w-full h-full object-contain z-10 rounded-sm shadow-lg transition-transform duration-500 ease-out group-hover:scale-102 bg-transparent"
            >
                <source src={project.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default function ReelsWork({ isLoading = false }) {
    // Assuming myProjects is imported or available in scope
    const reelsProjects = myProjects ? myProjects.filter(project => project.media_type === "reel") : [];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTextProject, setActiveTextProject] = useState({});

    useEffect(() => {
        if (reelsProjects.length > 0) {
            setActiveTextProject(reelsProjects[currentIndex]);
        }
    }, [currentIndex, reelsProjects.length]);

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

    const getVisibleReels = () => {
        if (reelsProjects.length === 0) return [];
        const items = [];
        for (let i = 0; i < 3; i++) {
            const targetIndex = (currentIndex + i) % reelsProjects.length;
            if (i > 0 && targetIndex === currentIndex) break;
            items.push(reelsProjects[targetIndex]);
        }
        return items;
    };

    const visibleDesktopReels = getVisibleReels();

    return (
        <section 
            id="reels-work" 
            className="lg:snap-start col-span-12 grid grid-cols-12 md:grid-cols-subgrid overflow-hidden select-none items-center h-auto lg:h-screen grid-rows-12 gap-4"
        >
            {/* DESKTOP NAVIGATION */}
            <div className="hidden lg:flex col-span-8 col-start-3 row-start-2 justify-between self-start">
                <a href="#landscape-work" className="hover:underline">
                    <h3 className="text-lg text-color/70 font-news-cycle">01 / Landscape</h3>
                </a>
                <a href="#reels-work" className="hover:underline">
                    <h3 className="text-lg text-color/70 font-news-cycle">02 / Reels</h3>
                </a>
                <a href="#stills-work" className="hover:underline">
                    <h3 className="text-lg text-color/70 font-news-cycle">03 / Stills</h3>
                </a>
            </div>

            {/* DYNAMIC TEXT CONTENT */}
            <div className="@container col-span-10 col-start-2 row-start-2 lg:col-span-3 lg:col-start-3 lg:row-start-3 lg:grid gap-0.5 text-md text-color/70 font-news-cycle self-start">
                {isLoading ? (
                    <>
                        <div className="h-4 w-24 bg-color/10 animate-pulse rounded mb-2"></div>
                        <div className="h-8 w-48 bg-color/10 animate-pulse rounded"></div>
                    </>
                ) : (
                    <>
                        <p className="font-semibold text-color leading-tight">
                            {activeTextProject.client || ""}
                        </p>
                        <h2 className="text-[clamp(1.8rem,8cqw,2.5rem)] lg:text-3xl xl:text-left min-h-[40px] flex items-center font-instrument-serif leading-none -mt-1.5 lg:mt-0">
                            {activeTextProject.title ? activeTextProject.title.toUpperCase() : ""}
                        </h2>
                    </>
                )}
            </div>

            <div className="col-span-10 col-start-2 row-start-3 lg:col-span-4 lg:col-start-7 lg:row-start-3 self-start">
                {isLoading ? (
                    <div className="space-y-2 w-full mt-2">
                        <div className="h-3 w-full bg-color/10 animate-pulse rounded"></div>
                        <div className="h-3 w-5/6 bg-color/10 animate-pulse rounded"></div>
                    </div>
                ) : (
                    <p className="-mt-4 lg:mt-0 text-md text-color/70 font-news-cycle text-justify overflow-hidden leading-4 lg:leading-tight">
                        {activeTextProject.snippet || ""}
                    </p>
                )}
            </div>

            {/* GALLERY / SKELETON AREA */}
            <div 
                id="custom-controls-gallery" 
                className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 row-start-4 row-span-7 w-full h-full relative"
            >
                {isLoading ? (
                    <>
                        {/* Mobile Skeletons */}
                        <div className="lg:hidden flex flex-col gap-6 w-full mt-4 pb-12">
                            {[1, 2, 3].map((n) => (
                                <div key={`mob-skel-${n}`} className="w-full h-[60vh] bg-color/10 animate-pulse rounded-lg"></div>
                            ))}
                        </div>
                        {/* Desktop Skeletons */}
                        <div className="hidden lg:flex justify-between items-center w-full h-full">
                            {[1, 2, 3].map((n) => (
                                <div key={`desk-skel-${n}`} className="w-[32%] h-full bg-color/10 animate-pulse rounded-lg"></div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        {/* MOBILE VIEW */}
                        <div className="lg:hidden flex flex-col gap-6 w-full mt-4 pb-12">
                            {reelsProjects.map((project, index) => (
                                <ReelCard key={`mobile-${index}`} project={project} />
                            ))}
                        </div>

                        {/* DESKTOP VIEW */}
                        <div className="hidden lg:flex justify-between items-center w-full h-full">
                            {visibleDesktopReels.map((project, index) => (
                                <ReelCard 
                                    key={`desktop-${project.id || index}`} 
                                    project={project} 
                                    onHover={() => setActiveTextProject(project)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* CONTROLS (Desktop Only) */}
            <div className="hidden lg:flex col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 row-start-11 w-full flex-col pt-4 border-t border-color/20 z-10">
                <div className="flex justify-between items-center w-full">
                    <button 
                        disabled={isLoading}
                        className="text-lg text-color/70 font-news-cycle text-left cursor-pointer hover:underline disabled:opacity-30 disabled:no-underline" 
                        onClick={handlePrev}
                    >
                        &lt; Previous 
                    </button>
                    <button 
                        disabled={isLoading}
                        className="text-lg text-color/70 font-news-cycle text-right cursor-pointer hover:underline disabled:opacity-30 disabled:no-underline" 
                        onClick={handleNext}
                    >
                        Next &gt; 
                    </button>
                </div>
            </div>
        </section>
    );
}