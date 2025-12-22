import About from "../../pages/About.jsx";
import Defense from "../../pages/Defense.jsx";
import Home from "../../pages/Home.jsx";
import Model from "../../pages/Model.jsx";
import Services from "../../pages/Services.jsx";

const HomeLayout = () => {
  return (
    <>
      <Home />
      <About />
      <Services />
      <Model />
      <Defense />
    </>
  );
};

export default HomeLayout;
