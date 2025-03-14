import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { input, button } from "../constants/styles";

const EmployerDashboard = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting job:", {
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
    });
    try {
      const response = await axios.post("/api/jobs", {
        title: jobTitle,
        description: jobDescription,
        location: jobLocation,
        type: jobType,
      });
      toast.success("Job posted successfully!");
      setJobTitle("");
      setJobDescription("");
      setJobLocation("");
      setJobType("");
      console.log("Job posted successfully:", response.data.job);
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job.");
    }
  };

  console.log("EmployerDashboard rendered");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex ">
          <div className="w-full mr-4">
            <div className="mb-4">
              <label className="block text-gray-700">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className={`${input}`}
                placeholder="Job Title"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                className={`${input}`}
                placeholder="Location"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className={`${input}`}
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700">Tags</label>
              <select
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className={`${input}`}
                required
              >
                <option value="">Select Job Tags</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className={`${input}`}
                placeholder="Country"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className={`${input}`}
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className={`${button}`}>
          Post Job
        </button>
      </form>
    </div>
  );
};

export default EmployerDashboard;
