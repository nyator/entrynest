import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PostJob from "./PostJob";

import { IoCaretBack, IoCaretForwardOutline } from "react-icons/io5";

const EmDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("reviewApplication");
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 3;

  const currentApplications = applications.slice(
    (currentPage - 1) * applicationsPerPage,
    currentPage * applicationsPerPage
  );

  const handlePageChange = (page) => {
    if (
      page >= 1 &&
      page <= Math.ceil(applications.length / applicationsPerPage)
    ) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/jobs/employer/applications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    link.download = cvUrl.split("/").pop();
    link.click();
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-fit bg-gray-200 h-fit p-4 rounded-2xl bg-gray/10 my-4 font-SatoshiMedium border-gray/20 border">
        <ul className="space-y-3">
          <li
            className={`cursor-pointer px-6 py-2 ${
              activeTab === "reviewApplication"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border "
            }`}
            onClick={() => setActiveTab("reviewApplication")}
          >
            Review Applications
          </li>
          <li
            className={`cursor-pointer px-6 py-2 ${
              activeTab === "manageJobs"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("manageJobs")}
          >
            Manage Jobs
          </li>
          <li
            className={`cursor-pointer px-6 py-2 ${
              activeTab === "post_job"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-primary/20 border"
                : "hover:bg-primary/90 bg-primary text-white rounded-lg transition-all ease-linear duration-150 border-primaryStroke/90 border "
            }`}
            onClick={() => setActiveTab("post_job")}
          >
            Post Job
          </li>
        </ul>
      </div>

      {/* Main Content */}

      <div className="w-3/4 container mx-auto p-4 min-h-[700px] font-SatoshiMedium text-sm">
        {activeTab === "reviewApplication" && (
          <div className="w-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
            {applications.length === 0 ? (
              <p>No applications yet.</p>
            ) : (
              <div className="space-y-4">
                {currentApplications.map((app) => (
                  <div
                    key={app._id}
                    className="border border-black/10 rounded-2xl px-4 py-2 shadow-sm bg-white leading-none"
                  >
                    <h2 className="text-lg font-bold">
                      {app.user.firstname} {app.user.lastname}
                    </h2>
                    <p className="mb-2">
                      <strong>Email:</strong> {app.user.email}
                    </p>
                    <p className="mb-2">
                      <strong>Job Title:</strong> {app.jobTitle}
                    </p>
                    <p className="mb-2">
                      <strong>Message:</strong> {app.message}
                    </p>
                    <div className="flex gap-4 items-center">
                      <a
                        href={app.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        <button>Open CV</button>
                      </a>
                      <button
                        onClick={() => handleDownload(app.cvUrl)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Download CV
                      </button>
                    </div>
                  </div>
                ))}
                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-4 space-x-2">
                  {Array.from(
                    {
                      length: Math.ceil(
                        applications.length / applicationsPerPage
                      ),
                    },
                    (_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 rounded ${
                          currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "manageJobs" && (
          <div className="w-full bg-gray/10 p-4 rounded-2xl border border-gray/20"></div>
        )}
        {activeTab === "post_job" && (
          <div className="bg-gray/10 p-4 rounded-2xl border border-gray/20">
            <h1 className="text-2xl font-bold mb-4 ">Post Job</h1>
            <PostJob />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmDashboard;
