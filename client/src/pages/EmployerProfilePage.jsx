import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";
import DataTable from "react-data-table-component";

const EmployerProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/user/employers/${userId}`);
        setProfileData(response.data.employer);
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleViewJobDetails = (id) => {
    navigate(`/job-details/${id}`);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!profileData) {
    return <div className="text-center text-gray-500">Profile not found</div>;
  }

  const jobColumns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Salary",
      selector: (row) => row.salaryRange,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleViewJobDetails(row._id)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            View
          </button>
          <button
            onClick={() => handleDeleteJob(row._id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Profile Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-lg p-6">
        <div className="flex items-center gap-6">
          <img
            src={profileData.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold">
              {profileData.firstname} {profileData.lastname}
            </h1>
            <p className="text-sm opacity-90">{profileData.email}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Company:</strong> {profileData.companyName || "N/A"}
            </p>
            <p>
              <strong>Biography:</strong> {profileData.biography || "N/A"}
            </p>
          </div>
          <div>
            <p>
              <strong>Location:</strong> {profileData.location || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {profileData.telNumber || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Jobs Posted</h2>
        <DataTable
          columns={jobColumns}
          data={jobs}
          pagination
          highlightOnHover
          striped
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default EmployerProfilePage;
