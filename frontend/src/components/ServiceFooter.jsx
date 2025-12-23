import logo from "../assets/logo.png";
import { FaRegCopyright } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { IoLogoLinkedin, IoLogoYoutube } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = ({ theme }) => {
  if (!theme || !theme.footer) return null;
  const f = theme.footer;

  const [active, setActive] = useState(null);

  const toggle = (key) => {
    if (window.innerWidth < 768) {
      setActive((prev) => (prev === key ? null : key));
    }
  };

  const services = [
    { title: "AI Skill-Gap Analyzer", link: "/defense" },
    { title: "AR/VR Immersive Learning", link: "/download" },
    { title: "Veteran Connect", link: "/mock" },
    { title: "Strategic Timeline & Planner", link: "/strategy" },
  ];

  const defense = [
    { title: "Indian Army, (IA)", link: "/army" },
    { title: "Indian Navy, (IN)", link: "/navy" },
    { title: "Indian Air Force, (IAF)", link: "/air-force" },
  ];

  return (
    <footer
      className="flex flex-col justify-center items-center w-full"
      style={{ background: f.background }}
    >
      {/* TOP */}
      <div className="md:flex justify-between items-center p-2 w-full md:max-w-[85%]">
        <div className="ml-5 py-5 flex items-center gap-2 saira-stencil-one">
          <img src={logo} alt="Logo" className="h-16 lg:h-20 w-auto" />
          <div className="text-2xl lg:text-3xl">
            <p style={{ color: f.brand.military }}>Military</p>
            <p style={{ color: f.brand.educator }}>Educator</p>
          </div>
        </div>

        <p
          className="text-sm md:text-md xl:text-lg py-2 text-center px-5 saira-stencil-one"
          style={{ color: f.heading }}
        >
          "The One-Stop Platform for Tactical Intelligence and Exam Success"
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-2 w-full py-5 lg:mb-5 place-items-center px-6">
        {/* LEFT */}
        <div className="flex flex-col items-center md:items-start gap-5 saira-stencil-one">
          <Link to="/" className="text-2xl hover:scale-105 transition-all" style={{ color: f.text }}>
            Home
          </Link>

          <Link to="/about" className="text-2xl hover:scale-105 transition-all" style={{ color: f.text }}>
            About Us
          </Link>

          {/* SERVICES */}
          <div className="flex flex-col items-center md:items-start">
            <div
              onClick={() => toggle("services")}
              className="flex items-center gap-2 cursor-pointer text-2xl hover:scale-105 transition-all"
              style={{ color: f.text }}
            >
              <span>Our Services</span>
              <IoMdArrowDropdown className={`md:hidden ${active === "services" ? "rotate-180" : ""}`} />
            </div>

            <ul className={`${active === "services" ? "block" : "hidden"} md:block space-y-1 mt-1 saira-condensed font-semibold`}>
              {services.map((s) => (
                <li key={s.title}>
                  <Link to={s.link} className="flex items-center gap-2 hover:underline" style={{ color: f.text }}>
                    <FaArrowRightLong className="hidden md:block" color={f.arrow} />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="flex flex-col gap-5 md:gap-2">
          {/* DEFENSE */}
          <div className="flex flex-col items-center md:items-start saira-stencil-one">
            <div
              onClick={() => toggle("defense")}
              className="flex items-center gap-2 cursor-pointer text-2xl hover:scale-105 transition-all"
              style={{ color: f.text }}
            >
              <span>Defense System</span>
              <IoMdArrowDropdown className={`md:hidden ${active === "defense" ? "rotate-180" : ""}`} />
            </div>

            <ul className={`${active === "defense" ? "block" : "hidden"} md:block space-y-1 mt-1 saira-condensed font-semibold`}>
              {defense.map((d) => (
                <li key={d.title}>
                  <Link to={d.link} className="flex items-center gap-2 hover:underline" style={{ color: f.text }}>
                    <FaArrowRightLong className="hidden md:block" color={f.arrow} />
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div
              onClick={() => toggle("contact")}
              className="flex items-center gap-2 cursor-pointer text-2xl hover:scale-105 transition-all saira-stencil-one"
              style={{ color: f.text }}
            >
              <span>Contact Us</span>
              <IoMdArrowDropdown className={`md:hidden ${active === "contact" ? "rotate-180" : ""}`} />
            </div>

            <ul className={`${active === "contact" ? "block" : "hidden"} md:block space-y-1 saira-condensed font-semibold`} style={{ color: f.text }}>
              <li className="flex items-center gap-2">
                <span className="rounded-full p-1 text-[10px]" style={{ background: f.icon.bg, color: f.icon.text }}>
                  <BsFillTelephoneFill />
                </span>
                Toll No - 9xxxx xxxxx
              </li>
              <li className="flex items-center gap-2">
                <span className="rounded-full p-1 text-[10px]" style={{ background: f.icon.bg, color: f.icon.text }}>
                  <FaMapMarkedAlt />
                </span>
                Kota, Rajasthan
              </li>
              <li className="flex items-center gap-2">
                <span className="rounded-full p-1 text-[10px]" style={{ background: f.icon.bg, color: f.icon.text }}>
                  <SiGmail />
                </span>
                support@militaryeducator.in
              </li>
            </ul>
          </div>
        </div>

        {/* SOCIAL DESKTOP */}
        <div className="hidden lg:flex flex-col text-2xl saira-stencil-one">
          <span style={{ color: f.heading }}>Connect with us</span>
          <div className="flex justify-evenly items-center p-2 rounded-full my-1 text-xl" style={{ background: f.social.bg, color: f.social.icon }}>
            <FaFacebookSquare />
            <IoLogoYoutube />
            <FaInstagram />
            <IoLogoLinkedin />
            <FaSquareXTwitter />
          </div>
        </div>
      </div>

      {/* SOCIAL MOBILE */}
      <div className="lg:hidden text-center mb-5">
        <span className="text-xl saira-stencil-one" style={{ color: f.heading }}>
          Connect with us
        </span>
        <div className="flex justify-center gap-3 rounded-full p-2 mt-1" style={{ background: f.social.bg, color: f.social.icon }}>
          <FaFacebookSquare />
          <IoLogoYoutube />
          <FaInstagram />
          <IoLogoLinkedin />
          <FaSquareXTwitter />
        </div>
      </div>

      {/* COPYRIGHT */}
      <div
        className="p-3 text-xs sm:text-sm md:text-md lg:text-lg flex justify-center items-center gap-2 w-full saira-stencil-one"
        style={{ background: f.copyrightBg, color: f.text }}
      >
        <span>Copyright</span>
        <FaRegCopyright />
        <span>2025 Reserved | Military Educator</span>
      </div>
    </footer>
  );
};

export default Footer;
