import {myProjects} from '../../assets/projects.js';
import {useState} from 'react';
import DesktopReels from './blocks/DesktopReels.jsx';

export default function ReelsWork() {
    const reelsProjects = myProjects.filter(project => project.media_type == "reel");
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    
    const activeProject = reelsProjects[hoveredIndex !== null ? hoveredIndex : currentIndex] || {};
    
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

    const getDesktopIndices = () => {
        const len = reelsProjects.length;
        if (len === 0) return [];
        if (len === 1) return [0];
        if (len === 2) return [0, 1];
        
        const prev = currentIndex === 0 ? len - 1 : currentIndex - 1;
        const next = currentIndex === len - 1 ? 0 : currentIndex + 1;
        
        return [prev, currentIndex, next];
    };
        
    return (
<section id="reels-work" 
className="snap-start col-span-12 grid grid-cols-12 md:grid-cols-subgrid overflow-hidden select-none items-center h-screen grid-rows-12 gap-4">
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

{/* First Block: Client & Title */}
{/* Added @container so fluid typography inside can measure this exact element's width */}
<div className="@container col-span-10 col-start-2 row-start-2 lg:col-span-3 lg:col-start-3 lg:row-start-3 lg:grid gap-0.5 text-md text-color/70 font-news-cycle self-start">
    
    {/* 1. Added leading-none here to kill the invisible bottom padding of this text */}
    <p className="font-semibold text-color leading-tight">
        {activeProject.client || ""}
    </p>
    
    {/* 2. Added -mt-1.5 to pull it up on mobile, then lg:mt-0 to undo it when the desktop grid kicks in */}
    <h2 className="text-[clamp(1.5rem,6cqw,2.5rem)] lg:text-3xl xl:text-left min-h-[40px] flex items-center font-instrument-serif leading-none -mt-1.5 lg:mt-0">
        {activeProject.title ? activeProject.title.toUpperCase() : ""}
    </h2>
    
</div>

{/* Second Block: Project Description Snippet */}
{/* Cleaned up duplicate lg:col-span utilities */}
<div className="col-span-10 col-start-2 row-start-3 lg:col-span-4 lg:col-start-7 lg:row-start-3 self-start">
    <p className="-mt-4 lg:mt-0 text-md text-color/70 font-news-cycle text-justify overflow-hidden leading-4 lg:leading-tight">
        {activeProject.snippet || ""}
    </p>
</div>

    {/* GALLERY AREA */}
    <div 
        id="custom-controls-gallery" 
        className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 row-start-4 row-span-7 w-full h-full relative" 
        data-carousel="static"
    >
        {/* DESKTOP: 3 Side-by-Side */}
        <div className="hidden lg:grid grid-cols-3 gap-4 relative w-full h-full overflow-hidden rounded-lg">
            {getDesktopIndices().map((index) => {
                const project = reelsProjects[index];
                if (!project) return null;
                return (
                    <div 
                        key={`desktop-${project.url || index}`}
                        className="w-full h-full duration-500 ease-in-out cursor-pointer grayscale hover:grayscale-0 transition-all"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setCurrentIndex(index)}
                    >
                        <video 
                            key={project.url} // Prevents element recycling glitch on slide transition
                            controls 
                            preload="auto" 
                            className="w-full h-full rounded-sm shadow-lg object-cover object-center bg-black"
                        >
                            <source src={project.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                );
            })}
        </div>

        {/* MOBILE: Preloaded Stream Layout */}
        <div className="lg:hidden relative w-full h-full overflow-hidden rounded-lg">
            {reelsProjects.map((project, index) => {
                const isActive = index === currentIndex;
                return (
                    <div 
                        key={`mobile-${project.url || index}`}
                        className={`duration-700 ease-in-out w-full h-full ${isActive ? "block" : "hidden"}`} 
                        data-carousel-item={isActive ? "active" : ""}
                    >
                        <video 
                            controls 
                            preload="auto" // Forces initial background data stream caching
                            className="w-full h-full rounded-sm shadow-lg object-cover object-center bg-black"
                        >
                            <source src={project.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                );
            })}
        </div>
    </div>

    {/* COMBINED CONTROLS AND BORDER CONTAINER */}
    <div className="-mt-4 lg:-mt-0 col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 row-start-11 w-full flex flex-col pt-4 border-t border-color/20 z-10">
        <div className="flex justify-between items-center w-full -mt-2 lg:-mt-0">
            <button 
                className="text-lg text-color/70 font-news-cycle text-left cursor-pointer hover:underline" 
                onClick={handlePrev}
            >
                &lt; Previous 
            </button>

            <button 
                className="text-lg text-color/70 font-news-cycle text-right cursor-pointer hover:underline" 
                onClick={handleNext}
            >
                Next &gt; 
            </button>
        </div>
    </div>

</section>
    );
}