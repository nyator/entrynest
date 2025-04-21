import React, { useState } from "react";

const ResourcePage = () => {
  const [activeTab, setActiveTab] = useState("resume");

  const renderContent = () => {
    switch (activeTab) {
      case "resume":
        return (
          <table className="table-auto mx-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://zety.com/resume-builder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Zety
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Guided resume builder with professional templates.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://novoresume.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Novoresume
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Resume and cover letter builder with customization.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://www.canva.com/resumes/templates/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Canva
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Creative resume templates with drag-and-drop builder.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://resumeworded.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Resume Worded
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Feedback-based resume checker with AI scoring.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://kickresume.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Kickresume
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Visually appealing resumes & personal websites.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://enhancv.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Enhancv
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Modern design templates, helpful resume tips.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://www.visualcv.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    VisualCV
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Resumes, cover letters, and analytics.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://www.resume.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Resume.com
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Free and simple resume creation.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://flowcv.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    FlowCV
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Fast, beautiful resumes with PDF export.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://standardresume.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Standard Resume
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">LinkedIn import for fast resume building.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://www.jobscan.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Jobscan
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Tailors resumes to job descriptions (ATS optimization).</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://cvmkr.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    CVMaker
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Simple tool with pre-written examples.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://www.cakeresume.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    CakeResume
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Creative resume builder with portfolio features.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://hloom.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Hloom
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Word-based resume templates.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://resumake.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Resumake
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Free and open-source.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://vizualize.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Visualize.me
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Infographic-style resumes.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://skillsyncer.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    SkillSyncer
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Resume optimization for job matching.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://resumegenius.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Resume Genius
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Template-driven resume builder.</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://www.indeed.com/create-resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Indeed Resume Builder
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Tied directly to Indeed job search.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href="https://www.livecareer.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    LiveCareer
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">Resumes, letters, and job tips.</td>
              </tr>
            </tbody>
          </table>
        );
      case "interview":
        return (
          <ul>
            <li>
              <a
                href="https://www.indeed.com/career-advice/interviewing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Indeed Interview Tips
              </a> - Comprehensive interview preparation guide.
            </li>
            <li>
              <a
                href="https://biginterview.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Big Interview
              </a> - Practice and learn interview skills.
            </li>
          </ul>
        );
      case "networking":
        return (
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                LinkedIn
              </a> - Build your professional network.
            </li>
            <li>
              <a
                href="https://www.themuse.com/advice/networking-tips"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                The Muse Networking Tips
              </a> - Effective networking strategies.
            </li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto p-4">
      <div className="mb-4 h-52 flex justify-center bg-africanBackground5 py-10 md:py-20 gap-2 rounded-lg relative"></div>
      <div className="relative mb-4">
        <div
          className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300"
          style={{
            width: activeTab === "resume" ? "33.33%" : activeTab === "interview" ? "33.33%" : "33.33%",
            transform:
              activeTab === "resume"
                ? "translateX(0%)"
                : activeTab === "interview"
                ? "translateX(100%)"
                : "translateX(200%)",
          }}
        ></div>
        <div className="flex">
          <div
            className={`flex-1 text-center py-2 cursor-pointer ${
              activeTab === "resume" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("resume")}
          >
            Resume Building
          </div>
          <div
            className={`flex-1 text-center py-2 cursor-pointer ${
              activeTab === "interview" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("interview")}
          >
            Interview Preparation
          </div>
          <div
            className={`flex-1 text-center py-2 cursor-pointer ${
              activeTab === "networking" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("networking")}
          >
            Networking Tips
          </div>
        </div>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default ResourcePage;
