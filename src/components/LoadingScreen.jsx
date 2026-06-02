import React, { useState, useEffect } from 'react'

export default function LoadingScreen ({onComplete}) {
    const [text, setText] = useState("")
    const fullText= "Retrieving archive..."
    
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            
            setText(fullText.substring(0, index));
            index++;

            if (index > fullText.length) {
                clearInterval(interval);

                setTimeout(() => {
                    onComplete();
                }, 1000);
            }
        }, 80);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out">
            <div className="mb-4 text-2xl font-instrument-serif">
                {text}
            </div>
            <div className="w-[200px] h-[2px] bg-zinc-300 rounded relative overflow-hidden">
                <div className="w-[40%] h-full bg-zinc-700 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] animate-loading-bar"></div>
            </div>
        </div>
    )
}