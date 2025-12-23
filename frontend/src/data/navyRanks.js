import admiralInsignia from "../assets/Navy/Ranks/1.1.svg";
import admiralStars from "../assets/Navy/Ranks/1.2.png";
import admiral from "../assets/Navy/Ranks/1.3.jpg";

import viceAdmiralInsignia from "../assets/Navy/Ranks/2.1.svg";
import viceAdmiralStars from "../assets/Navy/Ranks/2.2.png";
import viceAdmiral from "../assets/Navy/Ranks/2.3.jpg";

import rearAdmiralInsignia from "../assets/Navy/Ranks/3.1.svg";
import rearAdmiralStars from "../assets/Navy/Ranks/3.2.png";
import rearAdmiral from "../assets/Navy/Ranks/3.3.jpg";

import commodoreInsignia from "../assets/Navy/Ranks/4.1.svg";
import commodoreStars from "../assets/Navy/Ranks/4.2.png"
import commodore from "../assets/Navy/Ranks/4.3.jpg"

import { generatePath } from "react-router-dom";

export const navyRanks = [
  {
    name: "Field Marshal",
    branch: "Indian Navy",
    abbreviation: "Adm",
    stars: "Four-star rank",
    higher: "Admiral of the fleet",
    lower: "Vice admiral",
    equivalent: "General (Indian Navy), Air chief marshal (Indian Air Force)",
    description: "Admiral is a four-star naval flag officer rank in the Indian Navy. It is the highest active rank in the Indian Navy. Admiral ranks above the three-star rank of vice admiral and below the five-star rank of admiral of the fleet, which has never been awarded or held.",
    insignia: admiralInsignia,
    starsImg: admiralStars,  
    officerImg: admiral
  },
  {
    name: "Vice Admiral",
    branch: "Indian Navy",
    abbreviation: "VAdm/ Surg VAdm",
    stars: "Three-star rank",
    higher: "Admiral",
    lower: "Rear admiral",
    equivalent: "	Vice admiral (Indian Navy), Air marshal (Indian Air Force)",
    description: "Vice admiral is a three-star flag officer rank in the Indian Navy. It is the second-highest active rank in the Indian Navy. Vice admiral ranks above the two-star rank of rear admiral and below the four-star rank of admiral, which is held by the Chief of the Naval Staff (CNS).",
    insignia: viceAdmiralInsignia,
    starsImg: viceAdmiralStars,
    officerImg: viceAdmiral
  },
  {
    name: "Rear Admiral",
    branch: "Indian Navy",
    abbreviation: "RAdm/ Surg RAdm",
    stars: "Two-star rank",
    higher: "Vice Admiral",
    lower: "Commodore",
    equivalent: "Lieutenant general (Indian Army), Air marshal (Indian Air Force)",
    description: "Rear admiral is a two-star flag officer rank in the Indian Navy. It is the third-highest active rank in the Indian Navy. Rear admiral ranks above the one-star rank of commodore and below the three-star rank of vice admiral.",
    insignia: rearAdmiralInsignia,
    starsImg: rearAdmiralStars,
    officerImg: rearAdmiral
  },
  {
    name: "Commodore",
    branch: "Indian Navy",
    abbreviation: "Cmde/ Surg Cmde",
    stars: "One-star rank",
    higher: "Rear Admiral",
    lower: "Captain",
    equivalent: "Brigadier (Indian Army), Air commodore (Indian Air Force)",
    description: "Commodore is a one-star rank in the Indian Navy. Commodore ranks above the rank of captain and below the two-star rank of rear admiral. This navy rank will be abbreviated as CMDE or Cmde.",
    insignia: commodoreInsignia,
    starsImg: commodoreStars, 
    officerImg: commodore
  }
];
