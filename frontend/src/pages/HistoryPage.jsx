import { HISTORY_SERVICES } from "../config/historyServices";

function HistoryPage({ service }) {
  const config = HISTORY_SERVICES?.[service];

  // SAFETY GUARD
  if (!config) return null;

  const { data, theme } = config;
  const history = theme.history;

  return (
    <section
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background: history.background,
        fontFamily: theme.common.font
      }}
    >
      {/* PAGE TITLE */}
      <h1
        className="text-center font-bold pt-10
                   text-3xl sm:text-4xl lg:text-6xl saira-extra-condensed"
        style={{ color: history.section.heading }}
      >
        History
      </h1>

      {/* BAR — MOBILE SCROLLABLE */}
      <div
        className="mt-8 sm:mt-10 flex justify-center overflow-x-auto"
        style={{ background: history.bar.background }}
      >
        <div className="flex">
          {data.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-6 sm:px-8 py-3
                         text-sm font-semibold whitespace-nowrap saira-extra-condensed"
              style={{
                color: history.bar.text,
                borderLeft:
                  index === 0
                    ? "none"
                    : `3px solid ${history.background}`
              }}
            >
              {item.title}
              {item.year && ` (${item.year})`}
            </a>
          ))}
        </div>
      </div>

      {/* SECTIONS */}
      <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-10 pb-20">
        {data.map((item, index) => (
          <div
            key={item.id}
            id={item.id}
            className="scroll-mt-24 sm:scroll-mt-32"
          >
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
              {/* TEXT */}
              <div className="md:w-2/3 w-full">
                <h2
                  className="font-bold
                             text-xl sm:text-2xl lg:text-3xl saira-extra-condensed"
                  style={{ color: history.section.heading }}
                >
                  {item.title}
                  {item.year && (
                    <span className="opacity-70"> ({item.year})</span>
                  )}
                </h2>

                <p
                  className="mt-4 text-sm sm:text-base leading-relaxed saira-condensed"
                  style={{ color: history.section.text }}
                >
                  {item.text}
                </p>
              </div>

              {/* IMAGE */}
              <div className="md:w-1/3 w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-2xl w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* DIVIDER */}
            {index !== data.length - 1 && (
              <div
                className="my-14 sm:my-16 h-[3px] w-full"
                style={{ background: history.bar.background }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default HistoryPage;
