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

  const handleApply = (e) => {
    e.preventDefault();
    if (!cv) {
      alert("Please upload your CV.");
      return;
    }
    // Simulate submitting the application
    console.log("Application submitted:", { cv, message });
    alert("Your application has been submitted!");
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
          efkmfakfndfk
        </p>
      </div>

      <div className="leading-none mt-6">
        <h1 className="text-clampText font-SatoshiBold">Qualification</h1>
        <p className="text-black/70 leading-relaxed font-SatoshiRegular">
          <li>efkmfakfndfk</li>
          <li>efkmfakfndfk</li>
          <li>efkmfakfndfk</li>
          <li>efkmfakfndfk</li>
        </p>
      </div>

      <div className="leading-none mt-6">
        <h1 className="text-clampText font-SatoshiBold">Responsible</h1>
        <p className="text-black/70 leading-relaxed font-SatoshiRegular">
          <li>efkmfakfndfk</li>
          <li>efkmfakfndfk</li>
          <li>efkmfakfndfk</li>
          <li>efkmfakfndfk</li>
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
