import marshalInsignia from "../assets/AirForce/Ranks/1.1.svg";
import marshalStars from "../assets/AirForce/Ranks/1.2.svg";
import marshal from "../assets/AirForce/Ranks/1.3.jpg";

import airChiefMarshalInsignia from "../assets/AirForce/Ranks/2.1.svg";
import airChiefMarshalStars from "../assets/AirForce/Ranks/2.2.svg";
import airChiefMarshal from "../assets/AirForce/Ranks/2.3.jpg";

import airMarshalInsignia from "../assets/AirForce/Ranks/3.1.svg";
import airMarshalStars from "../assets/AirForce/Ranks/3.2.svg";
import airMarshal from "../assets/AirForce/Ranks/3.3.jpg";

import AirViceMarshalInsignia from "../assets/AirForce/Ranks/4.1.svg";
import AirViceMarshalStars from "../assets/AirForce/Ranks/4.2.svg"
import AirViceMarshal from "../assets/AirForce/Ranks/4.3.jpg"

import { generatePath } from "react-router-dom";

export const airForceRanks = [
  {
    name: "Marshal of the Air Force",
    branch: "Indian Air Force",
    abbreviation: "MIAF",
    stars: "Five-star rank",
    higher: "--",
    lower: "Air Chief Marshal",
    equivalent: "	Field Marshal (Indian Army), Admiral of the fleet (Indian Navy)",
    description: "Marshal of the Air Force (MIAF) is a five star rank and the highest attainable rank in the Indian Air Force. It is a ceremonial or wartime rank, having been awarded only once.",
    insignia: marshalInsignia,
    starsImg: marshalStars,  
    officerImg: marshal
  },
  {
    name: "Air Chief Marshal",
    branch: "Indian Air Force",
    abbreviation: "ACM",
    stars: "Three-star rank",
    higher: "Marshal of the Indian Air Force",
    lower: "Air marshal",
    equivalent: "General (Army), Admiral (Navy)",
    description: "Air chief marshal is a four-star air officer rank in the Indian Air Force. It is the highest active rank in the Indian Air Force. Air chief marshal ranks above the three-star rank of air marshal and below the five-star rank of Marshal of the Indian Air Force, which is largely a war-time or ceremonial rank.",
    insignia: airChiefMarshalInsignia,
    starsImg: airChiefMarshalStars,
    officerImg: airChiefMarshal
  },
  {
    name: "Air Marshal",
    branch: "Indian Air Force",
    abbreviation: "AM",
    stars: "Three-star rank",
    higher: "Air chief marshal",
    lower: "Air vice marshal",
    equivalent: "	Lieutenant general (Indian Army), Vice admiral (Indian Navy)",
    description: "Air marshal is a three-star air officer rank in the Indian Air Force. It is the second-highest active rank in the Indian Air Force. Air marshal ranks above the two-star rank of air vice marshal and below the four-star rank of air chief marshal, which is held by the Chief of the Air Staff.",
    insignia: airMarshalInsignia,
    starsImg: airMarshalStars,
    officerImg: airMarshal
  },
  {
    name: "Air Vice Marshal",
    branch: "Indian Air Force",
    abbreviation: "AVM",
    stars: "Two-star rank",
    higher: "Air marshal",
    lower: "Air commodore",
    equivalent: "Major general (Indian Army), Rear admiral (Indian Navy)",
    description: "Air vice marshal is a two-star air officer rank in the Indian Air Force. It is the third-highest active rank in the Indian Air Force. Air vice marshal ranks above the one-star rank of air AirViceMarshal and below the three-star rank of air marshal.",
    insignia: AirViceMarshalInsignia,
    starsImg: AirViceMarshalStars, 
    officerImg: AirViceMarshal
  }
];
