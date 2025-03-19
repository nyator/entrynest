import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

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

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Seeker Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{job.title}</h2>
            
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => handleViewDetails(job)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      {selectedJob && (
        <div className="mt-4 p-4 border rounded shadow">
          <h2 className="text-xl font-bold">{selectedJob.title}</h2>
          <p>{selectedJob.description}</p>
          <p><strong>Location:</strong> {selectedJob.location}</p>
          <p><strong>Type:</strong> {selectedJob.type}</p>
          <p><strong>Tag:</strong> {selectedJob.tag}</p>
          <p><strong>Posted by:</strong> {selectedJob.postedBy.firstname} {selectedJob.postedBy.lastname}</p>
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => setSelectedJob(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default JobSeekerDashboard;
