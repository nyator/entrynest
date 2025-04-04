import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { input, button } from "../constants/styles";
import { Link } from "react-router";

const EmDashboard = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Doe",
      message: "I am very interested in this position.",
      cv: "john_doe_cv.pdf",
    },
    {
      id: 2,
      name: "Jane Smith",
      message: "Looking forward to contributing to your team.",
      cv: "jane_smith_cv.pdf",
    },
  ]);

  const handleDownload = (cv) => {
    // Simulate downloading the CV
    console.log("Downloading CV:", cv);
    alert(`Downloading ${cv}`);
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
      <p className="mb-4">
        You can view the details of each application and download the CVs.
      </p>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="border rounded p-4 shadow-md bg-white">
              <h2 className="text-lg font-bold">{app.name}</h2>
              <p className="mb-2">
                <strong>Message:</strong> {app.message}
              </p>
              <button
                onClick={() => handleDownload(app.cv)}
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
