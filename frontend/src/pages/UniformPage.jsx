import { UNIFORM_SERVICES } from "../config/uniformServices";

function UniformPage({ service }) {
  const config = UNIFORM_SERVICES?.[service];

  /* SAFETY GUARD */
  if (!config) {
    return null;
  }

  const { title, uniforms, theme } = config;

  if (!uniforms || uniforms.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center
                   text-base sm:text-xl font-semibold text-center px-4 "
        style={{
          background: theme.background,
          color: theme.heading
        }}
      >
        Data coming soon.
      </div>
    );
  }

  return (
    <section
      className="min-h-screen w-full overflow-x-hidden py-10 sm:py-12"
      style={{ background: theme.background }}
    >
      {/* TITLE */}
      <h1
        className="text-center font-bold
                   text-3xl sm:text-4xl lg:text-6xl saira-extra-condensed"
        style={{ color: theme.heading }}
      >
        {title}
      </h1>

      {/* GRID */}
      <div
        className="
          max-w-6xl mx-auto mt-8 sm:mt-10 px-3 sm:px-4
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3
        "
      >
        {uniforms.map((u) => (
          <div
            key={u.id}
            className="overflow-hidden"
          >
            <img
              src={u.image}
              alt={u.label || "Uniform"}
              className="
                w-full
                h-40 sm:h-48 md:h-56 lg:h-60
                object-cover
                transition-transform duration-300
                hover:scale-105
              "
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default UniformPage;
