import React, { useEffect, useState } from "react";

const MentorshipsPage = () => {
  const [mentorships, setMentorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentorships = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/mentorships", {
          method: "GET",
          credentials: "include",
        });

        console.log("Raw response:", response); // Log the raw response for debugging

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch mentorships.");
        }

        const data = await response.json();
        console.log("Parsed data:", data); // Log the parsed data for debugging

        setMentorships(data.mentorships || []);
      } catch (error) {
        console.error("Error fetching mentorships:", error);
        setError(error.message || "Failed to fetch mentorship opportunities.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentorships();
  }, []);

  if (loading) {
    return <p>Loading mentorship opportunities...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mentorship Opportunities</h1>
      {mentorships.length === 0 ? (
        <p>No mentorship opportunities found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentorships.map((mentorship) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorshipsPage;
