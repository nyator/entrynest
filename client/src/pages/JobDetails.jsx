import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoLocationOutline } from "react-icons/io5";
import { BsFilePersonFill } from "react-icons/bs";
import { LiaIndustrySolid } from "react-icons/lia";
import { IoChevronBackOutline } from "react-icons/io5";
import { AiOutlineUpload, AiOutlineLoading3Quarters } from "react-icons/ai"; // Import upload and loading spinner icons
import LoadingScreen from "../components/LoadingScreen";
import Spinner from "../elements/Spinner"; // Import Spinner component

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const [cv, setCv] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

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
    setLoading(true); // Set loading to true when submitting

    if (!cv) {
      toast.error("Please upload your CV.");
      setLoading(false); // Reset loading state
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(cv.type)) {
      toast.error("Only .pdf, .doc, and .docx files are allowed.");
      setLoading(false); // Reset loading state
      return;
    }

    const formData = new FormData();
    formData.append("resume", cv);
    formData.append("message", message);

    try {
      const response = await axios.post(`/jobs/${jobId}/apply`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      toast.success("Your application has been submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit application.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (!job) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="mx-auto md:w-4/5 p-4">
      <ToastContainer />
      <h1 className="text-2xl text-center md:text-start font-SatoshiBold mb-4 underline underline-offset-4">
        {job.title}
      </h1>
      <div className="flex flex-col md:flex-row leading-tight items-center gap-1 md:gap-5 text-black/70 text-jobcard1">
        <p className="flex justify-start items-center font-SatoshiRegular text-black/70 gap-1">
          <IoLocationOutline className="text-jobcard1" /> {job.location}
        </p>
        <p className="flex justify-start items-center font-SatoshiRegular gap-1">
          <BsFilePersonFill className="text-jobcard1" />{" "}
          {job.postedBy.firstname} {job.postedBy.lastname}
        </p>
        <p className="flex justify-start items-center text-jobcard1 font-SatoshiRegular gap-1">
          <LiaIndustrySolid /> {job.tags?.join(" | ") || "No tags available"}
        </p>
      </div>
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

      <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-SatoshiBold mb-6 text-gray-800 text-center">
          Apply for this Job
        </h2>
        <form onSubmit={handleApply} className="space-y-6">
          <div>
            <label className="block mb-2 font-SatoshiMedium text-gray-700">
              Upload CV:
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCv(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                type="button"
                className="flex items-center justify-center gap-2 font-SatoshiMedium px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all w-full text-center shadow-md"
              >
                <AiOutlineUpload className="text-lg" />
                {cv ? cv.name : "Choose File"}
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-2 font-SatoshiMediumm text-gray-700">
              Message:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 font-SatoshiMedium rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write a message to the employer (optional)"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white font-SatoshiMedium rounded-lg hover:bg-green-600 transition-all shadow-md w-full flex items-center justify-center gap-2"
            disabled={loading} // Disable button while loading
          >
            {loading ? <Spinner /> : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobDetails;
