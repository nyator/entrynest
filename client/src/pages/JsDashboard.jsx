import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import JobCard from "../components/jobCard.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";

import { HiOfficeBuilding } from "react-icons/hi";
import { TbLocationFilled } from "react-icons/tb";
import { IoMdPricetags } from "react-icons/io";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { MdOutlineArrowDropDown } from "react-icons/md";

import {
  jobTypes,
  locationOptions,
  jobStyles,
  jobCategory,
  salaryRanges,
} from "../constants/index";

import { noresults } from "../constants/assests.js";

const JsDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: "", location: "", tag: "" });
  const [dropdownOpen, setDropdownOpen] = useState({
    type: false,
    location: false,
    tag: false,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRefs = {
    type: useRef(null),
    location: useRef(null),
    tag: useRef(null),
  };

  const handleClickOutside = (event) => {
    Object.keys(dropdownRefs).forEach((key) => {
      if (
        dropdownRefs[key].current &&
        !dropdownRefs[key].current.contains(event.target)
      ) {
        setDropdownOpen((prev) => ({ ...prev, [key]: false }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/jobs", {
          withCredentials: true,
        });
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleViewDetails = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setDropdownOpen((prev) => ({ ...prev, [name]: false })); // Close dropdown after selection
  };

  const handleClearFilters = () => {
    setFilters({ type: "", location: "", tag: "" });
  };

  const query = new URLSearchParams(location.search);
  const selectedEmployer = query.get("employer");

  const filteredJobs = jobs
    .filter((job) => {
      return (
        (filters.type === "" || job.type === filters.type) &&
        (filters.location === "" || job.location === filters.location) &&
        (filters.tag === "" || job.tags.includes(filters.tag))
      );
    })
    .filter((job) =>
      selectedEmployer
        ? `${job.postedBy.firstname} ${job.postedBy.lastname}` ===
          selectedEmployer
        : true
    );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      {/* Horizontal Filter Bar */}
      <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-lg font-SatoshiRegular justify-center items-center">
        {/* Job Type Dropdown */}
        <label className="inline-flex items-center text-gray-700 font-medium gap-2">
          Filter by:
          <HiMiniArrowsUpDown />
        </label>
        <div className="relative" ref={dropdownRefs.type}>
          <button
            onClick={() =>
              setDropdownOpen((prev) => ({ ...prev, type: !prev.type }))
            }
            className="w-[200px] bg-white shadow-sm border border-gray gap-2 rounded-3xl px-4 py-2 text-start inline-flex items-center justify-between"
          >
            {filters.type || "Select Job Type"}
            <MdOutlineArrowDropDown className="size-5" />
          </button>
          {dropdownOpen.type && (
            <div className="absolute w-[200px] z-10 mt-2 text-start bg-white shadow-sm border border-gray gap-2 rounded-xl">
              {["All Job", ...jobTypes].map((type, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleFilterChange("type", type === "All Job" ? "" : type)
                  }
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location Dropdown */}
        <div className="relative" ref={dropdownRefs.location}>
          <button
            onClick={() =>
              setDropdownOpen((prev) => ({ ...prev, location: !prev.location }))
            }
            className="min-w-[200px] w-fit bg-white shadow-sm border border-gray gap-2 rounded-3xl px-4 py-2 text-start inline-flex items-center justify-between"
          >
            {filters.location || "Select Location"}
            <MdOutlineArrowDropDown className="size-5" />
          </button>
          {dropdownOpen.location && (
            <div className="absolute w-[200px] z-10 mt-2 text-start bg-white shadow-sm border border-gray gap-2 rounded-xl h-52 overflow-y-auto">
              {["All Locations", ...locationOptions].map((location, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleFilterChange(
                      "location",
                      location === "All Locations" ? "" : location
                    )
                  }
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tag Dropdown */}
        <div className="relative" ref={dropdownRefs.tag}>
          <button
            onClick={() =>
              setDropdownOpen((prev) => ({ ...prev, tag: !prev.tag }))
            }
            className="min-w-[200px] w-fit bg-white shadow-sm border border-gray gap-2 rounded-3xl px-4 py-2 text-start inline-flex items-center justify-between"
          >
            {filters.tag || "Select Category"}
            <MdOutlineArrowDropDown className="size-5" />
          </button>
          {dropdownOpen.tag && (
            <div className="absolute w-[200px] z-10 mt-2 text-start bg-white shadow-sm border border-gray gap-2 rounded-xl h-52 overflow-y-auto">
              {["All Category", ...jobCategory].map((tag, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleFilterChange("tag", tag === "All Category" ? "" : tag)
                  }
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={handleClearFilters}
          className="text-blue-600 hover:underline"
        >
          Clear All Filters
        </button>
      </div>

      <h1 className="text-2xl font-SatoshiMedium font-bold bg-gray/40 rounded-xl p-4 mb-4">
        {selectedEmployer ? selectedEmployer + "'s Jobs" : ""}
      </h1>

      {/* Job Cards or No Results Visualization */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-evenly items-center mb-20 gap-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              id={job._id}
              position={job.title}
              company={
                `${job.postedBy.firstname} ${job.postedBy.lastname}` || "NaN"
              }
              avatar={job.postedBy.avatar}
              location={job.location}
              tags={job.tags}
              type={job.type}
              style={job.style}
              responsibility={job.responsibility}
              qualification={job.qualification}
              aboutRole={job.aboutRole}
              timePosted={job.updatedAt || job.createdAt}
              postedBy={`${job.postedBy.firstname} ${job.postedBy.lastname}`}
              salaryRange={job.salaryRange}
              onViewDetails={() => handleViewDetails(job._id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center font-SatoshiMedium justify-center h-96">
          <img
            src={noresults} // Replace with your no results image path
            alt="No results found"
            className="w-36 h-36 mb-4"
          />
          <p className="text-gray-600 text-lg">
            No jobs match your filters. Try adjusting your search criteria.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-4 px-4 py-2 bg-primary/80 text-white rounded-lg hover:bg-primary transition-all ease-in-out duration-300 "
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default JsDashboard;
