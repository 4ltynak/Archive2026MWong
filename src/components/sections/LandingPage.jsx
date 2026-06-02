export default function LandingPage () {
    return (
      <div id="landing" className="snap-start flex flex-col col-span-10 col-start-2 lg:col-span-12 lg:grid lg:grid-cols-subgrid h-full p-12 overflow-hidden select-none">
  
      <div className="col-span-12 flex flex-col justify-between items-center h-full">
        
        <div className="h-12" />
        
        <div className="flex flex-col gap-3 items-center">
          <p className="font-news-cycle text-xl lg:text-2xl italic tracking-wide text-color/50">Welcome to</p>
          <h1 className="text-4xl md:text-7xl font-instrument-serif italic text-center leading-none">
            <span>Archive // 2026</span>
          </h1>
          <p className="font-news-cycle text-sm lg:text-lg tracking-wide text-color/70 max-w-xl text-center">
            by <span className="underline decoration-zinc-500/30">MW</span>
          </p>
        </div>
        
        <div className="flex flex-col items-center relative bottom-10 lg:bottom-0">
          <p className="font-news-cycle text-xl italic tracking-wide text-color/50 animate-pulse">Scroll to View</p>
        </div>

      </div>

</div>
    )
}