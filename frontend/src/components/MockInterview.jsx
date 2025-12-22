import Header from "./Header";

const MockInterview = () => {
  return (
    <div className="bg-[#27395f]">
      <Header />
      <iframe
        src="http://127.0.0.1:5001/"
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </div>
  );
};

export default MockInterview;
