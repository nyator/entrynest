import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import CustomDropdownV2 from "../components/CustomDropdownV2.jsx";
import { noresults } from "../constants/assests.js";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen.jsx";
import { skillsList } from "../constants/index.js";
import Spinner from "../elements/Spinner"; // Import Spinner component

const MentorshipsPage = () => {
  const [mentorships, setMentorships] = useState([]);
  const [filteredMentorships, setFilteredMentorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All Skills");
  const [loadingMentorshipId, setLoadingMentorshipId] = useState(null); // Track loading state for specific mentorship

  useEffect(() => {
    const fetchMentorships = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/mentorships", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch mentorships.");
        }

        const data = await response.json();
        setMentorships(data.mentorships || []);
        setFilteredMentorships(data.mentorships || []);
      } catch (error) {
        console.error("Error fetching mentorships:", error);
        setError(error.message || "Failed to fetch mentorship opportunities.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentorships();
  }, []);

  const filterMentorships = (term, skill) => {
    let filtered = mentorships;

    if (term) {
      filtered = filtered.filter(
        (mentorship) =>
          mentorship.title.toLowerCase().includes(term) ||
          mentorship.description.toLowerCase().includes(term)
      );
    }

    if (skill !== "All Skills") {
      filtered = filtered.filter((mentorship) =>
        mentorship.skillsRequired.includes(skill)
      );
    }

    setFilteredMentorships(filtered);
  };

  const handleApply = async (mentorshipId) => {
    setLoadingMentorshipId(mentorshipId); // Set loading state for the specific mentorship
    try {
      const response = await fetch(
        `http://localhost:3000/api/mentorships/${mentorshipId}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 401) {
          toast.error("Your session has expired. Please log in again.");
          return;
        }
        throw new Error(data.message || "Failed to apply for mentorship");
      }
      toast.success("Application submitted successfully!");

      // Simulate the current user ID for testing purposes
      const currentUserId = "currentUserId";

      // Update the mentorships state to reflect the applied status
      setMentorships((prevMentorships) =>
        prevMentorships.map((mentorship) =>
          mentorship._id === mentorshipId
            ? {
                ...mentorship,
                applicants: mentorship.applicants
                  ? [...mentorship.applicants, { _id: currentUserId }]
                  : [{ _id: currentUserId }],
              }
            : mentorship
        )
      );

      // Update the filteredMentorships state to reflect the applied status
      setFilteredMentorships((prevFiltered) =>
        prevFiltered.map((mentorship) =>
          mentorship._id === mentorshipId
            ? {
                ...mentorship,
                applicants: mentorship.applicants
                  ? [...mentorship.applicants, { _id: currentUserId }]
                  : [{ _id: currentUserId }],
              }
            : mentorship
        )
      );
    } catch (error) {
      console.error("Error applying for mentorship:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to apply for mentorship"
      );
    } finally {
      setLoadingMentorshipId(null); // Reset loading state
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingScreen />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-4 flex justify-center bg-africanBackground6 py-10 md:py-20 gap-2 rounded-lg font-SatoshiRegular relative">
        <div className="relative w-full max-w-80">
          <input
            type="text"
            placeholder="Search mentorships by title or description..."
            value={searchTerm}
            onChange={(e) => {
              const term = e.target.value.toLowerCase();
              setSearchTerm(term);
              filterMentorships(term, selectedSkill);
            }}
            className="w-full border border-gray rounded-full p-4 h-14 pr-16"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-all">
            <IoSearch className="text-xl" />
          </button>
        </div>
      </div>

      {/* Horizontal Filter Bar */}
      <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-lg font-SatoshiRegular justify-center items-center">
        <label className="inline-flex items-center text-gray-700 font-medium gap-2">
          Filter by:
        </label>
        <CustomDropdownV2
          options={skillsList}
          value={selectedSkill}
          onChange={(skill) => {
            setSelectedSkill(skill);
            filterMentorships(searchTerm, skill);
          }}
          placeholder="Select Skill"
          classNameButton="min-w-[200px] w-fit bg-white shadow-sm border border-gray gap-2"
          classNameDrop="hover:bg-blue-100"
        />
      </div>

      {/* Mentorship Cards or No Results Visualization */}
      {filteredMentorships.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentorships.map((mentorship) => (
            <div
              key={mentorship._id}
              className="group relative bg-white rounded-2xl overflow-hidden"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative p-5">
                {/* Top Section */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                      {mentorship.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary/20" />
                    <span className="text-xs text-gray-500">
                      {mentorship.currentApplicants}/{mentorship.maxApplicants}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-4 group-hover:text-gray-700 transition-colors">
                  {mentorship.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentorship.skillsRequired.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-full text-xs group-hover:bg-primary/5 group-hover:text-primary transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between pt-3 border-t border-gray/10">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-3.5 h-3.5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-xs text-gray-500">
                      {mentorship.duration}
                    </span>
                  </div>
                  {mentorship.currentApplicants >= mentorship.maxApplicants ? (
                    <button
                      disabled
                      className="text-xs px-6 py-3 rounded-full bg-gray-50 text-grayStroke border border-gray-200 flex items-center"
                    >
                      Closed
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApply(mentorship._id)}
                      className="text-xs w-[5.5rem] h-[3rem] rounded-full bg-primary/5 text-primary border text-center justify-center border-primary/20 hover:bg-primary hover:text-white transition-all flex items-center group-hover:shadow-sm"
                      disabled={loadingMentorshipId === mentorship._id} // Disable button while loading
                    >
                      {loadingMentorshipId === mentorship._id ? (
                        <Spinner />
                      ) : (
                        "Apply"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <div className="relative w-32 h-32 mb-4">
            <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse" />
            <img
              src={noresults}
              alt="No results found"
              className="relative w-full h-full opacity-50"
            />
          </div>
          <p className="text-gray-500 text-sm text-center max-w-xs mb-2">
            No mentorships match your filters
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedSkill("All Skills");
              setFilteredMentorships(mentorships);
            }}
            className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MentorshipsPage;
