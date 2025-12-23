import { armyMockDrills } from "../data/armyDrills";
import { navyDrills } from "../data/navyDrills";
import { airForceMockDrills } from "../data/airForceDrills";

import { armyTheme } from "../themes/armyTheme";
import { navyTheme } from "../themes/navyTheme";
import { airForceTheme } from "../themes/airForceTheme";

export const MOCK_DRILL_SERVICES = {
  army: {
    title: "Mock Drills",
    theme: armyTheme,
    data: armyMockDrills
  },

  navy: {
    title: "Mock Drills",
    theme: navyTheme,
    data: navyDrills
  },

  airforce: {
    title: "Mock Drills",
    theme: airForceTheme,
    data: airForceMockDrills
  }
};
