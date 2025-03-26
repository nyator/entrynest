import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";

const EmployerProfilePage = () => {
  const { userId } = useParams(); // Get userId from URL
  const [profileData, setProfileData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/user/employers/${userId}`);
        setProfileData(response.data.employer);
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!profileData) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{profileData.firstname} {profileData.lastname} Profile</h1>
      <div className="w-full bg-gray/40 p-4 rounded border border-gray/20">
        <p>
          Name: {profileData.firstname} {profileData.lastname}
        </p>
        <p>Email: {profileData.email}</p>
        <p>Company Name: {profileData.companyName}</p>
        <p>Biography: {profileData.biography}</p>
        <p>Location: {profileData.location}</p>
        <p>Telephone Number: {profileData.telNumber}</p>
        <p>Skills: {profileData.skills.join(", ")}</p>
      </div>
      <h2 className="text-xl font-bold mt-6 mb-4">Jobs Posted</h2>
      <div className="w-full bg-gray/40 p-4 rounded border border-gray/20">
        {jobs.length > 0 ? (
          <ul>
            {jobs.map((job) => (
              <li key={job._id} className="mb-2">
                <div className="p-2 bg-white rounded shadow flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{job.title}</h3>
                    <p>{job.description}</p>
                    <p>Location: {job.location}</p>
                    <p>Salary Range: {job.salaryRange}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete Job
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs posted by this employer.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerProfilePage;
