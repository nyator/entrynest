import React from "react";

import { fr } from "../constants/assests";
import { cardButton, cardBStyle, cardTag } from "../constants/styles";

import { HiLocationMarker } from "react-icons/hi";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { RiCoinsFill } from "react-icons/ri";

const JobCard = ({
  type,
  timePosted,
  company,
  postedBy,
  avatar,
  location,
  style,
  salary,
  position,
  tag,
  onClick,
}) => {
  return (
    <div
      className={`${cardBStyle} w-fit h-fit p-10 rounded-[35px] font-SatoshiRegular space-y-4`}
    >
      <div className="space-y-4 rounded-[25px] bg-red-200 p-4 ">
        <div className="flex justify-between items-center">
          <div className={`${cardBStyle}`}>{type || "Internship"}</div>
          <div className={`${cardBStyle}`}>
            {timePosted || "Posted one month ago"}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="font-SatoshiMedium text-lg">
            {company || "Company's Name"}
          </h1>
          <img
            src={avatar || fr}
            alt="avatar"
            className="rounded-full w-[43px] h-[43px] ring-2 ring-black/20 "
          />
        </div>
        <div className="flex justify-between gap-4 items-center">
          <p className="flex items-center gap-1 text-black/40">
            <HiLocationMarker />
            {location || "Greater Accra Region"}
          </p>
          <p className="flex items-center gap-1 text-black/40">
            <PiBuildingOfficeFill />
            {style || "On-site"}
          </p>
          <p className="flex items-center gap-1 text-black/40">
            <RiCoinsFill />
            {salary || "confidential"}
          </p>
        </div>
        <div>
          <h1 className="font-SatoshiMedium text-lg">
            {position || "Position"}
          </h1>
        </div>
        <div className="w-full bg-black/40 h-[1.5px]"></div>
        <div>
          <p className={`${cardTag}`}>{tag || "Sales & Marketing"}</p>
        </div>
      </div>
      <div className="text-center weight-400 space-y-4">
        <h1>
          posted by <span>{postedBy || "entrynest 3rd party"}</span>
        </h1>
        <button className={`${cardButton} rounded-full`} onClick={onClick}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
