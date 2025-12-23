import logo from "../assets/logo.png";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../pages/AuthModal";
import lenis from "../lenis";

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const scrollToSection = (targetId) => {
    requestAnimationFrame(() => {
      const section = document.getElementById(targetId);
      if (!section || !lenis) return;

      lenis.scrollTo(section, {
        offset: -50,
        duration: 1.2,
        immediate: false,
      });
    });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 lg:grid-cols-3 place-items-center w-full">

          {/* LOGO */}
          <div className="p-2 flex justify-center items-center md:gap-3 gap-1">
            <img src={logo} alt="Logo" className="h-13 sm:h-16 w-auto" />
            <a
              href="/"
              className="text-lg sm:text-xl md:text-2xl saira-stencil-one"
            >
              <p className="text-[#b0be64]">Military</p>
              <p className="text-white">Educator</p>
            </a>
          </div>

          {/* AR/VR BAR */}
          <div
            onClick={() => scrollToSection("model")}
            className="hidden lg:flex rounded-3xl bg-[#d9d9d9] border-2 border-[#27395f]
                       max-w-90 items-center saira-stencil-one cursor-pointer
                       hover:scale-[1.02] transition"
          >
            <div className="rounded-3xl py-2 px-5 bg-[#5d6532] text-white outline-3 outline-[#27395f]">
              <p>Experience on AR/VR</p>
            </div>
            <div className="flex justify-center items-center">
              <p className="py-1 px-3 text-[#5d6532]">Explore</p>
              <MdOutlineFileDownload className="text-2xl text-[#5d6532]" />
            </div>
          </div>

          {/* CONTACT + AUTH */}
          <div className="flex justify-center items-center gap-2 saira-condensed font-extrabold">

            <Button
              icon={<FaPhone />}
              onClick={() => navigate("contact")}
              classname="bg-[#b0be64] text-xs sm:text-sm lg:text-md border border-[#27395f]"
            >
              Contact Us
            </Button>

            {!isAuthenticated ? (
              <Button
                icon={<FaUser />}
                onClick={() => setLoginOpen(true)}
                classname="bg-[#b0be64] text-xs sm:text-sm lg:text-md border border-[#27395f]"
              >
                Login
              </Button>
            ) : (
              <div className="relative">
                <Button
                  icon={<FaUserCircle />}
                  onClick={() => setProfileOpen((p) => !p)}
                  classname="bg-[#b0be64] text-xs sm:text-sm lg:text-md border border-[#27395f]"
                >
                  Profile
                </Button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border z-50">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      My Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Dashboard
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Settings
                    </button>
                    <hr />
                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="w-[90%] md:w-[80%] lg:w-[85%] xl:w-[80%]
                     mx-auto border-t-3 text-white rounded-full" />

      {/* LOGIN MODAL */}
      {loginOpen && <AuthModal onSuccess={() => setLoginOpen(false)} />}
    </>
  );
};

export default Header;
