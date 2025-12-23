import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import lenis from "../lenis";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 1, title: "Home", target: "home" },
    { id: 2, title: "About Us", target: "about" },
    { id: 3, title: "Our Services", target: "services" },
    { id: 4, title: "Defence System", target: "defence" },
  ];

  const [activeItem, setActiveItem] = useState(1);

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

  const handleNavClick = (item) => {
    setActiveItem(item.id);

    // If NOT on home page, navigate first
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: item.target } });
    } else {
      scrollToSection(item.target);
    }
  };

  return (
    <div className="bg-[#1b273e] h-10 flex justify-evenly items-center saira-stencil-one">
      <img src={logo} alt="Logo" className="h-7 sm:h-8 w-auto" />

      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item)}
          className={`text-xs sm:text-sm md:text-lg xl:text-xl ${
            activeItem === item.id ? "text-[#efad04]" : "text-white"
          } hover:text-[#efad04]/90`}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
