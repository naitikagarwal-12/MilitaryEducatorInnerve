import Header from "./Header";

const MockInterview = () => {
  return (
    <div className="bg-[#27395f]">
      <Header />
      <iframe
        src="https://mocks-pnfz.onrender.com"
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </div>
  );
};

export default MockInterview;
