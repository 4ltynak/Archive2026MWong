import {useEffect} from 'react'

export default function MobileMenu({ menuOpen, setMenuOpen }) {

    return (
        <div className={`fixed top-0 left-0 w-full bg-[#EFEEEC]/90 z-40 flex flex-col items-center justify-center
        transition-all duration-300 ease-in-out 
        ${menuOpen ? "h-screen opacity-100 pointer-events-auto" : "h-0 opacity-0 pointer-events-none"}`}>
            <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-11 text-zinc-700 text-xl 
            focus:outline-none cursor-pointer"
            aria-label="Close Menu">
                X
            </button>

            <a href="#landscape-work"
                onClick={() => setMenuOpen(false)}
                className={`text-2xl text-zinc-500 my-4 transform transition-transform duration-300
                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 tanslate-y-5"}`}>
                01 / Landscape Work
            </a>
            <a href="#reels-work" 
                onClick={() => setMenuOpen(false)}
                className={`text-2xl text-zinc-500 my-4 transform transition-transform duration-300
                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 tanslate-y-5"}`}>
                02 / Portrait Work
            </a>
            <a href="#stills-work" 
                onClick={() => setMenuOpen(false)}
                className={`text-2xl text-zinc-500 my-4 transform transition-transform duration-300
                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 tanslate-y-5"}`}>
                03 / Stills
            </a>
        </div>
    )
}