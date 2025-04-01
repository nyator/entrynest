import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import DataTable from "react-data-table-component"; // Import react-data-table-component
import { verified, notVerified } from "../constants/styles";

const AdminDashboard = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
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

    fetchEmployers();
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

  if (loading) {
    return <LoadingScreen />;
  }

  const columns = [
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Employers</h1>
      <div className="w-full bg-gray/40 p-4 rounded border border-gray/20">
        <DataTable
          columns={columns}
          data={employers}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
