import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { IoLocationOutline } from "react-icons/io5";
import { BsFilePersonFill } from "react-icons/bs";
import { LiaIndustrySolid } from "react-icons/lia";

import { toast } from "react-toastify";

const AdminJobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

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

  const handleDeleteJob = async () => {
    try {
      await axios.delete(`/jobs/${jobId}`); // Use jobId here
      toast.success("Job deleted successfully");
      navigate(-1);
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  const handleViewPosterProfile = () => {
    if (job?.postedBy?._id) {
      navigate(`/employer-profile/${job.postedBy._id}`); // Navigate to the poster's profile
    } else {
      toast.error("Poster information is unavailable");
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-SatoshiBold">{job.title}</h1>
      <div className="flex items-center gap-5 text-black/70">
        <p className="flex justify-start items-center font-SatoshiRegular text-black/70 gap-1">
          <IoLocationOutline className="text-xl" /> {job.location}
        </p>
        <p className="flex justify-start items-center font-SatoshiRegular gap-1">
          <BsFilePersonFill className="text-xl" />
          {job.postedBy?.firstname} {job.postedBy?.lastname}
        </p>
        <p className="flex justify-start items-center font-SatoshiRegular gap-1">
          <LiaIndustrySolid /> {job.tags?.join(", ")}
        </p>
      </div>
      <div className="leading-none mt-6">
        <h1 className="text-clampText font-SatoshiBold">About this Role</h1>
        <p className="text-black/70 leading-relaxed font-SatoshiRegular">
          {job.aboutRole}
        </p>
      </div>

      <div className="leading-none mt-6">
        <h1 className="text-clampText font-SatoshiBold">Qualification</h1>
        <p className="text-black/70 leading-relaxed font-SatoshiRegular">
          {job.qualification.split("\n").map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </p>
      </div>

      <div className="leading-none mt-6">
        <h1 className="text-clampText font-SatoshiBold">Responsibilities</h1>
        <p className="text-black/70 leading-relaxed font-SatoshiRegular">
          {job.responsibility.split("\n").map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </p>
      </div>
      <div className="leading-none mt-6">
        <h1 className="text-clampText font-SatoshiBold">Salary</h1>
        <p className="text-black/70 leading-relaxed font-SatoshiRegular">
          GH<span className="">₵</span> {job.salaryRange}
        </p>
      </div>

      <div className="flex justify-center mt-4 gap-3">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="bg-gray-500 px-4 py-2 rounded mt-4"
        >
          Back
        </button>
        <button
          onClick={handleViewPosterProfile} // Button to view poster's profile
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-4"
        >
          View Poster Profile
        </button>
        <button
          onClick={handleDeleteJob} // Call handleDeleteJob directly
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminJobDetails;
