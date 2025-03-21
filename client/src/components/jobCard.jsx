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
                   onViewDetails,
    id,
}) => {
  return (
    <div
      className={`${cardBStyle} w-fit h-fit p-10 rounded-[35px] font-SatoshiRegular space-y-4`}
      id={id}
    >
      <div className="space-y-4 rounded-[25px] bg-red-200 p-4 ">
        <div className="flex justify-between items-center">
          <div className={`${cardBStyle} rounded-full`}>{type || "Internship"}</div>
          <div className={`${cardBStyle} rounded-full`}>
            {new Date(timePosted).toLocaleDateString() || "Posted one month ago"}
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
        <button className={`${cardButton} rounded-full`} onClick={onViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

import PropTypes from "prop-types";

JobCard.propTypes = {
  type: PropTypes.string,
  timePosted: PropTypes.string,
  company: PropTypes.string,
  postedBy: PropTypes.string,
  avatar: PropTypes.string,
  location: PropTypes.string,
  style: PropTypes.string,
  salary: PropTypes.string,
  position: PropTypes.string,
  tag: PropTypes.string,
  onViewDetails: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default JobCard;

