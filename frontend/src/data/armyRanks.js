import fieldMarshalImg from "../assets/Army/Ranks/General_K._M._Cariappa.jpg";
import fieldMarshalInsignia from "../assets/Army/Ranks/Field_Marshal_of_the_Indian_Army.svg";
import fieldMarshalStars from "../assets/Army/Ranks/Star_insignia_of_Field_Marshal_(India).jpg";

import lieutenantGeneralInsignia from "../assets/Army/Ranks/Lieutenant_General_of_the_Indian_Army.svg";
import lieutenantGeneralStars from "../assets/Army/Ranks/BD_Army_Lieutenant_General_Star_Plate.svg";
import lieutenantGeneral from "../assets/Army/Ranks/Lieutenant_General_Yogesh_Kumar_Joshi_UYSM_AVSM_VrC_SM,_General_Officer-Commanding-in-Chief_Northern_Command,_Indian_Army.jpg";

import majorGeneralInsignia from "../assets/Army/Ranks/Major_General_of_the_Indian_Army.svg";
import majorGeneralStars from "../assets/Army/Ranks/BD_Army_Major_General_Star_Plate.svg";
import majorGeneral from "../assets/Army/Ranks/MajGen.jpg";

import General from "../assets/Army/Ranks/General_Upendra_Dwivedi,_PVSM,_AVSM_(2024).jpg";
import generalInsignia from "../assets/Army/Ranks/General_of_the_Indian_Army.svg"
import generalStars from "../assets/Army/Ranks/BD_Army_General_Star_Plate.svg"
import { generatePath } from "react-router-dom";

export const armyRanks = [
  {
    name: "Field Marshal",
    branch: "Indian Army",
    abbreviation: "FM",
    stars: "Five-star rank",
    higher: "—",
    lower: "General",
    equivalent: "Marshal of the Indian Air Force (IAF), Admiral of the fleet (Indian Navy)",
    description: "Field Marshal (Hindi: फ़ील्ड मार्शल, romanized: pheeld maarshal) is a five–star officer rank and the highest attainable in the Indian Army. Created in 1973, it exists as an ceremonial recognition, awarded exclusively to officers deemed to have rendered exceptional service during wartime.",
    insignia: fieldMarshalInsignia,
    starsImg: fieldMarshalStars,  
    officerImg: fieldMarshalImg
  },
  {
    name: "General",
    branch: "Indian Army",
    abbreviation: "Gen",
    stars: "Four-star rank",
    higher: "Field Marshal",
    lower: "Lieutenant General",
    equivalent: "	Admiral (Indian Navy), Air chief marshal (Indian Air Force)",
    description: "General is a four-star general officer rank in the Indian Army. It is the highest active rank in the Indian Army. General ranks above the three-star rank of lieutenant general and below the five-star rank of field marshal, which is largely a war-time or ceremonial rank.",
    insignia: generalInsignia,
    starsImg: generalStars,
    officerImg: General
  },
  {
    name: "Lieutenant general",
    branch: "Indian Army",
    abbreviation: "Lt Gen",
    stars: "Three-star rank",
    higher: "	General",
    lower: "Major General",
    equivalent: "	Vice admiral (Indian Navy), Air marshal (Indian Air Force)",
    description: "Lieutenant general is a three-star general officer rank in the Indian Army. It is the second-highest active rank in the Indian Army. Lieutenant generals rank above the two-star rank of Major General and below the four-star rank of General, which is held by the Chief of the Army Staff. The equivalent rank in the Indian Navy is Vice Admiral and in the Indian Air Force is Air Marshal.",
    insignia: lieutenantGeneralInsignia,
    starsImg: lieutenantGeneralStars,
    officerImg: lieutenantGeneral
  },
  {
    name: "Major general",
    branch: "Indian Army",
    abbreviation: "Maj Gen",
    stars: "Two-star rank",
    higher: "Lieutenant general",
    lower: "Brigadier",
    equivalent: "Rear admiral (Indian Navy), Air vice marshal (Indian Air Force)",
    description: "Major general is a two-star general officer rank in the Indian Army. It is the third-highest active rank in the Indian Army. A major general ranks above the one-star rank of brigadier and below the three-star rank of lieutenant general.",
    insignia: majorGeneralInsignia,
    starsImg: majorGeneralStars, 
    officerImg: majorGeneral
  }
];
