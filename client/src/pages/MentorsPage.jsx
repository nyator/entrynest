import React, { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";

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
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto p-4">
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
