import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";

const MentorDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("myMentees");

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
          </div>
        )}
        {activeTab === "applicants" && (
          <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
            <h1 className="text-2xl font-bold mb-4">Applicants</h1>
          </div>
        )}
        {activeTab === "sessions" && (
          <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
            <h1 className="text-2xl font-bold mb-4">Sessions</h1>
          </div>
        )}
        {activeTab === "openMentorships" && (
          <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
            <h1 className="text-2xl font-bold mb-4">Open Mentorships</h1>
          </div>
        )}
        {activeTab === "postMentorship" && (
          <div className="w-full h-full bg-gray/10 p-4 rounded-2xl border border-gray/20">
            <h1 className="text-2xl font-bold mb-4">Post Mentorship</h1>
            {/* Add your post mentorship form or content here */}
            <p>Form to post mentorship will go here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorDashboard;
