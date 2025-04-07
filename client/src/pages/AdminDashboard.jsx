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

    fetchEmployers();
    fetchJobs();
  }, []);

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
      selector: (row) => new Date(row.timePosted || row.createdAt || row.updatedAt).toLocaleDateString(),
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

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-fit bg-gray-200 h-fit p-4 rounded-2xl bg-gray/40 my-4 font-SatoshiMedium">
        <ul className="space-y-3">
          <li
            className={`cursor-pointer px-6 py-2 ${
              activeTab === "Employees" ? "bg-white rounded-lg transition-all ease-linear duration-150" : "hover:bg-white rounded-lg transition-all ease-linear duration-150 "
            }`}
            onClick={() => setActiveTab("Employees")}
          >
            Employees
          </li>
          <li
            className={`cursor-pointer px-6 py-2 ${
              activeTab === "Jobs" ? "bg-white rounded-lg transition-all ease-linear duration-150" : "hover:bg-white rounded-lg transition-all ease-linear duration-150 "
            }`}
            onClick={() => setActiveTab("Jobs")}
          >
            Jobs
          </li>
          <li
            className={`cursor-pointer px-6 py-2 ${
              activeTab === "post_job" ? "bg-white rounded-lg transition-all ease-linear duration-150" : "hover:bg-primary/90 bg-primary text-white rounded-lg transition-all ease-linear duration-150 "
            }`} 
            onClick={() => setActiveTab("post_job")}
          >
            Post Job
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 container mx-auto p-4 min-h-[500px]">
        {activeTab === "Employees" && (
          <>
            <div className="w-full bg-gray/40 p-4 rounded border border-gray/20">
              <DataTable
                columns={employerColumns}
                data={employers}
                pagination
                highlightOnHover
                striped
              />
            </div>
          </>
        )}
        {activeTab === "Jobs" && (
          <div>
            <div className="w-full bg-gray/40 p-4 rounded border border-gray/20">
              <DataTable
                columns={jobColumns}
                data={jobs}
                pagination
                highlightOnHover
                striped
              />
            </div>
          </div>
        )}
        {activeTab === "post_job" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Post Job</h1>
            <PostJob />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
