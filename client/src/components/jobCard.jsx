import React from "react";
import { formatDistanceToNow } from "date-fns";

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
  position,
  tags,
  onViewDetails,
  salaryRange,
}) => {
  const isValidDate = (date) => {
    return !isNaN(Date.parse(date));
  };

  const formatTimePosted = (date) => {
    if (!isValidDate(date)) return "NaN";
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      includeSeconds: true,
    })
      .replace("about ", "") // Remove "about" from the output
      .replace("hours", "hrs") // Replace "hours" with "hrs"
      .replace("minutes", "mins"); // Replace "minutes" with "mins"
  };

  return (
    <div
      className={`${cardBStyle} md:w-4/5 h-fit p-10 rounded-[35px] font-SatoshiRegular space-y-4 border-[1px] border-black/20`}
    >
      <div className="space-y-4 rounded-[25px] bg-primary/20 p-4 border-[1px] border-primaryStroke/50">
        <div className="flex justify-between items-center text-jobcard1 ">
          <div className={`${cardBStyle} rounded-full`}>{type || "NaN"}</div>
          <div className={`${cardBStyle} rounded-full`}>
            {`posted ${formatTimePosted(timePosted)}` || "NaN"}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="font-SatoshiMedium text-lg">
            {company || "Company's Name"}
          </h1>
          <img
            src={avatar || fr} // Use the avatar passed from the parent or fallback to placeholder
            alt="avatar"
            className="rounded-full w-[43px] h-[43px] object-cover ring-2 ring-black/20 "
          />
        </div>
        <div className="flex sm:flex-col md:flex-row o:flex-row items-start md:items-center justify-between md:gap-4  text-clampSm">
          <p className="flex items-center gap-1 text-black/40 text-nowrap">
            <HiLocationMarker />
            {location || "NaN"}
          </p>
          <p className="flex items-center gap-1 text-black/40 text-nowrap">
            <PiBuildingOfficeFill />
            {style || "NaN"}
          </p>
          <p className="flex items-center gap-1 text-black/40 text-nowrap">
            <RiCoinsFill />₵{salaryRange || "NaN"}
          </p>
        </div>
        <div>
          <h1 className="font-SatoshiMedium text-lg">{position || "NaN"}</h1>
        </div>
        <div className="w-full bg-black/40 h-[1.5px]"></div>
        <div className="flex flex-wrap gap-2">
          {tags && tags.length > 0 ? (
            <>
              <p className={`${cardTag} text-jobcard1 font-SatoshiRegular`}>
                {tags[0]}
              </p>
              {tags.length > 1 && (
                <p className="text-black/50 text-jobcard1 inline-flex items-center text-sm">
                  +{tags.length - 1} more
                </p>
              )}
            </>
          ) : (
            "No Tags"
          )}
        </div>
      </div>
      <div className="text-center weight-400 space-y-4">
        <h1>
          posted by <span>{postedBy || "NaN"}</span>
        </h1>
        <button
          className={`${cardButton} rounded-full`}
          onClick={onViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
