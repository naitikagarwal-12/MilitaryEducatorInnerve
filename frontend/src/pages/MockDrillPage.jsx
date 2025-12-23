import { MOCK_DRILL_SERVICES } from "../config/mockDrillServices";
import Footer from "../components/ServiceFooter";

function MockDrillPage({ service }) {
  const config = MOCK_DRILL_SERVICES?.[service];

  // SAFETY GUARD
  if (!config) return null;

  const { title, theme, data } = config;

  // IMPORTANT:
  // theme = FULL service theme (armyTheme / navyTheme / airForceTheme)
  // drillTheme = page-specific colors
  const drillTheme = theme.mockDrills;

  const { drills = [], video } = data || {};

  return (
    <>
      {/* ================= MOCK DRILLS PAGE ================= */}
      <section
        className="min-h-screen w-full overflow-x-hidden py-10 sm:py-12"
        style={{
          background: drillTheme.background,
          fontFamily: theme.common.font
        }}
      >
        {/* TITLE */}
        <h1
          className="text-center font-bold mb-10
                     text-3xl sm:text-4xl lg:text-6xl
                     saira-extra-condensed"
          style={{ color: drillTheme.heading }}
        >
          {title}
        </h1>

        <div
          className="max-w-6xl mx-auto px-4
                     grid grid-cols-1 md:grid-cols-2
                     gap-10 md:gap-12"
        >
          {/* LEFT — TEXT */}
          <div className="flex flex-col gap-8">
            {drills.map((d, i) => (
              <div key={i}>
                <h3
                  className="font-semibold mb-2
                             text-lg sm:text-xl
                             saira-extra-condensed"
                  style={{ color: drillTheme.heading }}
                >
                  {d.title}
                </h3>

                <p
                  className="text-sm leading-relaxed
                             saira-condensed"
                  style={{ color: drillTheme.text }}
                >
                  {d.text}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT — VIDEO */}
          {video && (
            <div className="w-full aspect-video rounded-xl overflow-hidden">
              <iframe
                src={video}
                title="Mock Drill Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer theme={theme} />
    </>
  );
}

export default MockDrillPage;
