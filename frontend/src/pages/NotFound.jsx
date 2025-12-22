import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <section className="relative min-h-screen bg-[#0b0f0c] flex items-center justify-center overflow-hidden">
  
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute w-[600px] h-[600px] bg-green-600/10 blur-[120px] rounded-full" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <p className="text-green-500 tracking-widest text-sm mb-3">
          ⚠ MILITARY EDUCATOR SYSTEM ALERT
        </p>

        <h1 className="text-7xl md:text-8xl font-extrabold text-white tracking-wider">
          404
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-green-400">
          MISSION FAILED
        </h2>

        <p className="mt-4 text-gray-400 text-sm md:text-base leading-relaxed">
          The page you are attempting to access is outside the authorized
          operational zone or does not exist in our tactical database.
        </p>

        <div className="my-6 h-[1px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-black font-semibold rounded-full transition-all shadow-lg shadow-green-600/30"
        >
          <FaHome />
          Return to Base
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
