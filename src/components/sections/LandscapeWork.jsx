import {useState} from 'react';
import {myProjects} from '../../assets/projects.js';

export default function LandscapeWork() {
    const landscapeProjects = myProjects.filter(project => project.media_type == "video");

    const [currentIndex, setCurrentIndex] = useState(0);
    const activeProject = landscapeProjects[currentIndex] || {};

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === landscapeProjects.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? landscapeProjects.length - 1 : prevIndex - 1
        );
    };
    
    return (
        <section id="landscape-work" className="snap-start col-span-12 grid grid-cols-12 md:grid-cols-subgrid overflow-hidden select-none items-center h-screen grid-rows-12 gap-4">
            
            {/* TOP NAVIGATION */}
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

            {/* TEXT CONTENT WRAPPER */}
            <div className="col-start-2 col-span-10 row-start-2 row-span-3 flex flex-col gap-2 lg:contents">
                
                {/* TEXT CONTENT - LEFT SIDE */}
                <div className="mt-8 lg:mt-0 grid gap-2 lg:gap-4 lg:col-span-3 lg:col-start-3 lg:row-start-3 text-md text-color/70 font-news-cycle leading-0">
                    <p className="font-semibold text-color ">{activeProject.client || ""}</p>
                    <h2 className="text-3xl lg:text-4xl lg:text-left min-h-[2.5rem] flex items-center font-instrument-serif">
                        {activeProject.title ? activeProject.title.toUpperCase() : ""}
                    </h2>
                </div>

                {/* TEXT CONTENT - RIGHT SIDE */}
                <div className="lg:col-span-4 lg:col-start-7 lg:row-start-3 h-auto lg:h-full">
                    <p className="lg:text-lg text-color/70 font-news-cycle text-justify lg:overflow-hidden leading-tight text-md lg:leading-snug ">
                        {activeProject.snippet || ""}
                    </p>
                </div>

            </div>

            {/* GALLERY AREA */}
            <div 
                id="custom-controls-gallery" 
                className="col-span-10 col-start-2 row-start-5 row-span-6 lg:col-start-3 lg:col-span-8 lg:row-start-4 lg:row-span-7 w-full h-full relative" 
                data-carousel="static"
            >
                <div className="relative w-full h-full overflow-hidden rounded-lg bg-black flex items-center justify-center" key={activeProject.url}>
                    
                    {/* FIXED BLURRED BACKDROP (Now active on BOTH Mobile and Desktop!) */}
                    {/* It safely reads your new 'thumbnail' or fallback 'poster' key */}
                    {(activeProject.thumbnail || activeProject.poster) && (
                        <img 
                            src={activeProject.thumbnail || activeProject.poster} 
                            className="absolute inset-0 w-full h-full object-cover blur-lg opacity-90 scale-110 pointer-events-none" 
                            alt=""
                        />
                    )}

                    {/* FOREGROUND LAYER: The exact widescreen landscape video player */}
                    {activeProject.url && (
                        <video 
                            controls 
                            playsInline 
                            preload="auto" 
                            src={activeProject.url}
                            // Also feeds your thumbnail as the default non-playing video frame
                            poster={activeProject.thumbnail || activeProject.poster || ""}
                            className="z-10 w-full h-full object-contain rounded-sm shadow-lg"
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}

                </div>
            </div>

            {/* COMBINED CONTROLS AND BORDER CONTAINER */}
            <div className="col-start-2 col-span-10 row-start-11 lg:col-start-3 lg:col-span-8 lg:row-start-11 w-full flex flex-col pt-4 border-t border-color/20 z-10">
                <div className="flex justify-between items-center w-full">
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