import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import JobCard from "../components/jobCard.jsx";

const JsDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/jobs", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleViewDetails = (jobId) => {
    navigate(`/jobs/${jobId}`); // Ensure the URL matches the route for job details
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Seeker Dashboard</h1>
      <div className="grid grid-cols-3 justify-between space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            id={job._id}
            position={job.title}
            company={`${job.postedBy.firstname} ${job.postedBy.lastname}` || "NaN"} // Pass the name of the person who posted the job
            avatar={job.postedBy.avatar} // Pass the avatar of the person who posted the job
            location={job.location}
            tag={job.tag}
            type={job.type}
            style={job.style}
            description={job.description}
            timePosted={job.updatedAt || job.createdAt} // Pass the createdAt field
            postedBy={`${job.postedBy.firstname} ${job.postedBy.lastname}` } // Pass the first & last name of the person who posted the job
            salaryRange={job.salaryRange}
            onViewDetails={() => handleViewDetails(job._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default JsDashboard;
