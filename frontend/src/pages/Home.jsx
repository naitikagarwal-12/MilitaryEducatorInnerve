import motivationArms from "../assets/motivationArms.mp4";
import Header from "../components/Header.jsx";

const Home = () => {
  return (
    <section id="home" className="relative w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[78%] sm:h-[72%] bg-[#27395f] z-0" />
      <div className="relative z-10">
        <Header />
        <div className="max-w-7xl mx-auto px-4 pt-8 sm:pt-12 pb-10 flex flex-col items-center text-center saira-stencil-one">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl tracking-wide">
            Welcome to <span className="text-[rgb(176,190,100)]">Military</span>{" "}
            Educator
          </h1>

          <p className="text-gray-200 text-xs sm:text-sm md:text-lg mt-4 max-w-3xl leading-relaxed">
            "The one-stop platform for tactical intelligence, defense awareness,
            and structured exam preparation for India’s armed forces."
          </p>
          <div className="w-full mt-8 sm:mt-12 flex justify-center">
            <div className="w-full sm:w-[92%] md:w-[85%] aspect-[7/5] sm:aspect-[7/4] md:aspect-[7/3] lg:aspect-[5/2] xl:aspect-16/6 rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)] bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={motivationArms} type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="mt-8 text-[#b0be64] font-bold text-sm sm:text-md md:text-lg tracking-wider uppercase bg-[#0f1b2e] w-screen p-1 md:p-2">
            <p>Discipline • Strategy • Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
