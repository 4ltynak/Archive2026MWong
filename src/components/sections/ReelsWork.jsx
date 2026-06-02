import {myProjects} from '../../assets/projects.js';
import {useState} from 'react';
import DesktopReels from './blocks/DesktopReels.jsx';

export default function ReelsWork() {
    const reelsProjects = myProjects.filter(project => project.media_type == "reel");
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [playingIndex, setPlayingIndex] = useState(null);

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
        <section id="reels-work" className="snap-start col-span-12 grid grid-cols-12 md:grid-cols-subgrid overflow-hidden select-none items-center h-screen grid-rows-12 gap-4">
            
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

            {/* TEXT CONTENT - LEFT SIDE */}
            <div className="mt-8 lg:mt-0 col-start-2 row-start-2 col-span-10 grid gap-2 lg:gap-4 lg:col-span-3 lg:col-start-3 lg:row-start-3 text-md text-color/70 font-news-cycle leading-0">
                <p className="font-semibold text-color ">{activeProject.client || ""}</p>
                <h2 className="text-3xl lg:text-4xl lg:text-left h-10 flex items-center font-instrument-serif">
                    {activeProject.title ? activeProject.title.toUpperCase() : ""}
                </h2>
            </div>

            {/* TEXT CONTENT - RIGHT SIDE */}
            <div className="col-span-10 col-start-2 row-start-3 lg:col-span-4 lg:col-start-7 lg:row-start-3 h-full">
                <p className="lg:text-lg text-color/70 font-news-cycle text-justify overflow-hidden leading-tight text-md lg:leading-snug line-clamp-3">
                    {activeProject.snippet || ""}
                </p>
            </div>

            {/* GALLERY AREA */}
            {/* LAYOUT FIX: Removed the subgrid classes here so the desktop 3-column layout can expand horizontally */}
            <div 
                id="custom-controls-gallery" 
                className="col-span-10 col-start-2 row-start-4 row-span-7 lg:col-start-3 lg:col-span-8 lg:row-start-4 lg:row-span-7 w-full h-full relative" 
                data-carousel="static"
            >
                
                {/* DESKTOP GALLERY */}
                <div className="hidden lg:grid grid-cols-3 gap-4 relative w-full h-full overflow-hidden rounded-lg">
                    {getDesktopIndices().map((index) => {
                        const project = reelsProjects[index];
                        if (!project) return null;
                        const isPlaying = playingIndex === index;

                        return (
                            <div 
                                key={`desktop-${index}`}
                                className={`relative overflow-hidden w-full h-full duration-500 ease-in-out cursor-pointer transition-all ${
                                    isPlaying ? 'grayscale-0' : 'grayscale hover:grayscale-0'
                                }`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => setCurrentIndex(index)}
                            >
                                <video 
                                    controls 
                                    playsInline 
                                    preload="auto" 
                                    src={project.url} // Fixed: Kept direct src mapping for reactive video switches
                                    poster={project.thumbnail || project.poster || ""}
                                    className="absolute inset-0 w-full h-full rounded-sm shadow-lg object-cover object-center bg-black"
                                    onPlay={() => setPlayingIndex(index)}
                                    onPause={() => setPlayingIndex(null)}
                                    onEnded={() => setPlayingIndex(null)}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        );
                    })}
                </div>

                {/* MOBILE GALLERY */}
                <div className="lg:hidden w-full h-full flex items-center justify-center rounded-lg overflow-hidden bg-black">
                    {reelsProjects[currentIndex] && (
                        <video 
                            controls 
                            playsInline
                            preload="auto"
                            src={reelsProjects[currentIndex].url} // Fixed: Kept direct src mapping for reactive video switches
                            poster={reelsProjects[currentIndex].thumbnail || reelsProjects[currentIndex].poster || ""}
                            className={`w-full h-full object-cover rounded-sm shadow-lg transition-all duration-700 ease-in-out ${
                                playingIndex === currentIndex ? 'grayscale-0' : 'grayscale'
                            }`}
                            onPlay={() => setPlayingIndex(currentIndex)}
                            onPause={() => setPlayingIndex(null)}
                            onEnded={() => setPlayingIndex(null)}
                            key={reelsProjects[currentIndex].url}
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