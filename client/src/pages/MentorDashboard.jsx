import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";

const MentorDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [mentorships, setMentorships] = useState([]);
  const [applicants, setApplicants] = useState([]); // State for mentorship applicants
  const [mentees, setMentees] = useState([]); // State for approved applications
  const [activeTab, setActiveTab] = useState("openMentorships");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    duration: "",
    maxApplicants: "",
  });

  const fetchMentorships = async () => {
    try {
      const response = await axios.get("/mentorships", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMentorships(response.data.mentorships);
    } catch (error) {
      toast.error("Failed to fetch mentorship opportunities");
    }
  };

  const fetchApplicants = async () => {
    try {
      const response = await axios.get("/mentorships/applicants", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setApplicants(response.data.applicants);
    } catch (error) {
      toast.error("Failed to fetch mentorship applicants");
    }
  };

  const fetchMentees = async () => {
    try {
      const response = await axios.get("/mentorships/mentees", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMentees(response.data.mentees);
    } catch (error) {
      toast.error("Failed to fetch mentees");
    }
  };

  useEffect(() => {
    if (activeTab === "postMentorships") {
      fetchMentorships();
    }
    if (activeTab === "applicants") {
      fetchApplicants();
    }
    if (activeTab === "myMentees") {
      fetchMentees();
    }
    if (activeTab === "openMentorships") {
      fetchMentorships(); // Fetch mentorships when the tab is active
    }
  }, [activeTab]);

  useEffect(() => {
    fetchMentorships(); // Fetch mentorships on page load
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/mentorships", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Mentorship opportunity created successfully");
      setMentorships([...mentorships, response.data.mentorship]);
      setFormData({
        title: "",
        description: "",
        skillsRequired: "",
        duration: "",
        maxApplicants: "",
      });
    } catch (error) {
      toast.error("Failed to create mentorship opportunity");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="overflow-x-auto pt-5 w-full md:w-auto md:bg-gray-200 md:h-fit md:p-4 md:rounded-2xl md:bg-gray/10 md:my-4 md:font-SatoshiMedium md:border-gray/20 md:border flex-shrink-0">
        <ul className="w-full flex text-nowrap bg-gray/10 flex-row md:flex-col gap-4">
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 relative ${
              activeTab === "myMentees"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("myMentees")}
          >
            My Mentees
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 relative ${
              activeTab === "applicants"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("applicants")}
          >
            Applicants
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 relative ${
              activeTab === "sessions"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("sessions")}
          >
            Sessions
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 relative ${
              activeTab === "openMentorships"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("openMentorships")}
          >
            Open Mentorships
          </li>
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 relative ${
              activeTab === "postMentorship"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-primary/20 border"
                : "hover:bg-primary/90 bg-primary text-white rounded-lg transition-all ease-linear duration-150 border-primaryStroke/90 border"
            }`}
            onClick={() => setActiveTab("postMentorship")}
          >
            Post Mentorship
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto p-4 min-h-[700px] font-SatoshiMedium text-sm">
        {activeTab === "myMentees" && (
          <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
            <h1 className="text-2xl font-bold mb-4">My Mentees</h1>
            {mentees.length === 0 ? (
              <p>No approved mentees found.</p>
            ) : (
              <ul className="space-y-4">
                {mentees.map((mentee) => (
                  <li
                    key={mentee._id}
                    className="border border-black/10 rounded-2xl px-4 py-2 shadow-sm bg-white"
                  >
                    <h3 className="text-lg font-bold">
                      {mentee.firstname} {mentee.lastname}
                    </h3>
                    <p>
                      <strong>Email:</strong> {mentee.email}
                    </p>
                    <p>
                      <strong>Message:</strong>{" "}
                      {mentee.message || "No message provided"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {activeTab === "applicants" && (
          <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
            <h2 className="text-xl font-bold mb-4">Mentorship Applicants</h2>
            {applicants.length === 0 ? (
              <p>No applicants found.</p>
            ) : (
              <ul className="space-y-4">
                {applicants.map((applicant) => (
                  <li
                    key={applicant._id}
                    className="border border-black/10 rounded-2xl px-4 py-2 shadow-sm bg-white"
                  >
                    <h3 className="text-lg font-bold">
                      {applicant.firstname} {applicant.lastname}
                    </h3>
                    <p>
                      <strong>Email:</strong> {applicant.email}
                    </p>
                    <p>
                      <strong>Message:</strong>{" "}
                      {applicant.message || "No message provided"}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <button
                        onClick={() => {
                          // Logic to approve the applicant
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          // Logic to decline the applicant
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Decline
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {activeTab === "sessions" && (
          <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
            <h1 className="text-2xl font-bold mb-4">Sessions</h1>
          </div>
        )}
        {activeTab === "openMentorships" && (
          <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
            <h3 className="text-lg font-bold">
              Your Mentorship Opportunities
            </h3>
            <ul className="space-y-4 mt-4">
              {mentorships.map((mentorship) => (
                <li key={mentorship._id} className="border p-4 rounded-xl">
                  <h4 className="text-lg font-bold">{mentorship.title}</h4>
                  <p>{mentorship.description}</p>
                  <p>
                    <strong>Skills Required:</strong>{" "}
                    {mentorship.skillsRequired.join(", ")}
                  </p>
                  <p>
                    <strong>Duration:</strong> {mentorship.duration}
                  </p>
                  <p>
                    <strong>Applicants:</strong> {mentorship.currentApplicants}/
                    {mentorship.maxApplicants}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {mentorship.isClosed ? "Closed" : "Open"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "postMentorship" && (
          <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
            <h2 className="text-xl font-bold mb-4">
              Post Mentorship Opportunity
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Skills Required
                </label>
                <input
                  type="text"
                  name="skillsRequired"
                  value={formData.skillsRequired}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="Comma-separated skills"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  placeholder="e.g., 3 months"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Max Applicants
                </label>
                <input
                  type="number"
                  name="maxApplicants"
                  value={formData.maxApplicants}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Post Mentorship
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorDashboard;
