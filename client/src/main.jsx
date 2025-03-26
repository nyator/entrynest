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

import LandingPage from "../src/pages/LandingPage"; //ALSO JOB_SEARCH PAGE
import Layout from "./Layout";
import NotFoundPage from "./pages/notFoundPage";
import FindTalentPage from "./pages/FindTalentPage";
import CommunityPage from "./pages/CommunityPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

import LoginPage from "../src/pages/LoginPage";
import SignupPage from "../src/pages/SignupPage";
import SupportPage from "./pages/SupportPage";
import SignupJobSeeker from "./pages/SignupJobSeeker";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import JsDashboard from "./pages/JsDashboard.jsx"; // Import JsDashboard
import JobDetails from "./pages/JobDetails.jsx"; // Import JobDetails
import ProfilePage from "./pages/ProfilePage"; // Import ProfilePage
import EmDashboard from "./pages/EmDashboard.jsx"; // Import EmDashboard
import PostJob from "./pages/PostJob";
import ViewEmployersPage from "./pages/ViewEmployersPage.jsx";
import ResourcePage from "./pages/ResourcePage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx"; // Import AdminDashboard
import EmployerProfilePage from "./pages/EmployerProfilePage.jsx"; // Import EmployerProfilePage

// Set the base URL for Axios
const API_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";
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
        path: "/signup-jobseeker",
        element: <SignupJobSeeker />,
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
        path: "/create-job",
        element: <PostJob />,
      },
      {
        path: "/view-employers",
        element: <ViewEmployersPage />,
      },
      {
        path: "/jobs",
        element: <JsDashboard />,
      },
      {
        path: "/jobs/:jobId",
        element: <JobDetails />,
      },
      {
        path: "/employer-profile/:userId", // Add this route
        element: <EmployerProfilePage />,
      },
      {
        path: "/profile", // Update this route
        element: <ProfilePage />,
      },
      {
        path: "/resources",
        element: <ResourcePage />,
      },
      {
        path: "/em-dashboard",
        element: <EmDashboard />,
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />, // Add this route
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
