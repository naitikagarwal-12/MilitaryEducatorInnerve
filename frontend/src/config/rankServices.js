import { armyRanks } from "../data/armyRanks";
import { navyRanks } from "../data/navyRanks";
import { airForceRanks } from "../data/airForceRanks";

import { armyTheme } from "../themes/armyTheme";
import { navyTheme } from "../themes/navyTheme";
import { airForceTheme } from "../themes/airForceTheme";

export const SERVICES = {
  army: {
    title: "Ranks",
    ranks: armyRanks,
    theme: armyTheme.ranks
  },

  navy: {
    title: "Ranks",
    ranks: navyRanks,
    theme: navyTheme.ranks
  },

  airforce: {
    title: "Ranks",
    ranks: airForceRanks,
    theme: airForceTheme.ranks
  }
};
