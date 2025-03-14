import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const skillsList = ["JavaScript", "React", "Node.js", "Python", "Java", "C++", "Ruby", "PHP"];

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
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, avatar: file });
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSkillsChange = (e) => {
    const { options } = e.target;
    const selectedSkills = [];
    for (const option of options) {
      if (option.selected) {
        selectedSkills.push(option.value);
      }
    }
    setProfileData({ ...profileData, skills: selectedSkills });
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
    formData.append("skills", profileData.skills);

    try {
      const response = await axios.put("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(response.data.user);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    console.log("Loading user data...");
    return <div>Loading...</div>; // Add a loading state
  }

  console.log("ProfilePage rendered");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}> 
        {user.role === "jobseeker" && (
          <>

          
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstname"
                value={profileData.firstname}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={profileData.lastname}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Skills</label>
              <select
                multiple
                name="skills"
                value={profileData.skills}
                onChange={handleSkillsChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                {skillsList.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        {user.role === "employer" && (
          
          <div className="mb-4">
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={profileData.companyName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full text-black/40"
            disabled
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Avatar</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          {avatarPreview && (
            <img
            src={avatarPreview}
            alt="Avatar Preview"
            className="mt-2 w-32 h-32 rounded-full"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Biography</label>
          <textarea
            name="biography"
            value={profileData.biography}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Telephone Number</label>
          <input
            type="text"
            name="telNumber"
            value={profileData.telNumber}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
