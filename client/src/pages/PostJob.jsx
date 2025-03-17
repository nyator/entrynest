import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { input, button } from "../constants/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { IoMdArrowRoundBack } from "react-icons/io";

const PostJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobStyle, setJobStyle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobTag, setJobTag] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting job:", {
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      jobTag,
    });
    try {
      const response = await axios.post("/api/jobs", {
        title: jobTitle,
        description: jobDescription,
        location: jobLocation,
        type: jobType,
        Tag: jobTag,
      });
      toast.success("Job posted successfully!");
      setJobTitle("");
      setJobDescription("");
      setJobLocation("");
      setJobType("");
      setJobTag("");
      console.log("Job posted successfully:", response.data.job);
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job.");
    }
  };

  const handleClear = () => {
    setJobTitle("");
    setJobStyle("");
    setJobLocation("");
    setJobType("");
    setJobTag("");
    setJobDescription("");
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 ">Employer Dashboard</h1>
      <IoMdArrowRoundBack
        className="mb-4 cursor-pointer"
        onClick={() => navigate(-1)}
      />

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
              <select
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                className={`${input}`}
                required
              >
                <option value="">Select Job Location </option>
                <option value="Greater Accra Region">
                  Greater Accra Region
                </option>
                <option value="Ashanti Region">Ashanti Region </option>
                <option value="Central Region">Central Region </option>
                <option value="Eastern Region">Eastern Region </option>
                <option value="Brong Ahafo Region">Brong Ahafo Region </option>
                <option value="NorthernRegion">NorthernRegion </option>
                <option value="Upper East Region">Upper East Region </option>
                <option value="Upper West Region">Upper West Region </option>
                <option value="Western North Region">
                  Western North Region
                </option>
                <option value="North East Region">North East Region </option>
                <option value="Oti Region">Oti Region </option>
                <option value="Bono East Region">Bono East Region </option>
                <option value="Ahafo Region">Ahafo Region </option>
                <option value="Savannah Region">Savannah Region </option>
                <option value="Volta Region">Volta Region </option>
                <option value="Western Region">Western Region </option>
                <option value="Worldwide">Worldwide </option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Work Style</label>
              <select
                value={jobStyle}
                onChange={(e) => setJobStyle(e.target.value)}
                className={`${input}`}
                required
              >
                <option value="">Select Job Location</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
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
                <option value="Internship">Internship</option>
                <option value="Mentorship">Mentorship</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
          </div>

          <div className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700">Tag</label>
              <select
                value={jobTag}
                onChange={(e) => setJobTag(e.target.value)}
                className={`${input}`}
                required

              >
                <option value="">Select a Tag</option>
                <option value="Sales & Marketing">Sales & Marketing</option>
                <option value="Aerospace">Aerospace</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Development & IT">Development & IT</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Finance & Accounting">
                  Finance & Accounting
                </option>
              </select>
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
        <div className="flex space-x-3">
          <button type="submit" className={`${button}`}>
            Post Job
          </button>
          <button
            type="button"
            className={`font-normal text-primary`}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
