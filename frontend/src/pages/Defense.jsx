import Button from "../components/Button";
import MilitaryCards from "../components/MilitaryCards.jsx";
import army from "../assets/defenseLogos/armyLogo.png";
import navy from "../assets/defenseLogos/navyLogo.png";
import airForce from "../assets/defenseLogos/airForceLogo.png";
import { useNavigate } from "react-router-dom";

const Defense = () => {
  const navigate = useNavigate();

  return (
    <>
      <section id="defence" className="bg-[#b7987d] text-black p-5">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl sm:text-5xl mt-4 lg:text-6xl saira-stencil-one">
            Defence System
          </h1>
        </div>

        {/* CARDS */}
        <div className="flex justify-center items-center saira-extra-condensed font-bold">
          <div className="grid grid-cols-1 md:grid-cols-3 my-7 mt-15 w-[65%] sm:w-[55%] md:w-[85%] gap-4">
            <MilitaryCards
              imgClass="max-h-40 w-auto"
              image={navy}
              button={
                <Button
                  onClick={() => navigate("/navy")}
                  classname="glow-btn text-black bg-[#b7987d] px-5 py-2 text-xl sm:text-2xl lg:text-3xl ring-2 ring-black/30"
                >
                  Indian Navy
                </Button>
              }
            />

            <MilitaryCards
              imgClass="max-h-40 w-auto"
              image={army}
              button={
                <Button
                  onClick={() => navigate("/army")}
                  classname="glow-btn text-black bg-[#b7987d] px-5 py-2 ring-2 ring-black/30 text-xl sm:text-2xl lg:text-3xl"
                >
                  Indian Army
                </Button>
              }
            />

            <MilitaryCards
              imgClass="max-h-40 w-auto"
              image={airForce}
              button={
                <Button
                  onClick={() => navigate("/air-force")}
                  classname="glow-btn text-black bg-[#b7987d] px-5 py-2 text-xl sm:text-2xl lg:text-3xl ring-2 ring-black/30"
                >
                  Indian Air Force
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Defense;
