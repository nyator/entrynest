import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";

const MentorDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("myMentees");
  const [mentees, setMentees] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchMentees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/mentors/mentees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setMentees(response.data.mentees);
      } catch (error) {
        console.error("Error fetching mentees:", error);
        toast.error("Failed to fetch mentees");
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "myMentees") {
      fetchMentees();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/mentors/sessions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setSessions(response.data.sessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
        toast.error("Failed to fetch sessions");
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "sessions") {
      fetchSessions();
    }
  }, [activeTab]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="overflow-x-auto pt-5 w-full md:w-auto md:bg-gray-200 md:h-fit md:p-4 md:rounded-2xl md:bg-gray/10 md:my-4 md:font-SatoshiMedium md:border-gray/20 md:border flex-shrink-0">
        <ul className="w-full flex text-nowrap bg-gray/10 flex-row md:flex-col gap-4">
          <li
            className={`cursor-pointer px-6 py-2 w-full ${
              activeTab === "myMentees"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("myMentees")}
          >
            My Mentees
          </li>
          <li
            className={`cursor-pointer px-6 py-2 w-full ${
              activeTab === "sessions"
                ? "bg-white rounded-lg transition-all ease-linear duration-150 border-gray/90 border"
                : "hover:bg-white/50 rounded-lg transition-all ease-linear duration-150 border-gray/20 border"
            }`}
            onClick={() => setActiveTab("sessions")}
          >
            Sessions
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto p-4 min-h-[700px] font-SatoshiMedium text-sm">
        {activeTab === "myMentees" && (
          <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
            <h1 className="text-2xl font-bold mb-4">My Mentees</h1>
            {mentees.length === 0 ? (
              <p>No mentees assigned yet.</p>
            ) : (
              <ul className="space-y-4">
                {mentees.map((mentee) => (
                  <li
                    key={mentee.id}
                    className="border border-black/10 rounded-2xl px-4 py-2 shadow-sm bg-white"
                  >
                    <h2 className="text-lg font-bold">
                      {mentee.firstname} {mentee.lastname}
                    </h2>
                    <p>
                      <strong>Email:</strong> {mentee.email}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {activeTab === "sessions" && (
          <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
            <h1 className="text-2xl font-bold mb-4">Sessions</h1>
            {sessions.length === 0 ? (
              <p>No sessions scheduled yet.</p>
            ) : (
              <ul className="space-y-4">
                {sessions.map((session) => (
                  <li
                    key={session.id}
                    className="border border-black/10 rounded-2xl px-4 py-2 shadow-sm bg-white"
                  >
                    <h2 className="text-lg font-bold">{session.topic}</h2>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong> {session.time}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorDashboard;
