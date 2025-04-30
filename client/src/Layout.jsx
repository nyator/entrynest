import Footer from "./components/footer";
import Navbar from "./components/navbar";
import EmNavbar from "./components/EmNavbar";
import JsNavbar from "./components/JsNavbar";
import AdminNavbar from "./components/AdminNavbar";
import MtNavbar from "./components/MtNavbar";
import { useAuthStore } from "./store/authStore";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const location = useLocation();
  const { user } = useAuthStore(); // Get the user state
  const [currentNavbar, setCurrentNavbar] = useState(null);

  useEffect(() => {
    // Dynamically update the navbar based on the user's role
    if (user?.role === "jobseeker") {
      setCurrentNavbar(<JsNavbar />);
    } else if (user?.role === "employer") {
      setCurrentNavbar(<EmNavbar />);
    } else if (user?.role === "admin") {
      setCurrentNavbar(<AdminNavbar />);
    } else if (user?.role === "mentor") {
      setCurrentNavbar(<MtNavbar />);
    } else {
      setCurrentNavbar(<Navbar />);
    }
  }, [user]); // Re-run whenever the user state changes

  useEffect(() => {
    // Update the document title based on the current route
    const routeTitles = {
      "/": "Home - entrynest",
      "/find_talent": "Find Talent - entrynest",
      "/profile": "Profile - entrynest",
      "/resources": "Resources - entrynest",
      "/community": "Community - entrynest",
      "/support": "Support - entrynest",
      "/login": "Login - entrynest",
      "/signup": "Sign Up - entrynest",
      "/signup-jobseeker": "Sign Up as Jobseeker - entrynest",
      "/verify-email": "Verify Email - entrynest",
      "/forgot-password": "Forgot Password - entrynest",
      "/reset-password": "Reset Password - entrynest",
      "/create-job": "Post a Job - entrynest",
      "/view-employers": "View Employers - entrynest",
      "/jobs": "Jobs - entrynest",
      "/jobs/:jobId": "Job Details - entrynest",
      "/job-details/:jobId": "Admin Job Details - entrynest",
      "/employer-profile/:userId": "Employer Profile - entrynest",
      "/edit-job/:jobId": "Edit Job - entrynest",
      "/mentorships": "Mentorships - entrynest",
      "/em-dashboard": "Employer Dashboard - entrynest",
      "/admin-dashboard": "Admin Dashboard - entrynest",
      "/mentor-dashboard": "Mentor Dashboard - entrynest",
      "/em-dashboard/applications/:jobId": "Job Applications - entrynest",
      "/edit-mentorship/:id": "Edit Mentorship - entrynest",
      "/mentorship-applicants/:mentorshipId": "Mentorship Applicants - entrynest",
    };

    const defaultTitle = "entrynest";
    document.title = routeTitles[location.pathname] || defaultTitle;
  }, [location.pathname]); // Re-run whenever the route changes

  return (
    <>
      <main className="w-11/12 mx-auto my-[25px]">
        {location.pathname !== "/verify-email" && currentNavbar}
        <Outlet />
        {location.pathname !== "/login" &&
          location.pathname !== "/signup" &&
          location.pathname !== "/verify-email" &&
          location.pathname !== "/forgot-password" && <Footer />}
      </main>
    </>
  );
};

export default Layout;
