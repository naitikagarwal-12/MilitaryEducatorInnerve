import military from "../assets/military.png";
import TacticalReveal from "../components/TacticalReveal";

const About = () => {
  return (
    <section id="about" className="bg-[#5c4e41] text-white py-14 px-6">
      <div className="text-center max-w-3xl mx-auto saira-stencil-one">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl">About Us</h1>
        <p className="text-sm md:text-lg mt-4 opacity-90">
          Military Educator is a pioneering EduTech platform dedicated to
          bridging the gap between defence aspirations and reality.
        </p>
      </div>

      <div className="mx-auto mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-[92%] md:max-w-[95%]">
        {/* Image */}
        <img
          src={military}
          alt="Military"
          className="rounded-4xl w-full shadow-2xl h-full object-cover"
        />

        {/* Tactical Points */}
        <div className="flex flex-col justify-evenly gap-6 saira-condensed font-medium w-full h-full px-2 md:space-y-2">
          <TacticalReveal
            title="Idea"
            text="To create a unified defence learning ecosystem integrating Army, Navy, and Air Force preparation with immersive AR/VR and AI-driven planning."
          />

          <TacticalReveal
            title="Scope"
            text="From conceptual clarity to psychological readiness, enabling aspirants to perform confidently in written exams and SSB environments."
          />

          <TacticalReveal
            title="Aim"
            text="To democratize elite defence mentorship and empower aspirants from all backgrounds to serve the nation with confidence and competence."
          />
        </div>
      </div>
    </section>
  );
};

export default About;
