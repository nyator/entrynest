import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

import { HiMiniDocumentText } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { MdOutlineArrowDropDown } from "react-icons/md";

import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]); // Add filtered applications state
  const [jobTitle, setJobTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all"); // Add filter status state
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown visibility
  const [sortOrder, setSortOrder] = useState("newest"); // Add sort order state
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false); // State to toggle sort dropdown visibility
  const [loading, setLoading] = useState(true); // Add loading state
  const applicationsPerPage = 5;
  const navigate = useNavigate();

  const filterDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      filterDropdownRef.current &&
      !filterDropdownRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
    if (
      sortDropdownRef.current &&
      !sortDropdownRef.current.contains(event.target)
    ) {
      setSortDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentApplications = filteredApplications.slice(
    (currentPage - 1) * applicationsPerPage,
    currentPage * applicationsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setDropdownOpen(false); // Close dropdown after selection
    if (status === "all") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(
        applications.filter((app) => app.status === status)
      );
    }
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setSortDropdownOpen(false); // Close dropdown after selection
    const sortedApplications = [...filteredApplications].sort((a, b) => {
      const dateA = new Date(a.createdAt); // Use createdAt for sorting
      const dateB = new Date(b.createdAt); // Use createdAt for sorting
      return order === "newest" ? dateB - dateA : dateA - dateB;
    });
    setFilteredApplications(sortedApplications);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`/jobs/employer/applications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        const filteredApplications = response.data.applications.filter(
          (app) => app.jobId === jobId
        );
        setApplications(filteredApplications);
        setFilteredApplications(filteredApplications); // Initialize filtered applications
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    const fetchJobTitle = async () => {
      try {
        const response = await axios.get(`/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setJobTitle(response.data.job.title); // Set the job title
      } catch (error) {
        console.error("Error fetching job title:", error);
      }
    };

    fetchApplications();
    fetchJobTitle();
  }, [jobId]);

  const handleDownload = async (cvUrl) => {
    if (!cvUrl) {
      console.error("CV URL is missing.");
      toast.error("CV URL is not available.");
      return;
    }
  
    try {
      // Fetch the file as a Blob
      const response = await axios.get(cvUrl, {
        responseType: "blob", // Ensure the response is a Blob
      });
  
      // Create a temporary URL for the Blob
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary anchor element for downloading
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", cvUrl.split("/").pop()); // Set the file name
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link);
  
      // Revoke the temporary URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CV:", error);
      toast.error("Failed to download CV.");
    }
  };

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      await axios.patch(
        `/jobs/${jobId}/applications/${applicationId}`,
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
          app._id === applicationId ? { ...app, status } : app
        )
      );
      setFilteredApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        )
      ); // Update filtered applications instantly
    } catch (error) {
      console.error(`Error updating application status to ${status}:`, error);
      toast.error(`Failed to ${status} application`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 font-SatoshiMedium text-sm">
      {/* Breadcrumb */}
      <nav className="mb-4 text-gray-600 text-breadcrumb inline-flex items-center text-black/70 gap-2">
        <span className="text-black/70 font-bold inline-flex items-center">
          <MdSpaceDashboard className="inline-block mr-1" />
          <Link to="/em-dashboard" className="hover:underline">
            Employer Dashboard
          </Link>{" "}
        </span>
        /{" "}
        <span className="text-gray-800 font-bold inline-flex items-center">
          <HiMiniDocumentText className="inline-block mr-1" />
          Manage Applications
        </span>
      </nav>
      <h1 className="text-2xl font-bold mb-4">
        Applications for: <span className="text-primary">{jobTitle}</span>
      </h1>
      {/* Custom Dropdown */}
      <div className="md:inline-flex leading-none w-full">
        <div className="md:mb-4">
          <div className="inline-flex items-baseline gap-2 w-full p-2 rounded-lg">
            <label className="inline-flex items-start text-gray-700 font-medium gap-2">
              Filter by Status:
              <HiMiniArrowsUpDown />
            </label>
            <div className="relative" ref={filterDropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-[120px] bg-white shadow-sm border border-gray gap-2 rounded-3xl px-4 py-2 text-start inline-flex items-center justify-between"
              >
                {filterStatus === "all"
                  ? "All"
                  : filterStatus.charAt(0).toUpperCase() +
                    filterStatus.slice(1)}
                <MdOutlineArrowDropDown className="size-5" />
              </button>
              {dropdownOpen && (
                <div className="absolute w-[120px] z-10 mt-2 text-start bg-white shadow-sm border border-gray gap-2 rounded-xl">
                  <div
                    onClick={() => handleFilterChange("all")}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer hover:rounded-t-xl"
                  >
                    All
                  </div>
                  <div
                    onClick={() => handleFilterChange("pending")}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    Pending
                  </div>
                  <div
                    onClick={() => handleFilterChange("approved")}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    Approved
                  </div>
                  <div
                    onClick={() => handleFilterChange("declined")}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer hover:rounded-b-xl"
                  >
                    Declined
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sort by Date Dropdown */}
        <div className="mb-4">
          <div className="inline-flex items-baseline gap-2 w-full p-2 rounded-lg">
            <label className="inline-flex items-start text-gray-700 font-medium gap-2">
              Sort by Date:
              <HiMiniArrowsUpDown />
            </label>
            <div className="relative ml-3.5" ref={sortDropdownRef}>
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="w-[120px] bg-white shadow-sm border border-gray gap-2 rounded-3xl px-4 py-2 text-start inline-flex items-center justify-between"
              >
                {sortOrder === "newest" ? "Newest" : "Oldest"}
                <MdOutlineArrowDropDown className="size-5" />
              </button>
              {sortDropdownOpen && (
                <div className="absolute w-[120px] z-10 mt-2 text-start bg-white shadow-sm border border-gray gap-2 rounded-xl">
                  <div
                    onClick={() => handleSortOrderChange("newest")}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer hover:rounded-t-xl"
                  >
                    Newest
                  </div>
                  <div
                    onClick={() => handleSortOrderChange("oldest")}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer hover:rounded-b-xl"
                  >
                    Oldest
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-svh bg-gray/10  p-4 rounded-2xl border border-gray/20 relative">
        {filteredApplications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="space-y-4 ">
            {currentApplications.map((app) => (
              <div
                key={app._id}
                className="border border-black/10 rounded-2xl px-4 py-2 shadow-sm bg-white leading-none relative"
              >
                {app.status === "pending" && (
                  <span className="inline-flex items-center right-5 rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20 ring-inset">
                    Pending
                  </span>
                )}
                {app.status === "approved" && (
                  <span className="inline-flex items-center right-5 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                    Approved
                  </span>
                )}
                {app.status === "declined" && (
                  <span className="inline-flex items-center right-5 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset">
                    Declined
                  </span>
                )}
                <h2 className="text-lg font-bold">
                  {app.user.firstname} {app.user.lastname}
                </h2>
                <p className="mb-2">
                  <strong>Email:</strong> {app.user.email}
                </p>
                <p className="mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(app.createdAt).toLocaleDateString()}
                </p>
                <p className="mb-2">
                  <strong>Message:</strong>{" "}
                  {app.message || "No message provided"}
                </p>
                {app.status === "pending" && (
                  <div className="flex flex-col md:flex-row gap-4 items-end md:items-center absolute -top-2 md:top-0 right-0 p-4">
                    <button
                      onClick={() => handleUpdateStatus(app._id, "approved")}
                      className="px-2 py-1 sm:px-4 md:py-2 bg-green-500 text-white rounded border border-green-600"
                    >
                      Contact
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(app._id, "declined")}
                      className="px-2 py-1 sm:px-4 md:py-2 bg-red-500 text-white rounded border border-red-600"
                    >
                      Skip
                    </button>
                  </div>
                )}
                <div className="flex gap-4 items-center">
                  <a
                    href={app.cvUrl} // Use the full CV URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    <button>Open CV</button>
                  </a>
                  <button
                    onClick={() => handleDownload(app.cvUrl)} // Use the updated download handler
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
                    filteredApplications.length / applicationsPerPage
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
    </div>
  );
};

export default JobApplications;
