import React, { useEffect, useState, useRef } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import CustomDropdownV2 from "../components/CustomDropdownV2";

import { IoSearch } from "react-icons/io5";
import { HiMiniArrowsUpDown } from "react-icons/hi2";

const MentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ expertise: "", location: "" });
  const [dropdownOpen, setDropdownOpen] = useState({
    expertise: false,
    location: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const dropdownRefs = {
    expertise: useRef(null),
    location: useRef(null),
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
    // Fetch mentors from the backend
    fetch("http://localhost:3000/api/mentors")
      .then((response) => response.json())
      .then((data) => {
        setMentors(data.mentors);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching mentors:", error);
        setLoading(false);
      });
  }, []);

  const handleMentorClick = (mentorId) => {
    navigate(`/mentor-profile/${mentorId}`);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setDropdownOpen((prev) => ({ ...prev, [name]: false }));
  };

  const handleClearFilters = () => {
    setFilters({ expertise: "", location: "" });
    setSearchTerm("");
    setSearchQuery("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const filteredMentors = mentors.filter((mentor) => {
    return (
      (filters.expertise === "" || mentor.expertise === filters.expertise) &&
      (filters.location === "" || mentor.location === filters.location) &&
      (searchQuery === "" ||
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <div className="mb-4 flex justify-center bg-africanBackground6 py-10 md:py-20 gap-2 rounded-lg font-SatoshiRegular relative">
        <div className="relative w-full max-w-80">
          <input
            type="text"
            placeholder="Search mentors by name or expertise..."
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

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-lg font-SatoshiRegular justify-center items-center mb-4">
        <label className="inline-flex items-center text-gray-700 font-medium gap-2">
          Filter by:
          <HiMiniArrowsUpDown />
        </label>
        
        <CustomDropdownV2
          options={["All Expertise", "Software Development", "Product Management", "Data Science", "UI/UX Design"]}
          value={filters.expertise || "Select Expertise"}
          onChange={(value) =>
            handleFilterChange("expertise", value === "All Expertise" ? "" : value)
          }
          placeholder="Select Expertise"
          classNameButton="min-w-[200px] w-fit bg-white shadow-sm border border-gray gap-2"
          classNameDrop="hover:bg-blue-100"
        />

        <CustomDropdownV2
          options={["All Locations", "Remote", "Lagos", "Abuja", "Port Harcourt"]}
          value={filters.location || "Select Location"}
          onChange={(value) =>
            handleFilterChange("location", value === "All Locations" ? "" : value)
          }
          placeholder="Select Location"
          classNameButton="min-w-[200px] w-fit bg-white shadow-sm border border-gray gap-2"
          classNameDrop="hover:bg-blue-100"
        />

        <button
          onClick={handleClearFilters}
          className="text-blue-600 hover:underline"
        >
          Clear All Filters
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Mentors</h1>
      {searchQuery && (
        <p className="text-lg font-SatoshiRegular mb-4">
          {filteredMentors.length} mentor{filteredMentors.length !== 1 ? "s" : ""} found
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="shadow-lg p-4 rounded-xl hover:ring-2 ring-primary transition-all"
          >
            <div className="flex items-center space-x-4">
              <img
                src={mentor.avatar || "/default-avatar.png"}
                alt="mentor avatar"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="font-bold">{mentor.name}</p>
                <p className="text-sm text-gray-600">{mentor.expertise}</p>
              </div>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-primary text-white rounded"
              onClick={() => handleMentorClick(mentor.id)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorsPage;
