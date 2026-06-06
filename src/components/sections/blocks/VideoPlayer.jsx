import { useState, useRef, useEffect } from "react";

const VideoPlayer = ({ src }) => {
    const videoRef = useRef(null);
    const bgVideoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Sync playback between foreground and background
    const togglePlay = () => {
        if (!videoRef.current) return;
        
        if (videoRef.current.paused) {
            videoRef.current.play();
            if (bgVideoRef.current) bgVideoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            if (bgVideoRef.current) bgVideoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleFullscreen = (e) => {
        e.stopPropagation();
        const el = videoRef.current;
        if (el.requestFullscreen) el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    };

    return (
        <div className="relative w-full h-full cursor-pointer group bg-black overflow-hidden" onClick={togglePlay}>
            {/* Background Blur Layer */}
            <video 
                ref={bgVideoRef} src={src} loop muted playsInline 
                className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-40"
            />
            
            {/* Main Content Layer */}
            <video 
                ref={videoRef} src={src} loop playsInline 
                className="relative z-10 w-full h-full object-contain"
            />

            {/* Controls Overlay */}
            <div className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <div className="bg-black/50 p-4 rounded-full backdrop-blur-sm">
                    {isPlaying ? "Pause" : "Play"} {/* Replace with your SVG icons */}
                </div>
                <button onClick={handleFullscreen} className="absolute bottom-2 right-2 bg-black/50 p-2 text-white">
                    Fullscreen
                </button>
            </div>
        </div>
    );
};

export default VideoPlayer;