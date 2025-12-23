import React, { useState, useRef, useEffect } from "react";
import { SERVICES } from "../config/rankServices";

function RankPage({ service }) {
  const config = SERVICES?.[service];
  if (!config) return null;

  const { title, ranks, theme } = config;

  if (!ranks || ranks.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-xl font-semibold"
        style={{ background: theme.background }}
      >
        Data coming soon.
      </div>
    );
  }

  const [activeIndex, setActiveIndex] = useState(
    Math.min(2, ranks.length - 1)
  );

  const wheelRef = useRef(null);

  const ITEM_HEIGHT = 40;
  const CENTER_OFFSET = 2;

  /* ================= WHEEL HANDLER ================= */
  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // ⛔ HARD CLAMP (prevents white page bounce)
    if (e.deltaY < 0 && activeIndex === 0) return;
    if (e.deltaY > 0 && activeIndex === ranks.length - 1) return;

    setActiveIndex((prev) => {
      if (e.deltaY > 0) return Math.min(prev + 1, ranks.length - 1);
      if (e.deltaY < 0) return Math.max(prev - 1, 0);
      return prev;
    });
  };

  /* ================= SCROLL LOCK ================= */
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;

    const lockBody = () => (document.body.style.overflow = "hidden");
    const unlockBody = () => (document.body.style.overflow = "");

    el.addEventListener("mouseenter", lockBody);
    el.addEventListener("mouseleave", unlockBody);
    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("mouseenter", lockBody);
      el.removeEventListener("mouseleave", unlockBody);
      el.removeEventListener("wheel", handleWheel);
    };
  }, [activeIndex]);

  const active = ranks[activeIndex];

  return (
    <div
      className="min-h-screen flex flex-col items-center pt-12 gap-8"
      style={{ background: theme.background }}
    >
      {/* TITLE */}
      <h1
        className="text-5xl font-bold saira-extra-condensed"
        style={{ color: theme.title }}
      >
        {title}
      </h1>

      <div className="flex items-center gap-16">

        {/* ================= RANK WHEEL ================= */}
        <div
          ref={wheelRef}
          className="relative h-[200px] w-64 overflow-hidden select-none border-y-2 overscroll-contain"
          style={{ borderColor: theme.border }}
        >
          {/* CENTER SLOT */}
          <div className="absolute top-1/2 w-full h-[40px] -translate-y-1/2 pointer-events-none" />

          {/* MOVING LIST */}
          <div
            className="absolute w-full transition-transform duration-200 ease-out"
            style={{
              transform: `translateY(${(CENTER_OFFSET - activeIndex) * ITEM_HEIGHT}px)`
            }}
          >
            {ranks.map((rank, index) => {
              const distance = Math.abs(index - activeIndex);

              return (
                <div
                  key={rank.name}
                  className="h-[40px] flex items-center justify-center font-semibold saira-extra-condensed"
                  style={{
                    opacity:
                      distance === 0 ? 1 : distance === 1 ? 0.5 : 0.2,
                    transform:
                      distance === 0 ? "scale(1.1)" : "scale(1)",
                    color:
                      distance === 0 ? theme.active : theme.inactive,
                    transition: "all 0.2s ease-out"
                  }}
                >
                  {rank.name}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= DETAILS CARD ================= */}
        <div
          className="rounded-xl p-6 w-[600px] h-[450px] text-white flex gap-6"
          style={{ background: theme.card }}
        >
          {/* LEFT TEXT */}
          <div className="flex-1 text-1xl space-y-1 overflow-y-auto pr-2 saira-extra-condensed font-bold">
            {active.branch && (
              <p>
                <span className={theme.label}>Branch:</span>{" "}
                <span className={theme.value}>{active.branch}</span>
              </p>
            )}

            {active.abbreviation && (
              <p>
                <span className={theme.label}>Abbreviation:</span>{" "}
                <span className={theme.value}>{active.abbreviation}</span>
              </p>
            )}

            {active.stars && (
              <p>
                <span className={theme.label}>Rank:</span>{" "}
                <span className={theme.value}>{active.stars}</span>
              </p>
            )}

            {active.higher && (
              <p>
                <span className={theme.label}>Next higher:</span>{" "}
                <span className={theme.value}>{active.higher}</span>
              </p>
            )}

            {active.lower && (
              <p>
                <span className={theme.label}>Next lower:</span>{" "}
                <span className={theme.value}>{active.lower}</span>
              </p>
            )}

            {active.equivalent && (
              <p>
                <span className={theme.label}>Equivalent:</span>{" "}
                <span className={theme.value}>{active.equivalent}</span>
              </p>
            )}

            {active.description && (
              <p className="text-xs mt-4 text-white/80 leading-relaxed saira-condensed">
                {active.description}
              </p>
            )}
          </div>

          {/* RIGHT IMAGES */}
          <div className="w-40 flex flex-col gap-4">
            {active.insignia && (
              <img
                src={active.insignia}
                alt="Insignia"
                className="max-h-20 object-contain"
              />
            )}

            {active.starsImg && (
              <img
                src={active.starsImg}
                alt="Stars"
                className="max-h-14 object-contain"
              />
            )}

            {active.officerImg && (
              <div className="h-50 overflow-hidden rounded">
                <img
                  src={active.officerImg}
                  alt="Officer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankPage;
