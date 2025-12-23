import { armyHome } from "../data/armyHome";
import { navyHome } from "../data/navyHome";
import { airForceHome } from "../data/airForceHome";

import { armyTheme } from "../themes/armyTheme";
import { navyTheme } from "../themes/navyTheme";
import { airForceTheme } from "../themes/airForceTheme";

export const HOME_SERVICES = {
  army: {
    data: armyHome,
    theme: armyTheme
  },
  navy: {
    data: navyHome,
    theme: navyTheme
  },
  airforce: {
    data: airForceHome,
    theme: airForceTheme
  }
};
