const Button = ({ icon, classname, children, onClick }) => {
  return (
    <div
      className={`${classname} glow-btn rounded-lg sm:rounded-xl py-2 px-1 sm:py-1.5 sm:px-3`}
    >
      <button
        onClick={onClick}
        className="flex justify-center items-center gap-1"
      >
        <div>{icon}</div>
        <div>{children}</div>
      </button>
    </div>
  );
};

export default Button;
