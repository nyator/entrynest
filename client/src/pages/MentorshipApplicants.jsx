import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { HiMiniDocumentText } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";

const MentorshipApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const applicantsPerPage = 5;
  const navigate = useNavigate();

  const filterDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [message, setMessage] = useState(""); // Ensure message state is defined

  const handleClickOutside = (event) => {
    if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
      setSortDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicantsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/mentorships/applicants/all`,
          {
            withCredentials: true,
          }
        );

        setApplicants(applicantsResponse.data.applicants);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch mentorship applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setSortDropdownOpen(false);
  };

  const handleApproveApplicant = async (applicantId, mentorshipId) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/mentorships/${mentorshipId}/approve/${applicantId}`;
      const response = await axios.post(url, {}, { withCredentials: true });

      if (response.data.success) {
        toast.success("Applicant approved successfully");
        // Refresh applicants list
        const refreshedApplicants = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/mentorships/applicants/all`,
          { withCredentials: true }
        );
        setApplicants(refreshedApplicants.data.applicants);
      }
    } catch (error) {
      console.error("Error approving applicant:", error);
      toast.error(error.response?.data?.message || "Failed to approve applicant.");
    }
  };

  const handleDeclineApplicant = async (applicantId, mentorshipId) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/mentorships/${mentorshipId}/decline/${applicantId}`;
      const response = await axios.post(url, {}, { withCredentials: true });

      if (response.data.success) {
        toast.success("Applicant declined successfully");
        // Refresh applicants list
        const refreshedApplicants = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/mentorships/applicants/all`,
          { withCredentials: true }
        );
        setApplicants(refreshedApplicants.data.applicants);
      }
    } catch (error) {
      console.error("Error declining applicant:", error);
      toast.error(error.response?.data?.message || "Failed to decline applicant.");
    }
  };

  const filteredApplicants = applicants.filter((applicant) => {
    if (filterStatus === "all") return true;
    return applicant.status === filterStatus;
  });

  const sortedApplicants = [...filteredApplicants].sort((a, b) => {
    const dateA = new Date(a.appliedAt);
    const dateB = new Date(b.appliedAt);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const currentApplicants = sortedApplicants.slice(
    (currentPage - 1) * applicantsPerPage,
    currentPage * applicantsPerPage
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="mx-auto p-4 font-SatoshiMedium text-sm">
      {/* Breadcrumb */}
      <nav className="mb-4 text-gray-600 text-breadcrumb inline-flex items-center text-black/70 gap-2">
        <span className="text-black/70 font-bold inline-flex items-center">
          <MdSpaceDashboard className="inline-block mr-1" />
          <Link to="/mentor-dashboard" className="hover:underline">
            Mentor Dashboard
          </Link>{" "}
        </span>
        /{" "}
        <span className="text-gray-800 font-bold inline-flex items-center">
          <HiMiniDocumentText className="inline-block mr-1" />
          All Mentorship Applicants
        </span>
      </nav>

      <h1 className="text-2xl font-bold mb-4">All Mentorship Applicants</h1>

      {/* Filters and Sort */}
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
                  : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
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

      {/* Applicants List */}
      <div className="w-full h-svh bg-gray/10 p-4 rounded-2xl border border-gray/20 relative">
        {currentApplicants.length === 0 ? (
          <p>No applicants found.</p>
        ) : (
          <div className="space-y-4">
            {currentApplicants.map((applicant) => (
              <div
                key={applicant._id}
                className="border border-black/10 rounded-2xl px-4 py-2 shadow-sm bg-white leading-none relative"
              >
                {applicant.status === "pending" && (
                  <span className="inline-flex items-center right-5 rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20 ring-inset">
                    Pending
                  </span>
                )}
                {applicant.status === "approved" && (
                  <span className="inline-flex items-center right-5 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                    Approved
                  </span>
                )}
                {applicant.status === "declined" && (
                  <span className="inline-flex items-center right-5 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset">
                    Declined
                  </span>
                )}
                <h2 className="text-lg font-bold">
                  {applicant.firstname} {applicant.lastname}
                </h2>
                <p className="mb-2">
                  <strong>Email:</strong> {applicant.email}
                </p>
                <p className="mb-2">
                  <strong>Mentorship:</strong> {applicant.mentorshipTitle}
                </p>
                <p className="mb-2">
                  <strong>Skills:</strong> {applicant.skills?.join(", ") || "No skills listed"}
                </p>
                <p className="mb-2">
                  <strong>Biography:</strong> {applicant.biography || "No biography provided"}
                </p>
                {applicant.status === "pending" && (
                  <div className="flex flex-col md:flex-row gap-4 items-end md:items-center absolute -top-2 md:top-0 right-0 p-4">
                    <button
                      onClick={() => handleApproveApplicant(applicant._id, applicant.mentorshipId)}
                      className="px-2 py-1 sm:px-4 md:py-2 bg-green-500 text-white rounded border border-green-600 hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeclineApplicant(applicant._id, applicant.mentorshipId)}
                      className="px-2 py-1 sm:px-4 md:py-2 bg-red-500 text-white rounded border border-red-600 hover:bg-red-600 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
            {/* Pagination */}
            <div className="flex justify-center items-center mt-4 space-x-2 absolute bottom-3 left-1/2 transform -translate-x-1/2">
              <div className="border-t border-gray w-full h-1 absolute -top-5"></div>
              {Array.from(
                { length: Math.ceil(sortedApplicants.length / applicantsPerPage) },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
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

export default MentorshipApplicants;
