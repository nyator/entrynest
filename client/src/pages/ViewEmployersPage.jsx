import React, { useEffect, useState } from "react";
import { cardButton } from "../constants/styles";

import { fr } from "../constants/assests";
import LoadingScreen from "../components/LoadingScreen"; // Import LoadingScreen component
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ViewEmployersPage = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch employers who have posted jobs
    fetch("http://localhost:3000/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        const employerNames = data.jobs.map(
          (job) => `${job.postedBy.firstname} ${job.postedBy.lastname}`
        );
        setEmployers([...new Set(employerNames)]); // Remove duplicates
        setLoading(false); // Set loading to false after fetching employers
      })
      .catch((error) => {
        console.error("Error fetching employers:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const handleEmployerClick = (employer) => {
    navigate(`/jobs?employer=${encodeURIComponent(employer)}`);
  };

  if (loading) {
    return <LoadingScreen />; // Display loading screen while fetching jobs
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">
          Employers Who Have Posted Jobs
        </h1>
        <ul>
          {employers.map((employer, index) => (
            <div
              key={index}
              className={`shadow-lg p-4 mb-4 w-1/4 rounded-xl space-y-4 hover:ring-[1.5px] ring-primary/10`}
            >
              <div className="flex space-x-5 justify-center items-center ">
                <img
                  src={fr}
                  alt="avatar"
                  className="rounded-full w-[63px] h-[63px] ring-1 ring-black/20"
                />

                <div>
                  <p className="uppercase font-bold ">{employer}</p>
                  <p className="font-SatoshiRegular">Industry</p>
                  <p className="font-SatoshiRegular">Nö Jobs Posted</p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  className={`${cardButton} bg-primary/90 hover:bg-primary rounded-full`}
                  onClick={() => handleEmployerClick(employer)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewEmployersPage;
