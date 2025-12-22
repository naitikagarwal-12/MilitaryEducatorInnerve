import logo from "../assets/logo.png";
import { FaRegCopyright } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

const Footer = () => {
  const [active, setActive] = useState(null);

  const toggle = (key) => {
    if (window.innerWidth < 768) {
      setActive((prev) => (prev === key ? null : key));
    }
  };

  const services = [
    { id: 1, title: "AI Skill-Gap Analyzer", link: "/defense" },
    { id: 2, title: "AR/VR Immersive Learning", link: "/download" },
    { id: 3, title: "Veteran Connect", link: "/mock" },
    { id: 4, title: "Strategic Timeline & Planner", link: "/strategy" },
  ];

  const defense = [
    { id: 1, title: "Indian Army, (IA)", link: "/army" },
    { id: 2, title: "Indian Navy, (IN)", link: "/navy" },
    { id: 3, title: "Indian Air Force, (IAF)", link: "/air-force" },
  ];
  return (
    <footer className="flex flex-col justify-center items-center bottom-0 bg-[#27395f] w-full">
      <div className="md:flex justify-between items-center p-2 w-full md:max-w-[85%]">
        <div className="ml-5 py-5 flex justify-center items-center gap-2 saira-stencil-one">
          <img src={logo} alt="Logo" className="h-16 lg:h-20 w-auto" />
          <div className="text-2xl lg:text-3xl">
            <p className="text-[#b0be64]">Military</p>
            <p className="text-white">Educator</p>
          </div>
        </div>
        <p className="text-sm md:text-md xl:text-lg py-2 saira-stencil-one text-[#b0be64] text-center px-5">
          "The One-Stop Platform for Tactical Intelligence and Exam Success"
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-2 w-full py-5 lg:mb-5 place-items-center px-15">
        <div className="flex flex-col justify-center items-center md:items-start gap-5 saira-stencil-one">
          <a href="#">
            <div className="text-white text-2xl hover:scale-105 transition-all duration-300">
              <span className="hover:text-white/70">Home</span>
            </div>
          </a>
          <a href="#">
            <div className="text-white text-2xl hover:scale-105 transition-all duration-300">
              <span className="hover:text-white/70">About Us</span>
            </div>
          </a>

          <div className="flex flex-col items-center md:items-start">
            <div
              onClick={() => toggle("services")}
              className="flex items-center justify-center gap-2 cursor-pointer hover:text-white/70 text-white text-2xl hover:scale-105 transition-all duration-300"
            >
              <span>Our Services</span>
              <IoMdArrowDropdown
                className={`text-3xl md:hidden ${
                  active === "services" ? "rotate-180" : "rotate-0"
                } transition-all duration-300`}
              />
            </div>

            <ul
              className={`text-md space-y-1 mt-1 saira-condensed font-semibold my-1
              ${active === "services" ? "block" : "hidden"}
              md:block`}
            >
              {services.map((s) => (
                <li key={s.id} className="text-white">
                  <a
                    href={s.link}
                    className="flex items-center justify-center md:justify-start gap-2 hover:underline"
                  >
                    <FaArrowRightLong className="hidden md:block" /> {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-5 md:gap-2">
          <div className="flex flex-col items-center md:items-start saira-stencil-one">
            <div
              onClick={() => toggle("defense")}
              className="flex items-center justify-center gap-2 cursor-pointer hover:text-white/70 text-white text-2xl hover:scale-105 transition-all duration-300"
            >
              <span>Defense System</span>
              <IoMdArrowDropdown
                className={`text-3xl md:hidden ${
                  active === "defense" ? "rotate-180" : "rotate-0"
                } transition-all duration-300`}
              />
            </div>

            <ul
              className={`text-md space-y-1 mt-1 saira-condensed font-semibold my-1
            ${active === "defense" ? "block" : "hidden"}
            md:block`}
            >
              {defense.map((d) => (
                <li key={d.id} className="text-white">
                  <a
                    href={d.link}
                    className="flex items-center justify-center md:justify-start gap-2 hover:underline"
                  >
                    <FaArrowRightLong className="hidden md:block" /> {d.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2">
            <div
              onClick={() => toggle("contact")}
              className="flex items-center justify-center gap-2 cursor-pointer hover:text-white/70 text-white text-2xl hover:scale-105 transition-all duration-300 saira-stencil-one"
            >
              <span>
                <a href="/contact">Contact Us</a>
              </span>
              <IoMdArrowDropdown
                className={`text-3xl md:hidden ${
                  active === "contact" ? "rotate-180" : "rotate-0"
                } transition-all duration-300`}
              />
            </div>

            <ul
              className={`text-white saira-condensed text-md font-semibold space-y-1
            ${active === "contact" ? "block" : "hidden"}
            md:block`}
            >
              <li className="flex items-center gap-2 hover:underline">
                <span className="bg-[#b0be64] text-black rounded-full p-1 text-[10px] hover:bg-[#5d6532] hover:text-white">
                  <BsFillTelephoneFill />
                </span>
                Toll No - 9xxxx xxxxx
              </li>
              <li className="flex items-center gap-2 hover:underline">
                <span className="bg-[#b0be64] text-black rounded-full p-1 text-[10px] hover:bg-[#5d6532] hover:text-white">
                  <FaMapMarkedAlt />
                </span>
                Kota, Rajasthan
              </li>
              <li className="flex items-center gap-2 hover:underline">
                <span className="bg-[#b0be64] text-black rounded-full p-1 text-[10px] hover:bg-[#5d6532] hover:text-white">
                  <SiGmail />
                </span>
                support@militaryeducator.in
              </li>
            </ul>
          </div>
        </div>

        <div className="hidden lg:flex flex-col justify-start text-white text-3xl md:text-2xl lg:text-2xl text-start">
          <a href="#" className="saira-stencil-one">
            <span>Connect with us</span>
          </a>
          <div className="flex justify-evenly items-center bg-[#5d6532] p-2 rounded-full my-1 text-xl">
            <FaFacebookSquare className="hover:text-white/60" />
            <FaYoutube className="hover:text-white/60" />
            <FaInstagram className="hover:text-white/60" />
            <IoLogoLinkedin className="hover:text-white/60" />
            <FaSquareXTwitter className="hover:text-white/60" />
          </div>
        </div>
      </div>

      <div className="text-white text-2xl text-center mt-5 md:mt-5 md:w-[30%] lg:hidden saira-condensed">
        <a href="#" className="saira-stencil-one">
          <span>Connect with us</span>
        </a>
        <div className="flex justify-center items-center gap-2 bg-[#5d6532] rounded-full my-1 py-1 mb-5">
          <FaFacebookSquare className="hover:text-white/60" />
          <FaYoutube className="hover:text-white/60" />
          <FaInstagram className="hover:text-white/60" />
          <IoLogoLinkedin className="hover:text-white/60" />
          <FaSquareXTwitter className="hover:text-white/60" />
        </div>
      </div>
      <div className="bg-[#1b273e] p-3 text-white text-xs sm:text-sm md:text-md lg:text-lg flex justify-center items-center gap-2 w-full z-10 saira-stencil-one">
        <p>Copyright</p>
        <span>
          <FaRegCopyright />
        </span>
        <p>2025 Reserved</p>
        <span>|</span>
        <p>Military Educator</p>
      </div>
    </footer>
  );
};

export default Footer;
