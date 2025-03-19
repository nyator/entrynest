import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/jobs/${jobId}`, {
          withCredentials: true // Ensure cookies are sent with the request
        });
        setJob(response.data.job);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    fetchJob();
  }, [jobId]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
      <p>{job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Tag:</strong> {job.tag}</p>
      <p><strong>Posted by:</strong> {job.postedBy.firstname} {job.postedBy.lastname}</p>
    </div>
  );
};

export default JobDetails;
