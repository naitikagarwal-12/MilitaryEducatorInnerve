import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import ChatbotButton from "../ChatbotButton.jsx";
import Footer from "../Footer.jsx";

const DashLayout = () => {
  const location = useLocation();

  const hideFooterRoutes = ["/army", "/navy", "/air-force"];

  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Outlet />
      <ChatbotButton />
      <div className="fixed bottom-0 w-full z-10">
        <Navbar />
      </div>
      {!hideFooter && <Footer />}
    </>
  );
};

export default DashLayout;
