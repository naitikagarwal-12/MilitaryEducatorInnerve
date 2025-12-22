import { useState } from "react";
import { GiCrosshair } from "react-icons/gi";

const TacticalReveal = ({ title, text }) => {
  const [locked, setLocked] = useState(false);

  return (
    <div className="flex items-center gap-4">
      {/* CROSSHAIR BUTTON */}
      <div
        className={`backdrop-blur-xl aspect-square p-1 flex justify-center items-center rounded-full
        ring-1 transition-all duration-300
        ${
          locked
            ? "ring-orange-500 shadow-[0_0_20px_rgba(255,94,0,0.6)]"
            : "ring-red-300 hover:ring-white/30 hover:bg-black/10"
        }`}
      >
        <button
          onClick={() => setLocked((prev) => !prev)}
          aria-label={`Lock ${title}`}
        >
          <GiCrosshair
            className={`text-3xl sm:text-4xl xl:text-5xl transition-all duration-300 ease-out
            ${
              locked
                ? "text-orange-400 rotate-90 scale-110"
                : "text-green-400 hover:rotate-90 hover:scale-110"
            }`}
          />
        </button>
      </div>

      {/* CONTENT BOX */}
      <div
        className={`relative w-full rounded-xl border border-white/20 px-6 py-5 ring
        transition-all duration-300 ease-out overflow-hidden
        ${
          locked
            ? "bg-black/50 ring-orange-500 shadow-[0_0_20px_rgba(255,94,0,0.6)]"
            : "bg-black/30 hover:bg-black/35 ring-red-300 hover:ring-white/30"
        }`}
      >
        {locked && (
          <div
            className="absolute inset-0 rounded-xl z-10
            bg-[radial-gradient(circle,_#FFD166_0%,_#FF6A00_35%,_#8B0000_70%)]
            opacity-30 blur-xl animate-pulse"
          />
        )}

        <div className="relative z-1 flex flex-col">
          <h2 className="uppercase tracking-wider text-md sm:text-lg md:text-xl lg:text-lg saira-stencil-one leading-tight">
            {title}
          </h2>

          {locked && (
            <p
              className="text-sm sm:text-md md:text-lg lg:text-md
              saira-extra-condensed text-white/85 mt-2 leading-relaxed
              transition-all duration-500 ease-out opacity-100 translate-y-0"
            >
              {text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TacticalReveal;
