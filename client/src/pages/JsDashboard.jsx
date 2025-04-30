import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import JobCard from "../components/jobCard.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import CustomDropdownV2 from "../components/CustomDropdownV2.jsx";

import { HiOfficeBuilding } from "react-icons/hi";
import { TbLocationFilled } from "react-icons/tb";
import { IoMdPricetags } from "react-icons/io";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

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
  const [searchTerm, setSearchTerm] = useState(""); // Add search term state
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state
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
    setSearchTerm(""); // Clear search term
    setSearchQuery(""); // Clear search query
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  const handleSearch = () => {
    setSearchQuery(searchTerm); // Set the search query when the search button is clicked
  };

  const query = new URLSearchParams(location.search);
  const selectedEmployer = query.get("employer");

  const filteredJobs = jobs
    .filter((job) => {
      return (
        (filters.type === "" || job.type === filters.type) &&
        (filters.location === "" || job.location === filters.location) &&
        (filters.tag === "" || job.tags.includes(filters.tag)) &&
        (searchQuery === "" ||
          job.title.toLowerCase().includes(searchQuery.toLowerCase())) // Filter by search query
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
      {/* Search Bar */}
      <div className="mb-4 flex justify-center bg-africanBackground2 py-10 md:py-20 gap-2 rounded-lg font-SatoshiRegular relative">
        <div className="relative w-full max-w-80">
          <input
            type="text"
            placeholder="Search jobs by title..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border border-gray rounded-full p-4 h-14 pr-16"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-all"
          >
            <IoSearch className="text-xl" />
          </button>
        </div>
      </div>

      {/* Horizontal Filter Bar */}
      <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-lg font-SatoshiRegular justify-center items-center">
        {/* Job Type Dropdown */}
        <label className="inline-flex items-center text-gray-700 font-medium gap-2">
          Filter by:
          <HiMiniArrowsUpDown />
        </label>
        <CustomDropdownV2
          options={["All Job", ...jobTypes]}
          value={filters.type || "Select Job Type"}
          onChange={(value) =>
            handleFilterChange("type", value === "All Job" ? "" : value)
          }
          placeholder="Select Job Type"
          classNameButton="min-w-[200px] w-fit bg-white shadow-sm border border-gray gap-2"
          classNameDrop="hover:bg-blue-100"
        />

        {/* Location Dropdown */}
        <CustomDropdownV2
          options={["All Locations", ...locationOptions]}
          value={filters.location || "Select Location"}
          onChange={(value) =>
            handleFilterChange(
              "location",
              value === "All Locations" ? "" : value
            )
          }
          placeholder="Select Location"
          classNameButton="min-w-[200px] w-fit bg-white shadow-sm border border-gray gap-2"
          classNameDrop="hover:bg-blue-100"
        />

        {/* Tag Dropdown */}
        <CustomDropdownV2
          options={["All Category", ...jobCategory]}
          value={filters.tag || "Select Category"}
          onChange={(value) =>
            handleFilterChange("tag", value === "All Category" ? "" : value)
          }
          placeholder="Select Category"
          classNameButton="min-w-[200px] w-fit bg-white shadow-sm border border-gray gap-2"
          classNameDrop="hover:bg-blue-100"
        />

        {/* Clear Filters Button */}
        <button
          onClick={handleClearFilters}
          className="text-blue-600 hover:underline"
        >
          Clear All Filters
        </button>
      </div>

      <h1 className="text-2xl font-SatoshiBold bg-gray/40 rounded-xl p-4 mb-4 ">
        {selectedEmployer ? "Jobs by: " + selectedEmployer : ""}
      </h1>

      {/* Job Count */}
      {searchQuery && (
        <p className="text-lg font-SatoshiRegular mb-4">
          {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Job Cards or No Results Visualization */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between items-center mb-20 gap-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              id={job._id}
              position={job.title}
              company={
                job.companyName ||
                `${job.postedBy.firstname} ${job.postedBy.lastname}` ||
                "NaN"
              }
              avatar={job.postedBy.avatar || null} // Use the avatar directly from the API response
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
            className="mt-4 px-4 py-2 hover:bg-primary/80 text-white rounded-lg bg-primary transition-all ease-in-out duration-300 "
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default JsDashboard;
