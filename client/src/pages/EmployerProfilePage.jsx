import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";
import DataTable from "react-data-table-component"; // Import react-data-table-component

const EmployerProfilePage = () => {
  const { userId } = useParams(); // Get userId from URL
  const navigate = useNavigate(); // Initialize navigate
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
    navigate(`/job-details/${id}`); // Fixed navigation
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
    return <div>Profile not found</div>;
  }

  const jobColumns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: false,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Salary Range",
      selector: (row) => row.salaryRange,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
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
            Delete Job
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {profileData.firstname} {profileData.lastname} Profile
      </h1>
      <div className="w-full bg-gray/40 p-4 rounded border border-gray/20">
        <p>
          Name: {profileData.firstname} {profileData.lastname}
        </p>
        <img src="" alt="" />
        <p>Email: {profileData.email}</p>
        <p>Company Name: {profileData.companyName}</p>
        <p>Biography: {profileData.biography}</p>
        <p>Location: {profileData.location}</p>
        <p>Telephone Number: {profileData.telNumber}</p>
        {/* <p>Skills: {profileData.skills.join(", ")}</p> */}
      </div>
      <h2 className="text-xl font-bold mt-6 mb-4">Jobs Posted</h2>
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
  );
};

export default EmployerProfilePage;
