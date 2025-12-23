import logo from "../assets/logo.png";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ theme }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const h = theme.header;

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center w-full">
          
          {/* LOGO + BRAND */}
          <div className="p-2 flex justify-center items-center md:gap-3 gap-1">
            <img src={logo} alt="Logo" className="h-13 sm:h-16 w-auto" />

            <a
              href="#"
              className="text-lg sm:text-xl md:text-2xl saira-stencil-one"
              onClick={(e) => e.preventDefault()}
            >
              <p style={{ color: h.brand.military }}>Military</p>
              <p style={{ color: h.brand.educator }}>Educator</p>
            </a>
          </div>

          {/* AR/VR + DOWNLOAD BAR */}
          <div
            className="hidden lg:flex rounded-3xl border-2 max-w-85 items-center"
            style={{
              background: "#d9d9d9",
              borderColor: h.buttons.arvr.border
            }}
          >
            <div
              className="rounded-3xl py-2 px-5 border-2"
              style={{
                background: h.buttons.arvr.bg,
                color: h.buttons.arvr.text,
                borderColor: h.buttons.arvr.border
              }}
            >
              <p>Experience on AR/VR</p>
            </div>

            <div className="flex gap-1 justify-center items-center px-3">
              <p
                className="font-bold"
                style={{ color: h.buttons.download.text }}
              >
                Download
              </p>
              <MdOutlineFileDownload
                className="text-2xl"
                style={{ color: h.buttons.download.icon }}
              />
            </div>
          </div>

          {/* CONTACT + LOGIN */}
          <div className="flex justify-center items-center gap-2 saira-condensed font-extrabold">
            
            {/* CONTACT */}
            <button
              onClick={() => navigate("/contact")}
              className="flex items-center gap-1 border rounded-lg sm:rounded-xl py-2 px-2 sm:py-1.5 sm:px-3 text-xs sm:text-sm lg:text-md"
              style={{
                background: h.buttons.contact.bg,
                color: h.buttons.contact.text,
                borderColor: h.buttons.contact.border
              }}
            >
              <FaPhone />
              <span>Contact Us</span>
            </button>

            {/* LOGIN (unchanged, placeholder) */}
            <button
              onClick={() => setLoginOpen(true)}
              className="flex items-center gap-1 border rounded-lg sm:rounded-xl py-2 px-2 sm:py-1.5 sm:px-3 text-xs sm:text-sm lg:text-md"
              style={{
                background: h.buttons.login.bg,
                color: h.buttons.login.text,
                borderColor: h.buttons.login.border
              }}
            >
              <FaUser />
              <span>Login</span>
            </button>

          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <hr
        className="w-[95%] md:w-[80%] lg:w-[85%] xl:w-[80%] mx-auto border-t-3 rounded-full"
        style={{ borderColor: h.divider }}
      />
    </>
  );
}

export default Header;
