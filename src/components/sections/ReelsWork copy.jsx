import {myProjects} from '../../assets/projects.js';
import {useState} from 'react';
import DesktopReels from './blocks/DesktopReels.jsx';

export default function ReelsWork() {
    const reelsProjects = myProjects.filter(project => project.media_type == "reel");
    
    const [currentIndex, setCurrentIndex] = useState(0);
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
        
    
        return (
            <DesktopReels reelsProjects={reelsProjects} />
        
    )
}

{/* <section id="reels-work" className="snap-start min-h-screen max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-12 auto-rows-auto gap-4 py-20 items-center">
        
            <div className="grid grid-cols-12 col-span-12 flex flex-col justify-center min-w-0">
                <div className=" col-span-6">
                    <p className="text-md text-color/70 font-news-cycle">
                        <span className="text-sm text-color/50 block">
                            <span className="font-semibold text-color">{activeProject.client}</span>
                        </span>
                    </p>
                    <h2 className="text-3xl text-center md:text-left h-10 flex items-center">
                        {activeProject.title}
                    </h2>
                    
                    <p className="text-md text-color/70 font-news-cycle text-left h-24 overflow-hidden my-4">
                        {activeProject.snippet}
                    </p>
                </div>
                
                <DesktopReels reelsProjects={reelsProjects} />

                </div>
            </div>
        </section> */}