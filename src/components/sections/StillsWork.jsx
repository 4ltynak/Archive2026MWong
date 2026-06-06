import React, { useState, useEffect, useRef } from 'react';
import stills from '../../assets/photos.json';
export default function StillsWork() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef(null);

    // --- State Handlers ---
    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === stills.length - 1 ? 0 : prevIndex + 1
        );
    };
    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? stills.length - 1 : prevIndex - 1
        );
    };

    // --- Scroll Snap Toggle Logic ---
    useEffect(() => {
        const container = document.querySelector('.slider-container');
        const section = sectionRef.current;

        if (!container || !section) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const sectionTop = section.offsetTop;
            const relativeScroll = scrollTop - sectionTop;

            // Enable snap only when at the top (within 50px buffer)
            if (relativeScroll > 50) {
                section.style.scrollSnapAlign = 'none';
            } else {
                section.style.scrollSnapAlign = 'start';
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section 
            id="stills-work" 
            ref={sectionRef}
            className="lg:snap-start col-span-12 grid grid-cols-12 md:grid-cols-subgrid gap-4 h-auto lg:h-screen"
        >
            {/* NAVIGATION */}
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

            {/* TITLE */}
            <div className="col-span-10 col-start-2 lg:col-span-3 lg:col-start-3 lg:row-start-3 self-start lg:mt-0 mt-20">
                <h2 className="text-[clamp(1.8rem,8cqw,2.5rem)] lg:text-3xl font-instrument-serif leading-none text-color">
                    STILLS
                </h2>
            </div>

            {/* MOBILE STACK */}
            <div className="lg:hidden col-span-10 col-start-2 mt-4 space-y-4 pb-20">
                {stills.map((still, index) => (
                    <img 
                        key={`mobile-${index}`}
                        src={still.url} 
                        alt={`Still ${index + 1}`} 
                        className="w-full h-auto rounded-lg" 
                        loading="lazy"
                    />
                ))}
            </div>

            {/* DESKTOP CAROUSEL */}
            <div className="hidden lg:block col-start-3 col-span-8 row-start-4 row-span-7 w-full h-full relative" data-carousel="static">
                <div className="relative w-full h-full overflow-hidden rounded-lg group cursor-pointer">
                    {stills.map((still, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <div 
                                key={`desktop-${index}`}
                                className={`duration-700 ease-in-out w-full h-full relative ${isActive ? "block" : "hidden"}`} 
                            >
                                <img src={still.url} className="absolute inset-0 w-full h-full object-cover blur-md opacity-40 scale-110 pointer-events-none" alt="" />
                                <img src={still.url} alt={`Still ${index + 1}`} className="absolute inset-0 w-full h-full object-contain z-10 transition-transform duration-500 ease-out group-hover:scale-102" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* CONTROLS (Desktop Only) */}
            <div className="hidden lg:flex col-start-3 col-span-8 row-start-11 w-full pt-4 border-t border-color/20 z-10">
                <div className="flex justify-between items-center w-full">
                    <button className="text-lg text-color/70 font-news-cycle hover:underline" onClick={handlePrev}>&lt; Previous</button>
                    <button className="text-lg text-color/70 font-news-cycle hover:underline" onClick={handleNext}>Next &gt;</button>
                </div>
            </div>

            {/* BACK TO TOP */}
            <div className="col-span-10 col-start-2 lg:col-start-3 lg:col-span-8 row-start-3 lg:row-start-12 w-full flex justify-center items-center z-10 pb-8">
                <a href="#landing" className="text-md text-color/70 font-news-cycle uppercase tracking-wider hover:underline">
                    ↑ Back to top
                </a>
            </div>
        </section>
    );
}
