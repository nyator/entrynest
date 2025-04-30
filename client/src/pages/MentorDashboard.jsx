import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import CustomDropdown from "../components/CustomDropdown";
import { IoMdPricetags } from "react-icons/io";
import { skillsList } from "../constants/index";
import { MdPendingActions } from "react-icons/md";
import { MdPeople, MdEventNote, MdWork, MdPostAdd } from "react-icons/md";

const MentorDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [mentorships, setMentorships] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [sessionForm, setSessionForm] = useState({
    selectedMentees: [],
    topic: "",
    date: "",
    startTime: "",
    endTime: "",
    message: "",
  });
  const [activeTab, setActiveTab] = useState("myMentees");
  const [showApplicants, setShowApplicants] = useState(null);
  const [editingMentorship, setEditingMentorship] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [postFormData, setPostFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    duration: "",
    maxApplicants: "",
  });
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    duration: "",
    maxApplicants: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState({
    myMentees: false,
    applicants: false,
    sessions: false,
    openMentorships: false,
    postMentorship: false,
  });

  const fetchMentorships = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/mentorships`, {
        withCredentials: true,
      });
      setMentorships(response.data.mentorships);
    } catch (error) {
      console.error("Error fetching mentorships:", error);
      toast.error("Failed to fetch mentorship opportunities");
    }
  };

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/mentorships/applicants/all`,
        {
          withCredentials: true,
        }
      );
      console.log("Applicants API Response:", response.data); // Log the response
      const filteredApplicants = response.data.applicants.filter(
        (applicant) => applicant.status !== "approved" // Exclude approved applicants
      );
      setApplicants(filteredApplicants);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      toast.error("Failed to fetch mentorship applicants");
    }
  };

  const fetchMentees = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/mentorships/mentees`, {
        withCredentials: true,
      });

      console.log("Mentees API Response:", response.data); // Debugging log to verify API response structure

      if (response.data && response.data.mentees) {
        const menteesWithMentorshipDetails = response.data.mentees.map(
          (mentee) => ({
            ...mentee,
            mentorshipTitle: mentee.mentorship?.title || "Unknown", // Ensure mentorship title is extracted
            mentorshipDescription:
              mentee.mentorship?.description || "No description provided",
          })
        );

        setMentees(menteesWithMentorshipDetails);
      } else {
        console.error("Unexpected API response structure:", response.data);
        toast.error(
          "Failed to fetch mentees due to unexpected response structure."
        );
      }
    } catch (error) {
      console.error("Error fetching mentees:", error);
      toast.error("Failed to fetch approved mentees");
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/mentorships/sessions`, {
        withCredentials: true,
      });

      console.log("Sessions API Response:", response.data); // Debugging log to verify API response structure

      if (response.data && response.data.sessions) {
        setSessions(response.data.sessions);
      } else {
        console.error("Unexpected API response structure:", response.data);
        toast.error("Failed to fetch sessions due to unexpected response structure.");
      }
    } catch (error) {
      console.error("Error fetching sessions:", error); // Log the error for debugging
      if (error.response) {
        console.error("Server Response:", error.response.data); // Log server response if available
        toast.error(
          error.response.data.message || "Failed to fetch sessions. Please try again later."
        );
      } else {
        toast.error("Failed to fetch sessions. Please check your network connection.");
      }
    }
  };

  const handleDelete = async (mentorshipId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/mentorships/${mentorshipId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setMentorships(mentorships.filter((m) => m._id !== mentorshipId));
        toast.success("Mentorship deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting mentorship:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete mentorship"
      );
    }
  };

  const handleApproveApplicant = async (mentorshipId, applicantId) => {
    try {
      const url = `${API_URL}/api/mentorships/${mentorshipId}/approve/${applicantId}`;
      const response = await axios.post(url, {}, { withCredentials: true });

      if (response.data.success) {
        toast.success("Applicant approved successfully!");
        fetchApplicants();
        fetchMentees();
      }
    } catch (error) {
      console.error("Error approving applicant:", error);
      toast.error(
        error.response?.data?.message || "Failed to approve applicant."
      );
    }
  };

  const handleDeclineApplicant = async (mentorshipId, applicantId) => {
    try {
      const url = `${API_URL}/api/mentorships/${mentorshipId}/decline/${applicantId}`;
      const response = await axios.post(url, {}, { withCredentials: true });

      if (response.data.success) {
        toast.success("Applicant declined successfully!");
        fetchApplicants();
      }
    } catch (error) {
      console.error("Error declining applicant:", error);
      toast.error(
        error.response?.data?.message || "Failed to decline applicant."
      );
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/mentorships`,
        postFormData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Mentorship opportunity created successfully");
        setMentorships([...mentorships, response.data.mentorship]);
        setPostFormData({
          title: "",
          description: "",
          skillsRequired: "",
          duration: "",
          maxApplicants: "",
        });
        setActiveTab("openMentorships");
      }
    } catch (error) {
      console.error("Error creating mentorship:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create mentorship opportunity"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSessionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/mentorships/sessions`,
        sessionForm,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Session created successfully");
        setSessions([...sessions, response.data.session]);
        setSessionForm({
          selectedMentees: [],
          topic: "",
          date: "",
          startTime: "",
          endTime: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error(error.response?.data?.message || "Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mentorship) => {
    navigate(`/edit-mentorship/${mentorship._id}`);
  };

  const handleViewApplicants = (mentorshipId) => {
    navigate(`/mentorship-applicants/${mentorshipId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading((prev) => ({ ...prev, [activeTab]: true }));
      try {
        if (activeTab === "postMentorship") {
          await fetchMentorships();
        }
        if (activeTab === "applicants") {
          await fetchApplicants();
        }
        if (activeTab === "myMentees") {
          await fetchMentees();
        }
        if (activeTab === "openMentorships") {
          await fetchMentorships();
        }
        if (activeTab === "sessions") {
          await fetchMentees();
          await fetchSessions();
        }
      } finally {
        setIsLoading((prev) => ({ ...prev, [activeTab]: false }));
      }
    };

    fetchData();
  }, [activeTab]);

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPostFormData({ ...postFormData, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handlePostSkillChange = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setPostFormData((prev) => ({
        ...prev,
        skillsRequired: [...selectedSkills, skill].join(", "),
      }));
    }
  };

  const handleEditSkillChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedSkills(selectedOptions);
    setEditFormData((prev) => ({
      ...prev,
      skillsRequired: selectedOptions.join(", "),
    }));
  };

  const handleSessionChange = (e) => {
    const { name, value } = e.target;
    setSessionForm({ ...sessionForm, [name]: value });
  };

  const handleMenteeSelection = (menteeId) => {
    setSessionForm((prevForm) => {
      const isSelected = prevForm.selectedMentees.includes(menteeId);
      return {
        ...prevForm,
        selectedMentees: isSelected
          ? prevForm.selectedMentees.filter((id) => id !== menteeId)
          : [...prevForm.selectedMentees, menteeId],
      };
    });
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    setPostFormData((prev) => ({
      ...prev,
      skillsRequired: selectedSkills.filter((s) => s !== skill).join(", "),
    }));
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="overflow-x-auto pt-5 w-full md:w-auto md:bg-gray-200 md:h-fit md:p-4 md:rounded-2xl md:bg-gray/10 md:my-4 md:font-SatoshiMedium md:border-gray/20 md:border flex-shrink-0">
        <ul className="w-full flex text-nowrap bg-gray/10 flex-row md:flex-col gap-4">
          {/* My Mentees Tab */}
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 relative ${
              activeTab === "myMentees"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("myMentees")}
          >
            <MdPeople className="text-blue-500" />
            My Mentees
          </li>

          {/* Applicants Tab */}
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 relative ${
              activeTab === "applicants"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("applicants")}
          >
            <MdPendingActions className="text-yellow-500" />
            Applicants
            {applicants.length > 0 && (
              <span className="rounded-full p-2 bg-purple-300 border border-primaryStroke h-6 w-6 text-breadcrumb absolute -top-2 -right-2 flex justify-center items-center">
                {applicants.length}
              </span>
            )}
          </li>

          {/* Sessions Tab */}
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 relative ${
              activeTab === "sessions"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("sessions")}
          >
            <MdEventNote className="text-green-500" />
            Sessions
          </li>

          {/* Open Mentorships Tab */}
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 relative ${
              activeTab === "openMentorships"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("openMentorships")}
          >
            <MdWork className="text-purple-500" />
            Open Mentorships
          </li>

          {/* Post Mentorship Tab */}
          <li
            className={`cursor-pointer px-6 py-2 inline-flex items-center gap-2 relative ${
              activeTab === "postMentorship"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-primary/20 border"
                : "hover:bg-primary/90 bg-primary text-white rounded-lg transition-all ease-linear duration-150 border-primaryStroke/90 border"
            }`}
            onClick={() => setActiveTab("postMentorship")}
          >
            <MdPostAdd className="text-white" />
            Post Mentorship
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto p-4 min-h-[700px] font-SatoshiMedium text-sm">
        {isLoading[activeTab] ? (
          <LoadingScreen />
        ) : (
          <>
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
                        <p>
                          <strong>Mentorship Title:</strong>{" "}
                          {mentee.mentorshipTitle}
                        </p>
                        <p>
                          <strong>Description:</strong>{" "}
                          {mentee.mentorshipDescription}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activeTab === "applicants" && (
              <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
                <h2 className="text-xl font-bold mb-4">
                  Mentorship Applicants
                </h2>
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
                          <strong>Mentorship:</strong>{" "}
                          {applicant.mentorshipTitle || "Unknown"}
                        </p>
                        <p>
                          <strong>Email:</strong> {applicant.email}
                        </p>
                        <p>
                          <strong>Skills:</strong>{" "}
                          {applicant.skills?.join(", ") || "No skills listed"}
                        </p>
                        <p>
                          <strong>Message:</strong>{" "}
                          {applicant.message || "No message provided"}
                        </p>
                        <div className="flex gap-4 mt-2">
                          <button
                            onClick={() =>
                              handleApproveApplicant(
                                applicant.mentorshipId,
                                applicant._id
                              )
                            }
                            className="px-4 py-2 bg-green-500 text-white rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleDeclineApplicant(
                                applicant.mentorshipId,
                                applicant._id
                              )
                            }
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
                <h2 className="text-xl font-bold mb-4">Create Session</h2>
                <form onSubmit={handleSessionSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Select Mentees
                    </label>
                    <ul className="space-y-2 mt-2">
                      {mentees.map((mentee) => (
                        <li
                          key={mentee._id}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            checked={sessionForm.selectedMentees.includes(
                              mentee._id
                            )}
                            onChange={() => handleMenteeSelection(mentee._id)}
                          />
                          <label>
                            {mentee.firstname} {mentee.lastname} -{" "}
                            {mentee.email}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Topic</label>
                    <input
                      type="text"
                      name="topic"
                      value={sessionForm.topic}
                      onChange={handleSessionChange}
                      className="w-full border rounded p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={sessionForm.date}
                      onChange={handleSessionChange}
                      className="w-full border rounded p-2"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Start Time
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={sessionForm.startTime}
                        onChange={handleSessionChange}
                        className="w-full border rounded p-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        End Time
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        value={sessionForm.endTime}
                        onChange={handleSessionChange}
                        className="w-full border rounded p-2"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Message</label>
                    <textarea
                      name="message"
                      value={sessionForm.message}
                      onChange={handleSessionChange}
                      className="w-full border rounded p-2"
                      placeholder="Add a message for the session"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Create Session
                  </button>
                </form>

                <h3 className="text-lg font-bold mt-8">Scheduled Sessions</h3>
                <ul className="space-y-4 mt-4">
                  {sessions.map((session) => (
                    <li key={session._id} className="border p-4 rounded-xl">
                      <h4 className="text-lg font-bold">{session.topic}</h4>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(session.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Time:</strong> {session.startTime} -{" "}
                        {session.endTime}
                      </p>
                      <p>
                        <strong>Message:</strong>{" "}
                        {session.message || "No message provided"}
                      </p>
                      <p>
                        <strong>Mentees:</strong>{" "}
                        {session.mentees
                          .map((mentee) => mentee.firstname)
                          .join(", ")}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "openMentorships" && (
              <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
                <h3 className="text-lg font-bold mb-4">
                  Your Mentorship Opportunities
                </h3>
                <div className="space-y-4">
                  {mentorships.map((mentorship) => (
                    <div
                      key={mentorship._id}
                      className="border p-4 rounded-xl bg-white"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold">
                            {mentorship.title}
                          </h4>
                          <p className="text-gray-600">
                            {mentorship.description}
                          </p>
                          <div className="mt-2">
                            <p>
                              <strong>Skills Required:</strong>{" "}
                              {mentorship.skillsRequired.join(", ")}
                            </p>
                            <p>
                              <strong>Duration:</strong> {mentorship.duration}
                            </p>
                            <p>
                              <strong>Max Applicants:</strong>{" "}
                              {mentorship.maxApplicants}
                            </p>
                            <p>
                              <strong>Current Applicants:</strong>{" "}
                              {mentorship.currentApplicants}
                            </p>
                            {mentorship.currentApplicants > 0 && (
                              <>
                                {showApplicants?.mentorshipId ===
                                mentorship._id ? (
                                  <button
                                    onClick={() => setShowApplicants(null)}
                                    className="mt-2 bg-blue-500 text-white rounded px-2 py-1 text-sm"
                                  >
                                    Hide Applicants
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      handleViewApplicants(mentorship._id)
                                    }
                                    className="mt-2 bg-blue-500 text-white rounded px-2 py-1 text-sm"
                                  >
                                    View Applicants
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(mentorship)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(mentorship._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {showApplicants?.mentorshipId === mentorship._id && (
                        <div className="mt-4 border-t pt-4">
                          <h5 className="font-bold mb-2">Applicants</h5>
                          {showApplicants.applicants.length === 0 ? (
                            <p>No applicants yet.</p>
                          ) : (
                            <ul className="space-y-2">
                              {showApplicants.applicants.map((applicant) => (
                                <li
                                  key={applicant._id}
                                  className="border p-2 rounded"
                                >
                                  <p>
                                    <strong>Name:</strong> {applicant.firstname}{" "}
                                    {applicant.lastname}
                                  </p>
                                  <p>
                                    <strong>Email:</strong> {applicant.email}
                                  </p>
                                  <p>
                                    <strong>Skills:</strong>{" "}
                                    {applicant.skills?.join(", ") ||
                                      "No skills listed"}
                                  </p>
                                  <p>
                                    <strong>Biography:</strong>{" "}
                                    {applicant.biography ||
                                      "No biography provided"}
                                  </p>
                                  <div className="flex gap-2 mt-2">
                                    <button
                                      onClick={() =>
                                        handleApproveApplicant(
                                          mentorship._id,
                                          applicant._id
                                        )
                                      }
                                      className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeclineApplicant(
                                          mentorship._id,
                                          applicant._id
                                        )
                                      }
                                      className="px-2 py-1 bg-red-500 text-white rounded text-sm"
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
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "postMentorship" && (
              <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
                <h2 className="text-xl font-bold mb-4">
                  Post New Mentorship Opportunity
                </h2>
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                    <div className="w-full mr-4">
                      <div className="mb-4">
                        <label className="block text-black/60">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={postFormData.title}
                          onChange={handlePostChange}
                          className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70"
                          placeholder="Enter mentorship title"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-black/60">Duration</label>
                        <input
                          type="text"
                          name="duration"
                          value={postFormData.duration}
                          onChange={handlePostChange}
                          className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70"
                          placeholder="e.g., 3 months"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-black/60">
                          Max Applicants
                        </label>
                        <input
                          type="number"
                          name="maxApplicants"
                          value={postFormData.maxApplicants}
                          onChange={handlePostChange}
                          className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70"
                          placeholder="Enter maximum number of applicants"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-black/60">
                          Skills Required
                        </label>
                        <CustomDropdown
                          options={skillsList.filter(
                            (skill) => !selectedSkills.includes(skill)
                          )}
                          value=""
                          onChange={handlePostSkillChange}
                          placeholder="Select a skill"
                          icon={<IoMdPricetags className="text-black/50" />}
                        />
                        <div className="flex flex-wrap mt-2 gap-2">
                          {selectedSkills.map((skill, index) => (
                            <div
                              key={index}
                              className="hover:translate-y-[0.5px] flex items-center border border-gray shadow-sm bg-white text-blue-500 px-3 py-1 rounded-full"
                            >
                              {skill}
                              <button
                                type="button"
                                className="ml-2 text-black/50"
                                onClick={() => handleRemoveSkill(skill)}
                              >
                                <IoIosCloseCircle className="text-black/60" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="mb-4">
                        <label className="block text-black/60">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={postFormData.description}
                          onChange={handlePostChange}
                          className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70 h-48"
                          placeholder="Describe the mentorship opportunity"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Post Mentorship
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("openMentorships")}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MentorDashboard;
