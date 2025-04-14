import React, { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";

import { IoSearch } from "react-icons/io5";

const MentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    navigate(`/mentor-profile/${mentorId}`); // Navigate to mentor profile page
  };

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
            placeholder="Search mentors by industry..."
            //  value={searchTerm}
            //  onChange={handleSearchChange}
            className="w-full border border-gray rounded-full p-4 h-14 pr-16"
          />
          <button
            //  onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-all"
          >
            <IoSearch className="text-xl" />
          </button>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">Mentors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
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
