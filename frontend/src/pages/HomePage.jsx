import { HOME_SERVICES } from "../config/homeServices";
import Header from "../components/ServiceHeader";

function HomePage({ service }) {
  const config = HOME_SERVICES?.[service];

  // SAFETY GUARD
  if (!config) return null;

  const { data, theme } = config;
  const t = theme.home;

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background: t.background,
        color: t.text,
        fontFamily: theme.common.font
      }}
    >
      {/* ================= THEMED HEADER ================= */}
      <Header theme={theme} />

      {/* ================= HERO ================= */}
      <section className="flex flex-col items-center mt-8 sm:mt-10 gap-6 px-4">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          <img
            src={data.logo}
            alt={data.name}
            className="w-20 sm:w-24"
          />

          <div className="text-center">
            <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl saira-extra-condensed">
              {data.name}
            </h1>
            <p className="text-lg sm:text-2xl saira-condensed">
              {data.motto}
            </p>
          </div>

          <img
            src={data.logo}
            alt={data.name}
            className="w-20 sm:w-24"
          />
        </div>
      </section>

      {/* ================= CARDS ================= */}
      <section className="mt-12 px-4 sm:px-10 pb-16">
        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {data.cards.map((card, i) => (
            <div
              key={i}
              className={`border-2 ${t.border}
                          p-4 flex flex-col gap-3`}
            >
              <h3 className="text-lg sm:text-xl font-bold text-center saira-extra-condensed">
                {card.title}
              </h3>

              <p className="text-sm leading-relaxed saira-condensed">
                {card.text}
              </p>

              {card.action && (
                <button
                  className="mt-auto mx-auto px-4 py-1
                             rounded-full text-sm font-semibold saira-extra-condensed"
                  style={{ background: t.primaryButton, color: "#000" }}
                >
                  {card.action}
                </button>
              )}

              {card.type === "news" && (
                <div className="mt-auto text-center text-xl">⬇</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
