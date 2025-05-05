import React, { useEffect, useState } from "react";
import { cardButton } from "../constants/styles";
import { fr } from "../constants/assests";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { HiBuildingOffice2 } from "react-icons/hi2";
import { HiOutlineBriefcase } from "react-icons/hi";
import { HiOutlineLocationMarker } from "react-icons/hi";

const ViewEmployersPage = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        console.log("Token used for request:", token); // Log the token for debugging

        const response = await fetch("http://localhost:3000/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          credentials: "include", // Ensure cookies are sent with the request
        });

        console.log("Response status:", response.status); // Log the response status
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response data:", errorData); // Log the error response data
          throw new Error(errorData.message || "Failed to fetch employers");
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data

        // Group jobs by employer and collect their information
        const employerMap = new Map();
        data.jobs.forEach(job => {
          const employerKey = `${job.postedBy.firstname} ${job.postedBy.lastname}`;
          if (!employerMap.has(employerKey)) {
            employerMap.set(employerKey, {
              name: employerKey,
              companyName: job.companyName || "Not specified",
              location: job.location || "Not specified",
              avatar: job.postedBy.avatar || fr,
              activeJobs: 1,
              jobs: [job]
            });
          } else {
            const employer = employerMap.get(employerKey);
            employer.activeJobs += 1;
            employer.jobs.push(job);
          }
        });

        setEmployers(Array.from(employerMap.values()));
      } catch (err) {
        console.error("Error fetching employers: ", err);
        setError(err.message);
        toast.error("Failed to load employers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  const handleEmployerClick = (employer) => {
    // Navigate to the jobs page with the employer's name as a query parameter
    navigate(`/jobs?employer=${encodeURIComponent(employer.name)}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <div className="mb-4 flex justify-center bg-africanBackground3 py-10 md:py-20 gap-2 rounded-lg relative">
        <div className="bg-black/50 border border-gray rounded-lg">
          <h1 className="text-2xl text-white font-SatoshiBold p-2 w-full text-center">
            Employers on entrynest
          </h1>
        </div>
      </div>

      {employers.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700">
            No employers found
          </h3>
          <p className="text-gray-500 mt-2">
            There are currently no employers with active job postings.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {employers.map((employer, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden font-SatoshiRegular"
            >
              {/* Header Section */}
              <div className="bg-primary/10 p-4 border-b border-grayStroke">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                      <img
                        src={employer.avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-SatoshiBold text-lg">{employer.companyName}</h3>
                      <p className="text-sm text-gray-500">Active Employer</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    Hiring
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-2 text-black/70">
                  <HiBuildingOffice2 className="text-xl" />
                  <span className="text-sm">{employer.companyName}</span>
                </div>
                <div className="flex items-center space-x-2 text-black/70">
                  <HiOutlineLocationMarker className="text-xl" />
                  <span className="text-sm">{employer.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-black/70">
                  <HiOutlineBriefcase className="text-xl" />
                  <span className="text-sm">{employer.activeJobs} Active Jobs</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-grayStroke">
                <button
                  onClick={() => handleEmployerClick(employer)}
                  className="w-full py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors duration-300 font-medium"
                >
                  View Available Jobs
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewEmployersPage;
