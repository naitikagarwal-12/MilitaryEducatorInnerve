const MilitaryCards = ({ imgClass, image, button }) => {
  return (
    <div
      className="
        flex flex-col justify-center items-center
        bg-[#5c4e41]
        ring-2 ring-black/60
        rounded-2xl
        p-3
      "
    >
      <img src={image} alt="Defense Logo" className={`${imgClass} m-3`} />

      <div className="flex justify-center items-center my-3">{button}</div>
    </div>
  );
};

export default MilitaryCards;
