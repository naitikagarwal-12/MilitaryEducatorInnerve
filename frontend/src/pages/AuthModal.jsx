import { useState } from "react";
import { IoClose } from "react-icons/io5";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import loginHero from "../assets/loginHero.png";
import soldier from "../assets/soldier.png";

const AuthModal = ({ onSuccess }) => {
  const [mode, setMode] = useState("login");

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-3xl w-[90%] md:w-[85%] lg:w-[75%] max-w-6xl overflow-hidden relative">
        <button onClick={onSuccess} className="absolute top-4 right-4 z-50">
          <IoClose className="text-3xl text-[#27395f] font-bold bg-gray-50 hover:bg-gray-200 p-1 rounded-full" />
        </button>

        {/* HEIGHT ANCHOR */}
        <div className="relative">
          {/* SLIDING FORMS */}
          <div
            className={`flex w-[200%] transition-transform duration-700 ease-in-out
            ${mode === "signup" ? "-translate-x-1/2" : "translate-x-0"}`}
          >
            <div className="w-1/2 p-6 flex items-center">
              <LoginForm
                switchToSignup={() => setMode("signup")}
                onSuccess={onSuccess}
              />
            </div>

            <div className="w-1/2 p-6 flex items-center">
              <SignUpForm
                switchToLogin={() => setMode("login")}
                onSuccess={onSuccess}
              />
            </div>
          </div>

          <div
            className={`hidden md:absolute top-0 right-0 w-1/2 h-full transition-transform
            duration-700 ease-in-out
            ${mode === "signup" ? "-translate-x-full" : "translate-x-0"}`}
          >
            <div className="relative h-full p-4">
              <img
                src={loginHero}
                className="rounded-3xl h-full w-full object-cover"
              />
              <div className="absolute inset-6 bg-white rounded-3xl">
                <img
                  src={soldier}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
