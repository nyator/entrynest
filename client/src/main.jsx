import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

import LandingPage from "../src/pages/LandingPage"//ALSO JOB_SEARCH PAGE
import Layout from "./Layout";
import NotFoundPage from "./pages/notFoundPage"
import FindTalentPage from "./pages/FIndTalentPage";
import CommunityPage from "./pages/CommunityPage";

import LoginPage from "../src/pages/LoginPage"
import SignupPage from "../src/pages/SignupPage"
import SupportPage from "./pages/SupportPage";


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
        path: "/join_login",
        element: <LoginPage />
      },
      {
        path: "/join_signup",
        element: <SignupPage />
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

