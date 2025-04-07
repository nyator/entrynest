import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const EmDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/jobs/employer/applications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in headers
          },
          withCredentials: true,
        });
        setApplications(response.data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to fetch applications");
      }
    };

    fetchApplications();
  }, []);

  const handleDownload = (cvUrl) => {
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = cvUrl.split("/").pop(); // Extract file name from URL
    link.click();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
      <Link
        to="/create-job"
        className="text-white bg-primary rounded-xl p-2 hover:bg-primary-dark"
      >
        Post a Job
      </Link>

      <h2 className="text-lg font-bold mt-4">Applications</h2>
      <p className="mb-4">
        Here are the applications you have received for your job postings.
      </p>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="border rounded p-4 shadow-md bg-white">
              <h2 className="text-lg font-bold">{app.user.firstname} {app.user.lastname}</h2>
              <p className="mb-2">
                <strong>Email:</strong> {app.user.email}
              </p>
              <p className="mb-2">
                <strong>Job Title:</strong> {app.jobTitle}
              </p>
              <p className="mb-2">
                <strong>Message:</strong> {app.message}
              </p>
              <button
                onClick={() => handleDownload(app.cvUrl)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Download CV
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmDashboard;
