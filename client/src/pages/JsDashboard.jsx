import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import JobCard from "../components/jobCard.jsx"

const JsDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/jobs', {
          withCredentials: true // Ensure cookies are sent with the request
        });
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleViewDetails = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <JobCard />
      <h1 className="text-2xl font-bold mb-4">Job Seeker Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => handleViewDetails(job._id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JsDashboard;
