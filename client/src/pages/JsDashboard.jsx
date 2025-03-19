import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const JsDashboard = () => {
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/jobs");
        setJobs(response.data.jobs);
        console.log("Jobs fetched successfully:", response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Opportunities</h1>
      <div className="space-y-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600 mt-2">{job.description}</p>
              <p className="text-gray-600 mt-2">{job.location}</p>
              <p className="text-gray-600 mt-2">{job.type}</p>
            </div>
          ))
        ) : (
          <p>No job opportunities available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default JsDashboard;
