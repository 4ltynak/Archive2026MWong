import React, { useState } from 'react';
import stills from '../../assets/photos.json';

export default function StillsWork() {
    // Assuming 'stills' is imported or defined globally like your other arrays
    const [currentIndex, setCurrentIndex] = useState(0);

    const activeStill = stills[currentIndex] || {};
    const nextStill = stills[(currentIndex + 1) % stills.length] || {};

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
            const step = isMobile ? 2 : 1;
            const nextIndex = prevIndex + step;
            
            return nextIndex >= stills.length ? 0 : nextIndex;
        });
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
            const step = isMobile ? 2 : 1;
            const nextIndex = prevIndex - step;
            
            if (nextIndex < 0) {
                return isMobile 
                    ? Math.max(0, stills.length - (stills.length % 2 === 0 ? 2 : 1)) 
                    : stills.length - 1;
            }
            return nextIndex;
        });
    };

    return (
        <section 
            id="stills-work" 
            className="snap-start col-span-12 grid grid-cols-12 md:grid-cols-subgrid overflow-hidden select-none items-center h-screen grid-rows-12 gap-4"
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

            {/* TEXT CONTENT */}
            {/* Mobile: Aligned to Col 2 | Desktop: Resets to Col 3, Row 3 */}
            <div className="col-start-2 col-span-10 row-start-2 lg:col-start-3 lg:col-span-4 lg:row-start-3">
                <h2 className="text-4xl xl:text-left h-10 flex items-center font-instrument-serif">
                   STILLS
                </h2>
            </div>

            {/* GALLERY AREA */}
            {/* Mobile: Aligned to Col 2, spans 2 rows internally | Desktop: Resets to Col 3, Row 4 */}
            <div 
                id="custom-controls-gallery" 
                className="col-start-2 col-span-10 row-start-3 row-span-7 w-full h-full relative grid grid-rows-2 gap-4 lg:col-start-3 lg:col-span-8 lg:row-start-4 lg:row-span-7 lg:block" 
                data-carousel="static"
            >
                {/* DESKTOP VIEW (Single Image + Blurred Background) */}
                <div className="hidden lg:block w-full h-full relative overflow-hidden rounded-lg group cursor-pointer">
                    <div className="duration-700 ease-in-out w-full h-full relative" data-carousel-item="active" key={activeStill.url}>
                        {activeStill.url && (
                            <img 
                                src={activeStill.url} 
                                className="absolute inset-0 w-full h-full object-cover blur-lg opacity-90 scale-110 pointer-events-none" 
                                alt=""
                            />
                        )}
                        {activeStill.url && (
                            <img 
                                src={activeStill.url} 
                                alt={`Still ${currentIndex + 1}`} 
                                className="absolute inset-0 w-full h-full object-contain z-10 transition-transform duration-500 ease-out group-hover:scale-105" 
                            />
                        )}
                    </div>
                </div>

                {/* MOBILE VIEW (2 Clean Stacked Images, No Blur) */}
                {/* Top Stacked Image */}
                <div className="lg:hidden relative w-full h-full overflow-hidden rounded-lg cursor-pointer flex items-center justify-center">
                    {activeStill.url && (
                        <img 
                            src={activeStill.url} 
                            alt={`Still ${currentIndex + 1}`} 
                            className="w-full h-full object-contain" 
                        />
                    )}
                </div>

                {/* Bottom Stacked Image */}
                <div className="lg:hidden relative w-full h-full overflow-hidden rounded-lg cursor-pointer flex items-center justify-center">
                    {nextStill.url && (
                        <img 
                            src={nextStill.url} 
                            alt={`Still ${((currentIndex + 1) % stills.length) + 1}`} 
                            className="w-full h-full object-contain" 
                        />
                    )}
                </div>
            </div>

            {/* COMBINED CONTROLS AND BORDER CONTAINER */}
            {/* Mobile: Aligned to Col 2 | Desktop: Resets to Col 3 */}
            <div className="col-start-2 col-span-10 row-start-11 w-full flex flex-col pt-4 border-t border-color/20 z-10 lg:col-start-3 lg:col-span-8">
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