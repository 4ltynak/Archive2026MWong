import { useState, useRef } from 'react';
import VideoCard from './VideoCard.jsx';

export default function DesktopReels({ reelsProjects }) {
    // Keep your exact working state logic
    const [currentIndex, setCurrentIndex] = useState(0);
    const activeProjectRef = useRef(null);

    const activeProject = reelsProjects[currentIndex] || reelsProjects[0];
    const itemsVisible = 3;
    
    const handleNext = () => {
        if (currentIndex < reelsProjects.length - itemsVisible) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <section id="reels-work" className="snap-start min-h-screen max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-12 gap-4 py-20 items-center">
        
                {/* Text Section: Swapped to match your Landscape layout precisely */}
                <p className="text-md text-color/70 font-news-cycle col-span-12">
                    <span className="text-sm text-color/50 block">
                        <span className="font-semibold text-color">{activeProject?.client}</span>
                    </span>
                </p>
                
                <h2 className="col-span-12 text-3xl text-center xl:text-left h-10 flex items-center">
                    {activeProject?.title}
                </h2>
                
                <p className="col-span-12 md:col-span-6 text-md text-color/70 font-news-cycle text-justify overflow-hidden py-4">
                    {activeProject?.snippet}
                </p>
                
                {/* Carousel Section: Left completely untouched */}
                <div className="col-span-12 relative mt-4">
                    
                    {/* Viewable Window (hides overflow) */}
                    <div className="overflow-hidden w-full">
                        
                        {/* The Sliding Track */}
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)` }}
                        >
                            {reelsProjects.map((project, index) => (
                                <div key={index} className="w-1/3 flex-shrink-0 px-2">
                                    <VideoCard project={project} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button 
                            onClick={handlePrev} 
                            disabled={currentIndex === 0}
                            className="p-2 border rounded-full disabled:opacity-30 hover:bg-gray-100 transition-colors"
                        >
                            &#10094; Prev
                        </button>
                        <button 
                            onClick={handleNext} 
                            disabled={currentIndex >= reelsProjects.length - itemsVisible}
                            className="p-2 border rounded-full disabled:opacity-30 hover:bg-gray-100 transition-colors"
                        >
                            Next &#10095;
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}