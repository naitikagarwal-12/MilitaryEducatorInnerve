import { armyHistory } from "../data/armyHistory";
import { navyHistory } from "../data/navyHistory";
import { airForceHistory } from "../data/airForceHistory";

import { armyTheme } from "../themes/armyTheme";
import { navyTheme } from "../themes/navyTheme";
import { airForceTheme } from "../themes/airForceTheme";

export const HISTORY_SERVICES = {
  army: {
    title: "Indian Army History",
    data: armyHistory,
    theme: armyTheme
  },
  navy: {
    title: "Indian Navy History",
    data: navyHistory,
    theme: navyTheme
  },
  airforce: {
    title: "Indian Air Force History",
    data: airForceHistory,
    theme: airForceTheme
  }
};
