import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PostJob from "./PostJob";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { FaDownload } from "react-icons/fa6";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineBookmark } from "react-icons/md";
import { FaCircleXmark } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import Swal from "sweetalert2"; // Import SweetAlert2 for confirmation popups

const EmDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("manageJobs");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Unified items per page for jobs and applications
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [pendingApplicationsCount, setPendingApplicationsCount] = useState(0);
  const [manageJobsCount, setManageJobsCount] = useState(0);

  const currentTabApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(jobs.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const fetchPendingApplications = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/jobs/employer/applications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        const pendingApplications = response.data.applications.filter(
          (app) => app.status === "pending"
        );
        setApplications(pendingApplications);
      } catch (error) {
        console.error("Error fetching pending applications:", error);
        toast.error("Failed to fetch pending applications");
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "reviewApplication") {
      fetchPendingApplications();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchManageJobsCount = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/jobs/employer/applications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        const pendingApplications = response.data.applications.filter(
          (app) => app.status === "pending"
        );
        setApplications(pendingApplications);
      } catch (error) {
        console.error("Error fetching pending applications:", error);
        toast.error("Failed to fetch pending applications");
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "manageJobs") {
      fetchManageJobsCount();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/jobs/employer", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "manageJobs") {
      fetchJobs();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchApprovedApplications = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/jobs/employer/applications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        const approvedApplications = response.data.applications.filter(
          (app) => app.status === "approved"
        );
        setApplications(approvedApplications);
      } catch (error) {
        console.error("Error fetching approved applications:", error);
        toast.error("Failed to fetch approved applications");
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "approved") {
      fetchApprovedApplications();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchDeclinedApplications = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/jobs/employer/applications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        const declinedApplications = response.data.applications.filter(
          (app) => app.status === "declined"
        );
        setApplications(declinedApplications);
      } catch (error) {
        console.error("Error fetching declined applications:", error);
        toast.error("Failed to fetch declined applications");
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "declined") {
      fetchDeclinedApplications();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchPendingApplicationsCount = async () => {
      try {
        const response = await axios.get("/jobs/employer/applications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        const pendingApplications = response.data.applications.filter(
          (app) => app.status === "pending"
        );
        setPendingApplicationsCount(pendingApplications.length);
      } catch (error) {
        console.error("Error fetching pending applications count:", error);
        toast.error("Failed to fetch pending applications count");
      }
    };

    fetchPendingApplicationsCount();
  }, []);

  useEffect(() => {
    const fetchManageJobsCount = async () => {
      try {
        const response = await axios.get("/jobs/employer", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setManageJobsCount(response.data.jobs.length);
      } catch (error) {
        console.error("Error fetching manage jobs count:", error);
        toast.error("Failed to fetch manage jobs count");
      }
    };

    fetchManageJobsCount();
  }, []);

  const handleDownload = (cvUrl) => {
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = cvUrl.split("/").pop();
    link.click();
  };

  const handleEditJob = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setJobs((prev) => prev.filter((job) => job._id !== jobId));
        toast.success("Job deleted successfully");
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job");
      }
    }
  };

  const handleViewApplications = (jobId) => {
    navigate(`/em-dashboard/applications/${jobId}`);
  };

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      await axios.patch(
        `/jobs/${applicationId.jobId}/applications/${applicationId._id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      toast.success(`Application ${status} successfully`);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId._id ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.error(`Error updating application status to ${status}:`, error);
      toast.error(`Failed to ${status} application`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="overflow-x-auto pt-5 w-full md:w-auto md:bg-gray-200 md:h-fit md:p-4 md:rounded-2xl md:bg-gray/10 md:my-4 md:font-SatoshiMedium md:border-gray/20 md:border flex-shrink-0">
        <ul className="w-full flex text-nowrap bg-gray/10 flex-row md:flex-col gap-4 ">
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 relative ${
              activeTab === "manageJobs"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("manageJobs")}
          >
            <MdOutlineBookmark />
            Manage Jobs
            <span className="rounded-full p-2 bg-purple-300 border border-primaryStroke h-6 w-6 text-breadcrumb absolute -top-2 -right-2 flex justify-center items-center">
              {manageJobsCount}
            </span>
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 relative ${
              activeTab === "reviewApplication"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("reviewApplication")}
          >
            <MdPendingActions className="text-yellow-500" />
            Review Applications
            <span className="rounded-full p-2 bg-purple-300 border border-primaryStroke h-6 w-6 text-breadcrumb absolute -top-2 -right-2 flex justify-center items-center">
              {pendingApplicationsCount}
            </span>
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 ${
              activeTab === "approved"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("approved")}
          >
            <IoCheckmarkCircle className="text-green-600 text-lg" />
            Approved
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 ${
              activeTab === "declined"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("declined")}
          >
            <FaCircleXmark className="text-red-500" />
            Declined
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 ${
              activeTab === "post_job"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-primary/20 border"
                : "hover:bg-primary/90 bg-primary text-white rounded-lg transition-all ease-linear duration-150 border-primaryStroke/90 border"
            }`}
            onClick={() => setActiveTab("post_job")}
          >
            <MdOutlinePostAdd />
            Post Job
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto p-4 min-h-[700px] font-SatoshiMedium text-sm">
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {activeTab === "manageJobs" && (
              <div className="w-full pb-32 md:pb-0 h-full bg-gray/10 p-4 rounded-2xl border border-gray/20 relative">
                {jobs.length === 0 ? (
                  <div className="flex flex-col justify-center items-center h-full">
                    <FaCircleXmark className="text-red-500 text-4xl" />
                    <h2 className="text-lg font-bold ml-2">
                      No job postings yet.
                    </h2>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobs
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((job) => (
                        <div
                          key={job._id}
                          className="flex flex-col sm:flex-row border border-black/10 rounded-2xl px-4 py-2 shadow-sm bg-white leading-none"
                        >
                          <div className="flex flex-col w-full">
                            <h2 className="text-lg font-bold">{job.title}</h2>
                            <p className="mb-2">
                              <strong>Posted On:</strong>{" "}
                              {new Date(job.createdAt).toLocaleDateString()}
                            </p>
                            <p className="mb-2">
                              <strong>Updated On:</strong>{" "}
                              {new Date(job.updatedAt).toLocaleDateString()}
                            </p>
                            <p className="mb-2">
                              <strong>Applicants:</strong>{" "}
                              {job.applicationCount || 0}
                            </p>
                            <div className="flex gap-4 items-center">
                              {job.applicationCount > 0 && (
                                <button
                                  onClick={() =>
                                    handleViewApplications(job._id)
                                  }
                                  className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                  View Applications
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-4 items-start">
                            <button
                              onClick={() => handleEditJob(job._id)}
                              className="px-4 py-2 bg-yellow-500 text-white rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job._id)}
                              className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-4 space-x-2 absolute bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className="border-t border-gray w-full h-1 absolute -top-5"></div>
                      {Array.from(
                        {
                          length: Math.ceil(jobs.length / itemsPerPage),
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
            {activeTab === "reviewApplication" && (
              <>
                <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20 relative">
                  {applications.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-full">
                      <FaCircleXmark className="text-red-500 text-4xl" />
                      <h2 className="text-lg font-bold ml-2">
                        No pending applications yet.
                      </h2>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {currentTabApplications.map((app) => (
                        <div
                          key={app._id}
                          className="border border-black/10 rounded-2xl px-4 py-2 shadow-sm bg-white leading-none relative"
                        >
                          <span class="inline-flex items-center right-5 rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20 ring-inset">
                            Pending
                          </span>
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
                          <div className="flex gap-4 items-center absolute top-0 right-0 p-4">
                            <button
                              onClick={() =>
                                handleUpdateStatus(app, "approved")
                              }
                              className="px-4 py-2 bg-green-600 text-white rounded"
                              disabled={app.status === "approved"}
                            >
                              Contact
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateStatus(app, "declined")
                              }
                              className="px-2 py-1 sm:px-4 md:py-2 bg-red-600 text-white rounded"
                              disabled={app.status === "declined"}
                            >
                              Skip
                            </button>
                          </div>
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
                              className="px-4 py-2 bg-primary inline-flex text-white rounded gap-3"
                            >
                              Download CV
                              <FaDownload className="text-breadcrumb" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {/* Pagination Controls */}

                      <div className="flex justify-center items-center  mt-4 space-x-2 absolute bottom-3 left-1/2 transform -translate-x-1/2">
                        <div className="border-t border-gray w-full h-1 absolute -top-5"></div>
                        {Array.from(
                          {
                            length: Math.ceil(
                              applications.length / itemsPerPage
                            ),
                          },
                          (_, index) => (
                            <button
                              key={index + 1}
                              onClick={() => handlePageChange(index + 1)}
                              className={`px-3 py-1 rounded relative ${
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
              </>
            )}
            {activeTab === "approved" && (
              <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20 relative">
                {applications.length === 0 ? (
                  <div className="flex flex-col justify-center items-center h-full">
                    <FaCircleXmark className="text-red-500 text-4xl" />
                    <h2 className="text-lg font-bold ml-2">
                      No approved applications yet.
                    </h2>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentTabApplications.map((app) => (
                      <div
                        key={app._id}
                        className="border border-black/10 rounded-2xl px-4 py-2 shadow-sm bg-white leading-none "
                      >
                        <span class="inline-flex items-center right-5 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                          Approved
                        </span>
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
                            className="px-4 py-2 bg-primary inline-flex text-white rounded gap-3"
                          >
                            Download CV
                            <FaDownload className="text-breadcrumb" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-4 space-x-2 absolute bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className="border-t border-gray w-full h-1 absolute -top-5"></div>
                      {Array.from(
                        {
                          length: Math.ceil(
                            applications.length / itemsPerPage
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
            {activeTab === "declined" && (
              <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20 relative">
                {applications.length === 0 ? (
                  <div className="flex flex-col justify-center items-center h-full">
                    <FaCircleXmark className="text-red-500 text-4xl" />
                    <h2 className="text-lg font-bold ml-2">
                      No declined applications yet.
                    </h2>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentTabApplications.map((app) => (
                      <div
                        key={app._id}
                        className="border border-black/10 rounded-2xl px-4 py-2 shadow-sm bg-white leading-none"
                      >
                        <span class="inline-flex items-center right-5 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset">
                          Declined
                        </span>
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
                            className="px-4 py-2 bg-primary inline-flex text-white rounded gap-3"
                          >
                            Download CV
                            <FaDownload className="text-breadcrumb" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-4 space-x-2 absolute bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className="border-t border-gray w-full h-1 absolute -top-5"></div>
                      {Array.from(
                        {
                          length: Math.ceil(
                            applications.length / itemsPerPage
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
            {activeTab === "post_job" && (
              <div className="bg-gray/10 p-4 rounded-2xl border border-gray/20">
                <h1 className="text-2xl font-bold mb-4 ">Post Job</h1>
                <PostJob />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmDashboard;
