import {useEffect} from 'react'
export default function Navbar({ menuOpen, setMenuOpen }) {
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);

    return (
        <nav className="fixed top-0 w-full z-40 backdrop-blur-lg border-b border-white/10 grid grid-cols-12 h-16 px-2">
            <div className="col-span-10 col-start-2 lg:col-start-3 py-4 lg:col-span-8">
                <div className="flex justify-between items-center">

                
                    <a className="font-instrument-serif text-3xl" href="#home">MW</a>
                <div className="col-start-10 py-4 col-span-1 cursor-pointer z-40 lg:hidden " onClick={() => setMenuOpen(prev => !prev)}>
                    &#9776;
                </div>
                </div>
            </div>
        </nav>
    )
}