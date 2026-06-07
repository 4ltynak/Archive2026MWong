import {useState} from 'react';
import {myProjects} from '../../assets/projects.js';

export default function LandscapeWork({ isLoading = false }) {
    // Safely filter projects, providing a fallback empty array if data is still loading
    const landscapeProjects = myProjects ? myProjects.filter(project => project.media_type === "video") : [];

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
        <section 
            id="landscape-work" 
            className="lg:snap-start col-span-12 grid grid-cols-12 md:grid-cols-subgrid overflow-hidden select-none items-center h-screen grid-rows-12 gap-4"
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

            {/* TEXT CONTENT (Client & Title) */}
            <div className="@container col-span-10 col-start-2 row-start-2 lg:col-span-3 lg:col-start-3 lg:row-start-3 lg:grid gap-0.5 text-md text-color/70 font-news-cycle self-start">
                {isLoading ? (
                    <>
                        <div className="h-4 w-24 bg-color/10 animate-pulse rounded mb-2"></div>
                        <div className="h-8 w-48 bg-color/10 animate-pulse rounded"></div>
                    </>
                ) : (
                    <>
                        <p className="font-semibold text-color leading-tight">
                            {activeProject.client || ""}
                        </p>
                        <h2 className="text-[clamp(1.8rem,8cqw,2.5rem)] lg:text-3xl xl:text-left min-h-[40px] flex items-center font-instrument-serif leading-none -mt-1.5 lg:mt-0">
                            {activeProject.title ? activeProject.title.toUpperCase() : ""}
                        </h2>
                    </>
                )}
            </div>
            
            {/* TEXT CONTENT (Snippet) */}
            <div className="col-span-10 col-start-2 row-start-3 lg:col-span-4 lg:col-start-7 lg:row-start-3 self-start">
                {isLoading ? (
                    <div className="space-y-2 w-full -mt-2 lg:mt-0">
                        <div className="h-3 w-full bg-color/10 animate-pulse rounded"></div>
                        <div className="h-3 w-full bg-color/10 animate-pulse rounded"></div>
                        <div className="h-3 w-4/5 bg-color/10 animate-pulse rounded"></div>
                    </div>
                ) : (
                    <p className="-mt-4 lg:mt-0 text-md text-color/70 font-news-cycle text-justify overflow-hidden leading-4 lg:leading-tight">
                        {activeProject.snippet || ""}
                    </p>
                )}
            </div>

            {/* GALLERY AREA */}
            <div 
                id="custom-controls-gallery" 
                className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 row-start-4 row-span-7 w-full h-full relative" 
                data-carousel="static"
            >
                {isLoading ? (
                    /* SKELETON STATE */
                    <div className="w-full h-full min-h-[50vh] bg-color/10 animate-pulse rounded-lg"></div>
                ) : (
                    /* CONTENT STATE */
                    <div className="relative w-full h-full overflow-hidden rounded-lg group">
                        <div className="duration-700 ease-in-out w-full h-full relative" data-carousel-item="active" key={activeProject.url}>
                            
                            {/* 1. BACKGROUND LAYER: Blurred & Muted Video (Fills Letterboxes) */}
                            <video 
                                muted 
                                loop 
                                playsInline
                                autoPlay
                                className="absolute inset-0 w-full h-full object-cover blur-md opacity-40 scale-110 pointer-events-none"
                            >
                                <source src={activeProject.url} type="video/mp4" />
                            </video>

                            {/* 2. FOREGROUND LAYER: Sharp Video with Controls & Aspect Restored */}
                            <video 
                                controls 
                                className="absolute inset-0 w-full h-full object-contain z-10 rounded-sm shadow-lg transition-transform duration-500 ease-out group-hover:scale-102 bg-transparent"
                            >
                                <source src={activeProject.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                        </div>
                    </div>
                )}
            </div>

            {/* COMBINED CONTROLS AND BORDER CONTAINER */}
            <div className="-mt-4 lg:-mt-0 col-start-2 col-span-10 lg:col-start-3 lg:col-span-8 row-start-11 w-full flex flex-col pt-4 border-t border-color/20 z-10">
                <div className="flex justify-between items-center w-full -mt-2 lg:-mt-0">
                    
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