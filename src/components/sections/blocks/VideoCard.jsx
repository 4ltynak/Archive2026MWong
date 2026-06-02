import React, { useRef } from 'react';

export default function VideoCard({ imgSrc, project }) {
    const videoRef = useRef(null);
    // Keep track of the play promise to prevent race-condition errors on fast hovering
    const playPromiseRef = useRef(null); 

    const handleMouseEnter = () => {
        if (videoRef.current) {
            // Unmute just in case, though muted attribute on HTML is safer for autoplay
            videoRef.current.muted = true; 
            
            // Store the promise returned by .play()
            playPromiseRef.current = videoRef.current.play();
            
            playPromiseRef.current.catch((error) => { 
                console.log("Playback failed:", error); 
            });
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            // If the video is still trying to start, wait until it finishes loading, then pause it
            if (playPromiseRef.current !== null) {
                playPromiseRef.current
                    .then(() => {
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                    })
                    .catch(() => {
                        // Handle or ignore errors from interrupted plays
                    });
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    };

    return (
        <div 
            className="relative group aspect-[9/16] rounded-lg overflow-hidden shadow-lg cursor-pointer bg-black" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            {/* Thumbnail: Goes completely invisible on hover so video shines through */}
            <img 
                src={imgSrc} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-10 group-hover:opacity-0"
            />
            
            {/* Video: Opacity transitions smoothly */}
            <video 
                ref={videoRef}
                src={project.url} 
                muted 
                playsInline 
                loop 
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
            />
            
            {/* Title Overlay: Kept at z-20 so it stays above BOTH image and video */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 text-white font-medium">
                <p className="text-sm font-semibold truncate">{project.title}</p>
            </div>
        </div>
    );
}