import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { shadowBox, verified, notVerified } from "../constants/styles";

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Employers</h1>
      <div className="w-full bg-gray/40 p-4 rounded border border-gray/20">
        <ul>
          {employers.map((employer) => (
            <li
              key={employer._id}
              className="bg-white mb-4 py-5 px-3 flex justify-between items-center rounded-sm shadow"
            >
              <div className="flex flex-col items-start">
                {employer.verified ? (
                  <p className={`${verified}`}>Verified</p>
                ) : (
                  <p className={`${notVerified}`}> Not Verified</p>
                )}
                {employer.firstname} {employer.lastname} - {employer.email}
              </div>
              <div>
                <button
                  onClick={() => handleViewProfile(employer._id)}
                  className={`bg-primary text-white px-4 py-2 rounded mr-2 ${shadowBox}`}
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleDelete(employer._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
