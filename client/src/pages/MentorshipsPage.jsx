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
  const [selectedSkill, setSelectedSkill] = useState("all");

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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "No applicants found.") {
          toast.info("No applicants yet. Be the first to apply!");
        } else {
          throw new Error(errorData.message || "Failed to apply for mentorship.");
        }
        return;
      }

      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error applying for mentorship:", error);
      toast.error(error.message || "Failed to apply for mentorship.");
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
          value={selectedSkill || "Select Skill"}
          onChange={(value) =>
            // handleSkillFilterChange(value === "All Skills" ? "" : value)
            handleSkillFilterChange(value === "All Skills" ? "" : value)
            ("tag", value === "All Category" ? "" : value)
          }
          placeholder="Select Skill"
          classNameButton="min-w-[200px] w-fit bg-white shadow-sm border border-gray gap-2"
          classNameDrop="hover:bg-blue-100"
        />
      </div>

      <h1 className="text-2xl font-SatoshiBold bg-gray/40 rounded-xl p-4 mb-4 ">
        {/* {selectedEmployer ? "Jobs by: " + selectedEmployer : ""} */}
      </h1>

      {/* Mentorship Cards or No Results Visualization */}
      {filteredMentorships.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between items-center mb-20 gap-4">
          {filteredMentorships.map((mentorship) => (
            <div
              key={mentorship._id}
              className="shadow-lg p-4 rounded-xl hover:ring-2 ring-primary transition-all"
            >
              <h2 className="text-lg font-bold">{mentorship.title}</h2>
              <p className="text-sm text-gray-600">{mentorship.description}</p>
              <p className="text-sm text-gray-600">
                <strong>Skills Required:</strong>{" "}
                {mentorship.skillsRequired.join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Duration:</strong> {mentorship.duration}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Applicants:</strong> {mentorship.currentApplicants}/
                {mentorship.maxApplicants}
              </p>
              {/* <button
                onClick={() => handleApply(mentorship._id)}
                className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-all"
              >
                Apply
              </button> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center font-SatoshiMedium justify-center h-96">
          <img
            src={noresults}
            alt="No results found"
            className="w-36 h-36 mb-4"
          />
          <p className="text-gray-600 text-lg">
            No mentorships match your filters. Try adjusting your search
            criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedSkill("all");
              setFilteredMentorships(mentorships);
            }}
            className="mt-4 px-4 py-2 hover:bg-primary/80 text-white rounded-lg bg-primary transition-all ease-in-out duration-300"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MentorshipsPage;
