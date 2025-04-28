import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import CustomDropdownV2 from "../components/CustomDropdownV2.jsx";
import { noresults } from "../constants/assests.js";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen.jsx";

const MentorshipsPage = () => {
  const [mentorships, setMentorships] = useState([]);
  const [filteredMentorships, setFilteredMentorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All Skills");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/me", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterMentorships(term, selectedSkill);
  };

  const handleSkillFilterChange = (skill) => {
    setSelectedSkill(skill);
    filterMentorships(searchTerm, skill);
  };

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

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please log in again.");
          return;
        }
        throw new Error(data.message || "Failed to apply for mentorship");
      }

      toast.success("Application submitted successfully!");
      // Refresh the mentorships list to update the application status
      const updatedResponse = await fetch("http://localhost:3000/api/mentorships", {
        method: "GET",
        credentials: "include",
      });
      const updatedData = await updatedResponse.json();
      setMentorships(updatedData.mentorships || []);
      setFilteredMentorships(updatedData.mentorships || []);
    } catch (error) {
      console.error("Error applying for mentorship:", error);
      toast.error(error.message || "Failed to apply for mentorship");
    }
  };

  const hasApplied = (mentorship) => {
    if (!currentUser) return false;
    return mentorship.applicants.some(applicant => applicant._id === currentUser._id);
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
            onChange={handleSearchChange}
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
          options={[
            "All Skills",
            "JavaScript",
            "Python",
            "React",
            "Node.js",
            "Design",
          ]}
          value={selectedSkill}
          onChange={(value) => handleSkillFilterChange(value)}
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
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-gray-500">
                      {mentorship.duration}
                    </span>
                  </div>
                  {hasApplied(mentorship) ? (
                    <button
                      disabled
                      className="text-xs px-3 py-1.5 rounded-full bg-gray-50 text-gray-400 border border-gray-200 flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                      </svg>
                      Applied
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApply(mentorship._id)}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all flex items-center gap-1.5 group-hover:shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Apply
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
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MentorshipsPage;