import Button from "../components/Button";
import Card from "../components/Card";
import img1 from "../assets/services/img1.jpeg";
import img2 from "../assets/services/img2.jpeg";
import img3 from "../assets/services/img3.jpeg";
import img4 from "../assets/services/img4.jpeg";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="bg-[#b7987d] text-black p-5">
      <div className="flex flex-col justify-center items-center">
        <h1 className="saira-stencil-one text-4xl sm:text-5xl mt-4 lg:text-6xl">
          Our Services
        </h1>
      </div>
      <div className="my-7 mt-15 flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center max-w-[75%] lg:max-w-[90%]">
          <Card
            image={img3}
            content={
              "Our AI quickly finds your weak areas from tests and practice, then creates a personalized plan so you focus only on what matters most to improve faster."
            }
            heading={"AI Skill-Gap Analyzer"}
            button={
              <Button
                onClick={() => {navigate("defense")}}
                classname={"bg-[#5d6532] ring-2 ring-black/40 mt-5 px-2"}
              >
                Test Your Skills
              </Button>
            }
          />
          <Card
            image={img2}
            content={
              "Experience defence beyond theory through immersive AR/VR modules that let users explore 3D defence assets and combat scenarios for practical, hands-on understanding."
            }
            heading={"AR/VR Immersive Learning"}
            button={
              <Button
                onClick={() => {navigate("#")}}
                classname={"bg-[#5d6532] ring-2 ring-black/40 mt-5 px-2"}
              >
                AR/VR Mode
              </Button>
            }
          />

          <Card
            image={img1}
            content={
              "Aspirants prepare for SSB through live mock interviews and guidance from retired defence veterans, receiving real-time feedback to improve confidence, psychology, and performance."
            }
            heading={"Veteran Mock Interviews & Guidance"}
            button={
              <Button
                onClick={() => {navigate("mock")}}
                classname={"bg-[#5d6532] ring-2 ring-black/40 mt-5 px-2"}
              >
                Connect
              </Button>
            }
          />
          <Card
            image={img4}
            content={
              "Track exams and defence events with a smart planner while accessing verified, branch-specific study material and current affairs for Army, Navy, and Air Force preparation."
            }
            heading={"Strategic Timeline & Curated Study Hub"}
            button={
              <Button
                onClick={() => {navigate("#")}}
                classname={"bg-[#5d6532] ring-2 ring-black/40 mt-5 px-2"}
              >
                Explore
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
