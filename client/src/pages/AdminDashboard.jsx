import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import DataTable from "react-data-table-component"; // Import react-data-table-component
import { verified, notVerified } from "../constants/styles";
import PostJob from "./PostJob";

const AdminDashboard = () => {
  const [employers, setEmployers] = useState([]);
  const [jobs, setJobs] = useState([]); // State for jobs
  const [applications, setApplications] = useState([]); // State for applications
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Employees"); // State for active tab
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await axios.get("/user/employers");
        setEmployers(response.data.employers);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch employers");
        setLoading(false);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await axios.get("/jobs"); // Fetch jobs
        setJobs(response.data.jobs);
      } catch (error) {
        toast.error("Failed to fetch jobs");
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await axios.get("/applications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setApplications(response.data.applications);
      } catch (error) {
        toast.error("Failed to fetch applications");
      }
    };

    fetchEmployers();
    fetchJobs();

    if (activeTab === "Applications") {
      fetchApplications();
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

  if (loading) {
    return <LoadingScreen />;
  }

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
      selector: (row) => `${row.user.firstname} ${row.user.lastname}`,
      sortable: true,
    },
    {
      name: "Applicant Email",
      selector: (row) => row.user.email,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
            View CV
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="overflow-x-auto pt-5 w-full md:w-auto md:bg-gray-200 md:h-fit md:p-4 md:rounded-2xl md:bg-gray/10 md:my-4 md:font-SatoshiMedium md:border-gray/20 md:border flex-shrink-0">
        <ul className="w-full flex text-nowrap bg-gray/10 flex-row md:flex-col gap-4 ">
          <li
            className={`cursor-pointer px-6 py-2 ${
              activeTab === "Employees"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("Employees")}
          >
            Employees
          </li>
          <li
            className={`cursor-pointer px-6 py-2 ${
              activeTab === "Mentors"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("Mentors")}
          >
            Mentors
          </li>
          <li
            className={`cursor-pointer px-6 py-2 ${
              activeTab === "Jobs"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("Jobs")}
          >
            Jobs
          </li>
          <li
            className={`cursor-pointer px-6 py-2 ${
              activeTab === "allApplications"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("allApplications")}
          >
            All Applications
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
      <div className="w-full mx-auto p-4 min-h-[500px]">
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
              columns={employerColumns}
              data={employers}
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
        {activeTab === "post_job" && (
          <div className="w-full pb-32 md:pb-0 h-full bg-gray/10 p-4 rounded-t-2xl border border-gray/20 relative">
            <h1 className="text-2xl font-bold mb-4">Post Job</h1>
            <PostJob />
          </div>
        )}
        {activeTab === "Applications" && (
          <div className="w-full pb-32 md:pb-0 h-full bg-gray/10 p-4 rounded-t-2xl border border-gray/20 relative">
            <DataTable
              columns={applicationColumns}
              data={applications}
              pagination
              highlightOnHover
              striped
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
