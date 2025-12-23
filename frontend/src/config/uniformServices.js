import { armyUniforms } from "../data/armyUniform";
import { navyUniforms } from "../data/navyUniform";
import { airForceUniforms } from "../data/airForceUniform";

import { armyTheme } from "../themes/armyTheme";
import { navyTheme } from "../themes/navyTheme";
import { airForceTheme } from "../themes/airForceTheme";

export const UNIFORM_SERVICES = {
  army: {
    title: "Uniform",
    uniforms: armyUniforms,
    theme: armyTheme.uniform
  },
  navy: {
    title: "Uniform",
    uniforms: navyUniforms,
    theme: navyTheme.uniform
  },
  airforce: {
    title: "Uniform",
    uniforms: airForceUniforms,
    theme: airForceTheme.uniform
  }
};
