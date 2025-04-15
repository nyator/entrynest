import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import LoadingScreen from "../components/LoadingScreen";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CustomDropdown from "../components/CustomDropdown"; 

import { skillsList, locationOptions } from "../constants/index";


import { IoPersonCircleOutline } from "react-icons/io5";
import { HiPlusCircle } from "react-icons/hi2";
import { HiMiniDocumentText } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { TbLocationFilled } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";


const ProfilePage = () => {
  const { user, setUser } = useAuthStore();
  const [profileData, setProfileData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    companyName: user?.companyName || "",
    biography: user?.biography || "",
    location: user?.location || "",
    telNumber: user?.telNumber || "",
    skills: user?.skills || [],
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState(profileData.skills || []); 
  

  useEffect(() => {
    if (user) {
      console.log("User data loaded:", user);
      setProfileData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        avatar: user.avatar || "",
        companyName: user.companyName || "",
        biography: user.biography || "",
        location: user.location || "",
        telNumber: user.telNumber || "",
        skills: user.skills || [],
      });
      setAvatarPreview(user.avatar || "");
      setSkills(user.skills || []);
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telNumber" && (isNaN(value) || value.length > 9)) {
      return; // Prevent non-numeric input or input longer than 9 digits
    }
    setProfileData({ ...profileData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, avatar: file });
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleLocationChange = (selectedLocation) => {
    setProfileData({ ...profileData, location: selectedLocation });
  };

  const handleAddSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", profileData.firstname);
    formData.append("lastname", profileData.lastname);
    formData.append("email", profileData.email);
    formData.append("avatar", profileData.avatar);
    formData.append("companyName", profileData.companyName);
    formData.append("biography", profileData.biography);
    formData.append("location", profileData.location);
    formData.append("telNumber", profileData.telNumber);
    formData.append("skills", skills.join(", ")); // Save skills as a comma-separated string

    try {
      const response = await axios.put("/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(response.data.user);
      setAvatarPreview(`${axios.defaults.baseURL}${response.data.user.avatar}`); // Use the full URL for the avatar
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="mx-auto p-4 leading-normal font-SatoshiMedium text-sm">
      <nav className="mb-4 leading-normal text-gray-600 text-breadcrumb inline-flex items-center text-black/70 gap-2">
        {user.role === "employer" && (
          <>
            <span className="text-black/70 font-bold inline-flex items-center">
              <MdSpaceDashboard className="inline-block mr-1" />
              <Link to="/em-dashboard" className="hover:underline">
                Employer Dashboard
              </Link>{" "}
            </span>
            /
            <span className="text-black/40 font-bold inline-flex items-center">
              <HiMiniDocumentText className="inline-block mr-1" />
              Profile
            </span>
          </>
        )}
        {user.role === "admin" && (
          <>
            <span className="text-black/70 font-bold inline-flex items-center">
              <MdSpaceDashboard className="inline-block mr-1" />
              <Link to="/admin-dashboard" className="hover:underline">
                Admin Dashboard
              </Link>{" "}
            </span>
            /
            <span className="text-black/40 font-bold inline-flex items-center">
              <HiMiniDocumentText className="inline-block mr-1" />
              Profile
            </span>
          </>
        )}
        {user.role === "jobseeker" && (
          <>
            <span className="text-black/70 font-bold inline-flex items-center">
              <MdSpaceDashboard className="inline-block mr-1" />
              <Link to="/jobs" className="hover:underline">
                Home
              </Link>{" "}
            </span>
            /
            <span className="text-black/40 font-bold inline-flex items-center">
              <HiMiniDocumentText className="inline-block mr-1" />
              Profile
            </span>
          </>
        )}
      </nav>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
          <div className="rounded-full bg-slate-200 w-fit relative">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="size-20 rounded-full object-cover border-2 border-black/50 transition-opacity ease-in-out duration-300"
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop
                }}
                onLoad={(e) => {
                  e.target.style.opacity = 1; // Fade-in effect
                }}
                onClick={() => document.getElementById("avatarInput").click()}
                onMouseEnter={(e) => (e.currentTarget.style.cursor = "pointer")}
                onMouseLeave={(e) => (e.currentTarget.style.cursor = "default")}
              />
            ) : (
              <IoPersonCircleOutline className="text-gray-500 size-20" />
            )}
            <button
              type="button"
              onClick={() => document.getElementById("avatarInput").click()}
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              <HiPlusCircle className="text-xl" />
            </button>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 leading-normal md:w-4/6 mx-auto">
          {user.role === "employer" && (
            <div className="mb-4 leading-normal">
              <label className="block text-gray-700">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={profileData.companyName}
                onChange={handleChange}
                className="w-full inline-flex bg-white border-[1px] border-grayStroke rounded-lg p-2"
              />
            </div>
          )}

          <div className="mb-4 leading-normal">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstname"
              value={profileData.firstname}
              onChange={handleChange}
              className="w-full inline-flex bg-white border-[1px] border-grayStroke rounded-lg p-2"
            />
          </div>

          <div className="mb-4 leading-normal">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-full inline-flex bg-white border-[1px] border-grayStroke rounded-lg p-2 text-black/50"
              disabled
            />
          </div>

          <div className="mb-4 leading-normal">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={profileData.lastname}
              onChange={handleChange}
              className="w-full inline-flex bg-white border-[1px] border-grayStroke rounded-lg p-2"
            />
          </div>
          <div className="mb-4 leading-normal">
            <label className="block text-gray-700">Location</label>
            <CustomDropdown
              options={locationOptions}
              value={profileData.location}
              onChange={handleLocationChange}
              placeholder="Select Your Location"
              icon={
                <TbLocationFilled className="text-breadcrumb text-black/50" />
              }
            />
          </div>
          <div className="mb-4 leading-normal">
            <label className="block text-gray-700">Telephone Number</label>
            <div className="relative">
              <input
                type="text"
                name="telNumber"
                value={profileData.telNumber}
                onChange={handleChange}
                className="w-full pl-12 bg-white border-[1px] border-grayStroke rounded-lg p-2 tracking-wider"
              />
              <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black/70">
                +233
              </span>
            </div>
          </div>
          {user.role === "jobseeker" && (
            <div className="mb-4 leading-normal">
              <div className="">
                <label className="block text-gray-700 relative">
                  Skills
                </label>
                <CustomDropdown
                  options={skillsList.filter(
                    (skill) => !skills.includes(skill)
                  )}
                  value=""
                  onChange={handleAddSkill}
                  placeholder="Choose Your skills"
                />
              </div>

              <div className="flex flex-wrap gap-2 mt-2 md:absolute md:max-w-sm">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center hover:translate-y-[-1px] border border-gray shadow-sm bg-white text-blue-500 px-3 py-1 rounded-full transition-all ease-in-out duration-200"
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
          )}
          <div className="mb-4 leading-normal">
            <label className="block text-gray-700">Biography</label>
            <textarea
              name="biography"
              value={profileData.biography}
              onChange={handleChange}
              className="w-full inline-flex bg-white border-[1px] border-grayStroke rounded-lg p-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-4 leading-normal mx-auto flex w-fit h-fit"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
