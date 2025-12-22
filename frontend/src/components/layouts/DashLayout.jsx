import { Outlet } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import ChatbotButton from "../ChatbotButton.jsx";
import Footer from "../Footer.jsx";

const DashLayout = () => {
  return (
    <>
      <Outlet />
      <ChatbotButton />
      <div className="fixed bottom-0 w-full z-10">
        <Navbar />
      </div>
      <Footer />
    </>
  );
};

export default DashLayout;
