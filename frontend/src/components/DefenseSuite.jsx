import Header from "./Header";

const DefenseSuite = () => {
  return (
    <div className="bg-[#27395f]">
      <Header />
      <iframe
        src={`${import.meta.env.VITE_DEFENSE_API}`}
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </div>
  );
};

export default DefenseSuite;
