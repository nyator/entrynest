import React, { useEffect, useState } from "react";
import { cardBStyle } from "../constants/styles";
import { fr } from "../constants/assests";

const ViewEmployersPage = () => {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    // Fetch employers who have posted jobs
    fetch("http://localhost:3000/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        const employerNames = data.jobs.map(
          (job) => `${job.postedBy.firstname} ${job.postedBy.lastname}`
        );
        setEmployers([...new Set(employerNames)]); // Remove duplicates
      })
      .catch((error) => console.error("Error fetching employers:", error));
  }, []);

  return (
    <div>
      <h1>Employers Who Have Posted Jobs</h1>
      <ul>
        {employers.map((employer, index) => (
          <div
            key={index}
            className={`${cardBStyle}bg-primary/20 p-4 mb-4 w-1/3 rounded-xl`}
          >
            <div className="flex justify-between items-center">
              <li>{employer}</li>
              <img
                src={fr}
                alt="avatar"
                className="rounded-full w-[43px] h-[43px] ring-2 ring-black/20 "
              />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ViewEmployersPage;
