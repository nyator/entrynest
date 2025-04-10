import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import DataTable from "react-data-table-component"; // Import react-data-table-component
import { verified, notVerified } from "../constants/styles";
import PostJob from "./PostJob";

import { FcStatistics } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import { MdSupervisedUserCircle } from "react-icons/md";
import { BsFilePost } from "react-icons/bs";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaGetPocket } from "react-icons/fa";
import { TbBrandMailgun } from "react-icons/tb";
import { BsCalendar2DateFill } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";

import StatsGraph from "../components/StatsGraph"; // Import the StatsGraph component

const AdminDashboard = () => {
  const [employers, setEmployers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [jobs, setJobs] = useState([]); // State for jobs
  const [applications, setApplications] = useState([]); // State for grouped applications
  const [tabLoading, setTabLoading] = useState(false); // State for tab-specific loading
  const [activeTab, setActiveTab] = useState("Overall Stats"); // State for active tab
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmployers: 0,
    totalJobseekers: 0,
    totalMentors: 0,
    totalApplications: 0,
    totalJobsPosted: 0, // Ensure totalJobsPosted is included
  });
  const [recentEmployers, setRecentEmployers] = useState([]); // State for recent employers
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployers = async () => {
      setTabLoading(true);
      try {
        const response = await axios.get("/user/employers");
        setEmployers(response.data.employers);
      } catch (error) {
        toast.error("Failed to fetch employers");
      } finally {
        setTabLoading(false);
      }
    };

    const fetchJobs = async () => {
      setTabLoading(true);
      try {
        const response = await axios.get("/jobs"); // Fetch jobs
        setJobs(response.data.jobs);
      } catch (error) {
        toast.error("Failed to fetch jobs");
      } finally {
        setTabLoading(false);
      }
    };

    const fetchApplications = async () => {
      setTabLoading(true);
      try {
        const response = await axios.get("/jobs/applications/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });

        // Group applications by job and applicant, ignoring status
        const groupedApplications = response.data.applications.reduce(
          (acc, app) => {
            const key = `${app.jobId}-${app.user._id}`; // Unique key based on job and applicant
            if (!acc[key]) {
              acc[key] = {
                jobTitle: app.jobTitle,
                applicantName: `${app.user.firstname} ${app.user.lastname}`,
                cvUrl: app.cvUrl,
                message: app.message,
              };
            }
            return acc;
          },
          {}
        );

        setApplications(Object.values(groupedApplications)); // Convert grouped object to array
      } catch (error) {
        toast.error("Failed to fetch applications");
      } finally {
        setTabLoading(false);
      }
    };

    const fetchStats = async () => {
      setTabLoading(true);
      try {
        const response = await axios.get("/user/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setStats(response.data.stats); // Ensure totalJobsPosted is included in stats
      } catch (error) {
        toast.error("Failed to fetch platform stats");
      } finally {
        setTabLoading(false);
      }
    };

    const fetchRecentEmployers = async () => {
      setTabLoading(true);
      try {
        const response = await axios.get("/user/recent-employers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setRecentEmployers(response.data.recentEmployers);
      } catch (error) {
        toast.error("Failed to fetch recent employers");
      } finally {
        setTabLoading(false);
      }
    };

    if (activeTab === "Employees") fetchEmployers();
    if (activeTab === "Jobs") fetchJobs();
    if (activeTab === "allApplications") fetchApplications();
    if (activeTab === "Overall Stats") {
      fetchStats();
      fetchRecentEmployers();
    }
  }, [activeTab]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/user/employers/${id}`);
      setEmployers(employers.filter((employer) => employer._id !== id));
      toast.success("Employer deleted successfully");
    } catch (error) {
      toast.error("Failed to delete employer");
    }
  };

  const handleViewProfile = (id) => {
    navigate(`/employer-profile/${id}`);
  };

  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  const handleViewJobDetails = (id) => {
    navigate(`/job-details/${id}`);
  };

  const employerColumns = [
    {
      name: "Name",
      selector: (row) => `${row.firstname} ${row.lastname}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) =>
        row.verified ? (
          <span className={`${verified}`}>Verified</span>
        ) : (
          <span className={`${notVerified}`}>Not Verified</span>
        ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            onClick={() => handleViewProfile(row._id)}
            className="text-blue-600/80 mr-4 text-sm"
          >
            View Profile
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const mentorColumns = [
    {
      name: "Name",
      selector: (row) => `${row.firstname} ${row.lastname}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) =>
        row.verified ? (
          <span className={`${verified}`}>Verified</span>
        ) : (
          <span className={`${notVerified}`}>Not Verified</span>
        ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            onClick={() => handleViewProfile(row._id)}
            className="text-blue-600/80 mr-4 text-sm"
          >
            View Profile
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const jobColumns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Company",
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Posted Date",
      selector: (row) =>
        new Date(
          row.timePosted || row.createdAt || row.updatedAt
        ).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            onClick={() => handleViewJobDetails(row._id)}
            className="text-blue-600/80 mr-4 text-sm"
          >
            View Details
          </button>
          <button
            onClick={() => handleDeleteJob(row._id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const applicationColumns = [
    {
      name: "Job Title",
      selector: (row) => row.jobTitle,
      sortable: true,
    },
    {
      name: "Applicant Name",
      selector: (row) => row.applicantName,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <a
            href={row.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600/80 mr-4 text-sm"
          >
            Open CV
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row font-SatoshiMedium text-sm">
      {/* Sidebar */}
      <div className="overflow-x-auto pt-5 w-full md:w-auto md:bg-gray-200 md:h-fit md:p-4 md:rounded-2xl md:bg-gray/10 md:my-4 md:font-SatoshiMedium md:border-gray/20 md:border flex-shrink-0">
        <ul className="w-full flex text-nowrap bg-gray/10 text-black/80 flex-row md:flex-col gap-4 ">
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 ${
              activeTab === "Overall Stats"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-black/20 border"
                : "hover:bg-black/70 bg-black/80 text-white rounded-lg transition-all ease-linear duration-150 border-black border "
            }`}
            onClick={() => setActiveTab("Overall Stats")}
          >
            <FcStatistics />
            Overall Stats
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 ${
              activeTab === "Employees"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("Employees")}
          >
            <FaUsers />
            Employees
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 ${
              activeTab === "Mentors"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("Mentors")}
          >
            <MdSupervisedUserCircle />
            Mentors
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 ${
              activeTab === "Jobs"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("Jobs")}
          >
            <BsFilePost />
            Jobs
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 ${
              activeTab === "allApplications"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("allApplications")}
          >
            <FaGetPocket />
            All Applications
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 ${
              activeTab === "post_job"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-primary/20 border"
                : "hover:bg-primary/90 bg-primary text-white rounded-lg transition-all ease-linear duration-150 border-primaryStroke/90 border "
            }`}
            onClick={() => setActiveTab("post_job")}
          >
            <MdOutlinePostAdd />
            Post Job
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 ${
              activeTab === "support"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("support")}
          >
            <BiSupport />
            Support
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto p-4 min-h-[500px]">
        {tabLoading ? (
          <LoadingScreen /> // Show loading screen for the active tab
        ) : (
          <>
            {activeTab === "Overall Stats" && (
              <div className="w-full pb-32 md:pb-5 h-full bg-gray/10 p-4 rounded-2xl border font-SatoshiRegular text-sm border-gray/20 relative">
                <h1 className="text-lg font-SatoshiMedium mb-4">Platform Statistics</h1>
                <div className="m-4 py-3 px-4 bg-gray/20 h-fit shadow rounded-lg">
                  <StatsGraph stats={stats} />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="py-2 px-4 bg-white  h-fit shadow rounded-lg">
                    <h2 className=" text-mblack underline underline-offset-4">
                      Total Users
                    </h2>
                    <p className="text-lg font-SatoshiBlack ">
                      {stats.totalUsers}
                    </p>
                  </div>
                  <div className="py-2 px-4 bg-white  h-fit shadow rounded-lg">
                    <h2 className="text-mblack underline underline-offset-4">
                      Employers
                    </h2>
                    <p className="text-lg font-SatoshiBlack ">
                      {stats.totalEmployers}
                    </p>
                  </div>
                  <div className="py-2 px-4 bg-white  h-fit shadow rounded-lg">
                    <h2 className="text-mblack underline underline-offset-4">
                      Jobseekers
                    </h2>
                    <p className="text-lg font-SatoshiBlack ">
                      {stats.totalJobseekers}
                    </p>
                  </div>
                  <div className="py-2 px-4 bg-white  h-fit shadow rounded-lg">
                    <h2 className="text-mblack underline underline-offset-4">
                      Mentors
                    </h2>
                    <p className="text-lg font-SatoshiBlack ">
                      {stats.totalMentors}
                    </p>
                  </div>
                  <div className="py-2 px-4 bg-white  h-fit shadow rounded-lg">
                    <h2 className="text-mblack underline underline-offset-4">
                      Jobs Posted
                    </h2>
                    <p className="text-lg font-SatoshiBlack ">
                      {stats.totalJobsPosted}
                    </p>
                  </div>
                  <div className="py-2 px-4 bg-white  h-fit shadow rounded-lg">
                    <h2 className="text-mblack underline underline-offset-4">
                      Total Applications
                    </h2>
                    <p className="text-lg font-SatoshiBlack ">
                      {stats.totalApplications}
                    </p>
                  </div>
                </div>
                <div className="mt-8 py-3 px-4 bg-gray/20 h-fit shadow rounded-lg ">
                  <h2 className="text-lg font-SatoshiMedium mb-2">
                    Recent Employers / Mentor
                  </h2>
                  <ul className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-start">
                    {recentEmployers.slice(0, 5).map((employer) => (
                      <li
                        key={employer._id}
                        className="py-2 px-4 bg-white h-fit shadow-sm rounded-lg cursor-pointer hover:translate-y-[1px] hover:ring-1 ring-gray transition-all ease-linear duration-150"
                        onClick={() => handleViewProfile(employer._id)} // Move onClick here
                      >
                        <p className="font-bold inline-flex gap-2 items-center">
                          <FaUsers />
                          {employer.firstname} {employer.lastname}
                        </p>
                        <p className="text-sm text-black/70 flex gap-2 items-center">
                          <TbBrandMailgun />
                          {employer.email}
                        </p>
                        <p className="text-xs text-black/70 flex gap-2 items-center">
                          <BsCalendar2DateFill />
                          Joined:{" "}
                          {new Date(employer.createdAt).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "Employees" && (
              <div className="w-full pb-32 md:pb-0 h-full bg-gray/10 p-4 rounded-t-2xl border border-gray/20 relative">
                <DataTable
                  columns={employerColumns}
                  data={employers}
                  pagination
                  highlightOnHover
                  striped
                />
              </div>
            )}
            {activeTab === "Mentors" && (
              <div className="w-full pb-32 md:pb-0 h-full bg-gray/10 p-4 rounded-t-2xl border border-gray/20 relative">
                <DataTable
                  columns={mentorColumns}
                  data={mentors}
                  pagination
                  highlightOnHover
                  striped
                />
              </div>
            )}
            {activeTab === "Jobs" && (
              <div className="w-full pb-32 md:pb-0 h-full bg-gray/10 p-4 rounded-t-2xl border border-gray/20 relative">
                <DataTable
                  columns={jobColumns}
                  data={jobs}
                  pagination
                  highlightOnHover
                  striped
                />
              </div>
            )}
            {activeTab === "allApplications" && (
              <div className="w-full pb-32 md:pb-0 h-full bg-gray/10 p-4 rounded-t-2xl border border-gray/20 relative">
                <DataTable
                  columns={applicationColumns}
                  data={applications} // Display grouped applications
                  pagination
                  highlightOnHover
                  striped
                />
              </div>
            )}
            {activeTab === "post_job" && (
              <div className="w-full pb-32 md:pb-0 h-full bg-gray/10 p-4 rounded-2xl border border-gray/20 relative">
                <h1 className="text-2xl font-bold mb-4">Post Job</h1>
                <PostJob />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
