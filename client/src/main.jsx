import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";

import LandingPage from "../src/pages/LandingPage"; //ALSO JOB_SEARCH PAGE
import Layout from "./Layout";
import NotFoundPage from "./pages/notFoundPage";
import FindTalentPage from "./pages/FIndTalentPage";
import CommunityPage from "./pages/CommunityPage";

import LoginPage from "../src/pages/LoginPage";
import SignupPage from "../src/pages/SignupPage";
import SupportPage from "./pages/SupportPage";
import SignupJobSeeker from "./pages/SignupJobSeeker";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import JobPage from "./pages/JobPage";

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
        path: "/jobs",
        element: (
          <ProtectedRoute allowedRoles={['jobseeker']}>
            <JobPage />
          </ProtectedRoute>
        ),
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
      // {
      //   path: "/forgot-password",
      //   element: <ForgotPasswordPage />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
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
    />
  </>
);
