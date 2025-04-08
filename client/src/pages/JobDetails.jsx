import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { IoLocationOutline } from "react-icons/io5";
import { BsFilePersonFill } from "react-icons/bs";
import { LiaIndustrySolid } from "react-icons/lia";


const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const [cv, setCv] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/jobs/${jobId}`, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setJob(response.data.job);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!cv) {
      alert("Please upload your CV.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", cv);
    formData.append("message", message);

    try {
      await axios.post(`/jobs/${jobId}/apply`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is sent
        },
        withCredentials: true,
      });
      alert("Your application has been submitted!");
      navigate(-1); // Redirect to the previous page after submission
    } catch (error) {
      console.error("Error submitting application:", error);
      const errorMessage = error.response?.data?.message || "Failed to submit application.";
      alert(`Error: ${errorMessage}`);
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate(-1)}
      >
        Back
      </button> */}
      <h1 className="text-2xl font-SatoshiBold">{job.title}</h1>
      <div className="flex items-center gap-5 text-black/70">
        <p className="flex justify-start items-center font-SatoshiRegular text-black/70 gap-1">
          <IoLocationOutline className="text-xl" /> {job.location}
        </p>
        <p className="flex justify-start items-center font-SatoshiRegular gap-1">
          <BsFilePersonFill className="text-xl" /> {job.postedBy.firstname}{" "}
          {job.postedBy.lastname}
        </p>
        <p className="flex justify-start items-center font-SatoshiRegular gap-1">
          <LiaIndustrySolid /> {job.tag}
        </p>
      </div>
      <p>{job.description}</p>
      <div className="leading-none mt-6">
        <h1 className="text-clampText font-SatoshiBold ">About this Role</h1>
        <p className="text-black/70 leading-relaxed font-SatoshiRegular">
          {job.aboutRole || "No details provided."}
        </p>
      </div>

      <div className="leading-none mt-6">
        <h1 className="text-clampText font-SatoshiBold">Qualification</h1>
        <p className="text-black/70 leading-relaxed font-SatoshiRegular">
          {job.qualification || "No details provided."}
        </p>
      </div>

      <div className="leading-none mt-6">
        <h1 className="text-clampText font-SatoshiBold">Responsibility</h1>
        <p className="text-black/70 leading-relaxed font-SatoshiRegular">
          {job.responsibility || "No details provided."}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Apply for this Job</h2>
        <form onSubmit={handleApply} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Upload CV:</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCv(e.target.files[0])}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border rounded px-4 py-2 w-full"
              rows="4"
              placeholder="Write a message to the employer (optional)"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobDetails;
