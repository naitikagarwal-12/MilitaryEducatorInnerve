import { useEffect, useState } from "react";
import chatbotLogo from "../assets/chatbotLogo.png";
import { IoClose } from "react-icons/io5";
import { FaArrowUpLong } from "react-icons/fa6";
import lenis from "../lenis"; // 👈 import lenis instance

const ChatbotButton = () => {
  const [botOpen, setBotOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    lenis.scrollTo(0, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  };

  return (
    <>
      {/* SCROLL TO TOP */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`
          fixed right-1 md:right-3 z-60
          bottom-21 md:bottom-28 lg:bottom-26
          p-2 md:p-4 rounded-full
          bg-orange-700/80 backdrop-blur-xl
          ring-orange-500 shadow-[0_0_20px_rgba(255,94,0,0.6)]
          text-red-300 text-2xl md:text-3xl
          transition-all duration-300
          hover:scale-110
          ${
            showScroll
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6 pointer-events-none"
          }
        `}
      >
        <FaArrowUpLong />
      </button>

      {/* CHATBOT TOGGLE */}
      <button
        onClick={() => setBotOpen((prev) => !prev)}
        className="
          chatTalk fixed bottom-8 lg:bottom-7 right-1 md:right-3
          z-60 p-0.5 rounded-full
          ring-orange-500 shadow-[0_0_20px_rgba(255,94,0,0.6)]
          bg-orange-700/80 backdrop-blur-xl
          hover:scale-110 transition-all duration-300
        "
      >
        {botOpen ? (
          <IoClose className="text-6xl p-3 text-white/60" />
        ) : (
          <img
            src={chatbotLogo}
            alt="ChatbotLogo"
            className="h-10 md:h-16 lg:h-15"
          />
        )}
      </button>

      {/* CHATBOT MODAL (UNCHANGED) */}
      {botOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setBotOpen(false)}
          />

          <div className="fixed z-80 inset-0 md:inset-auto md:bottom-20 md:right-21 md:h-[80%] md:w-[55%] flex items-center justify-center">
            <div
              className="
                absolute inset-0 rounded-none md:rounded-2xl
                p-[1.5px]
                bg-[linear-gradient(90deg,#b0be64,#22d3ee,#a855f7,#b0be64)]
                bg-[length:300%_300%]
                animate-[borderMove_6s_linear_infinite]
              "
            >
              <div className="w-full h-full bg-white/60 backdrop-blur-xl border border-white/30 rounded-none md:rounded-2xl overflow-hidden">
                <iframe
                  src="https://cdn.botpress.cloud/webchat/v3.5/shareable.html?configUrl=https://files.bpcontent.cloud/2025/12/17/17/20251217174506-CNFK56K7.json"
                  title="Chatbot"
                  className="w-full h-full border-none"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatbotButton;
