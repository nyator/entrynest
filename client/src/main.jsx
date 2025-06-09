import * as React from "react";
import * as ReactDOM from "react-dom/client";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { ToastContainer, Zoom } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import AuthRedirect from "./components/AuthRedirect";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import LandingPage from "../src/pages/LandingPage";
import Layout from "./Layout";
import NotFoundPage from "./pages/notFoundPage";
import FindTalentPage from "./pages/FindTalentPage";
import CommunityPage from "./pages/CommunityPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import LoginPage from "../src/pages/LoginPage";
import SignupPage from "../src/pages/SignupPage";
import SupportPage from "./pages/SupportPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import JsDashboard from "./pages/JsDashboard.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import ProfilePage from "./pages/ProfilePage";
import EmDashboard from "./pages/EmDashboard.jsx";
import PostJob from "./pages/PostJob";
import ViewEmployersPage from "./pages/ViewEmployersPage.jsx";
import ResourcePage from "./pages/ResourcePage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployerProfilePage from "./pages/EmployerProfilePage.jsx";
import AdminJobDetails from "./pages/AdminJobDetails.jsx";
import EditJob from "./pages/EditJob";
import JobApplications from "./pages/JobApplications";
import MentorDashboard from "./pages/MentorDashboard.jsx";
import MentorshipsPage from "./pages/MentorshipsPage.jsx";
import EditMentorshipPage from "./pages/EditMentorshipPage";
import MentorshipApplicants from "./pages/MentorshipApplicants";

// Set the base URL for Axios
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
axios.defaults.baseURL = API_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/find_talent",
        element: <FindTalentPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/resources",
        element: <ResourcePage />,
      },
      {
        path: "/community",
        element: <CommunityPage />,
      },
      {
        path: "/support",
        element: <SupportPage />,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/verify-email",
        element: <EmailVerificationPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPasswordPage />,
      },
      {
        path: "/create-job",
        element: <PostJob />,
      },
      {
        path: "/view-employers",
        element: <ViewEmployersPage />,
      },

      {
        path: "/jobs/:jobId",
        element: <JobDetails />,
      },
      {
        path: "/job-details/:jobId",
        element: <AdminJobDetails />,
      },
      {
        path: "/employer-profile/:userId",
        element: <EmployerProfilePage />,
      },
      {
        path: "/edit-job/:jobId",
        element: <EditJob />,
      },

      {
        path: "/mentorships",
        element: <MentorshipsPage />,
      },
      {
        path: "/jobs",
        element: <JsDashboard />,
      },
      {
        path: "/em-dashboard",
        element: <EmDashboard />,
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/mentor-dashboard",
        element: <MentorDashboard />,
      },
      {
        path: "/em-dashboard/applications/:jobId",
        element: <JobApplications />,
      },
      {
        path: "/edit-mentorship/:id",
        element: <EditMentorshipPage />,
      },
      {
        path: "/mentorship-applicants/:mentorshipId",
        element: <MentorshipApplicants />,
      },

    ],
  },
]);

const App = () => {
  const { checkAuth } = useAuthStore();

  React.useEffect(() => {
    console.log("Calling checkAuth to set authentication state");
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthProvider>
      <RouterProvider router={router}>
        <AuthRedirect />
      </RouterProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
