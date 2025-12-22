const Card = ({ image, button, content, heading }) => {
  return (
    <div
      className="
        bg-[#5d6532]
        rounded-2xl
        p-3
        flex flex-col
        ring-2 ring-black/60 glow-card
        h-full w-auto
      "
    >
      <img
        src={image}
        alt={heading}
        className="
          rounded-2xl
          w-full
          object-cover
          h-36 sm:h-40 md:h-44 xl:h-48
          mb-3
          flex-shrink-0
        "
      />

      <div
        className="
          bg-[#b0be64]
          rounded-2xl
          p-3
          flex flex-col
          justify-between
          flex-grow-1
        "
      >
        <div>
          <p className="saira-extra-condensed font-bold text-lg md:text-xl">
            {heading}
          </p>
          <p className="saira-condensed text-sm md:text-base font-light mt-1">
            {content}
          </p>
        </div>

        <div
          className="
            mt-4
            flex
            justify-center
            items-center
            saira-condensed
            font-bold
            text-md
            text-white/80
          "
        >
          {button}
        </div>
      </div>
    </div>
  );
};

export default Card;
