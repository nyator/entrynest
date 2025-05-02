import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { button } from "../constants/styles";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // Import auth store to get user role

import { TbLocationFilled } from "react-icons/tb";
import { HiOfficeBuilding } from "react-icons/hi";
import { PiOfficeChairFill } from "react-icons/pi";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCediSign } from "react-icons/fa6";
import { IoMdPricetags } from "react-icons/io";

import CustomDropdown from "../components/CustomDropdown";

import {
  jobTypes,
  locationOptions,
  jobStyles,
  jobCategory,
  salaryRanges,
} from "../constants/index";

const PostJob = () => {
  const { user } = useAuthStore(); // Get the logged-in user's details
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobTags, setJobTags] = useState([]);
  const [jobType, setJobType] = useState("");
  const [jobStyle, setJobStyle] = useState("");
  const [companyName, setCompanyName] = useState(""); // New state for company name
  const [aboutRole, setAboutRole] = useState("");
  const [qualification, setQualification] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading animation
  const navigate = useNavigate();

  const handleAddTag = (tag) => {
    if (!jobTags.includes(tag)) {
      setJobTags([...jobTags, tag]);
    }
  };

  const handleRemoveTag = (tag) => {
    setJobTags(jobTags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation
    try {
      await axios.post(
        "http://localhost:3000/api/jobs",
        {
          title: jobTitle,
          location: jobLocation,
          type: jobType,
          tags: jobTags,
          style: jobStyle,
          companyName: user.role === "admin" ? companyName : undefined, // Include companyName only if admin
          aboutRole,
          qualification,
          responsibility,
          salaryRange,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Job posted successfully!");
      setJobTitle("");
      setJobLocation("");
      setJobType("");
      setJobStyle("");
      setJobTags([]);
      setCompanyName("");
      setAboutRole("");
      setQualification("");
      setResponsibility("");
      setSalaryRange("");
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job.");
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  const handleClear = () => {
    setJobTitle("");
    setJobStyle("");
    setJobLocation("");
    setJobType("");
    setJobTags([]);
    setCompanyName("");
    setAboutRole("");
    setQualification("");
    setResponsibility("");
    setSalaryRange("");
  };

  return (
    <div className="container mx-auto p-4 font-SatoshiMedium text-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div className="w-full mr-4">
            {user.role === "admin" && ( // Render company name input only for admin
              <div className="mb-4">
                <label className="block text-black/60">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70"
                  placeholder="Enter Company Name"
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-black/60">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70"
                placeholder="Job Title"
                title="Job title should only contain letters and spaces."
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black/60">Location</label>
              <CustomDropdown
                options={locationOptions}
                value={jobLocation}
                onChange={setJobLocation}
                placeholder="Select Job Location"
                icon={<TbLocationFilled className="text-black/50" />}
              />
            </div>

            <div className="mb-4">
              <label className="block text-black/60">Work Style</label>
              <CustomDropdown
                options={jobStyles}
                value={jobStyle}
                onChange={setJobStyle}
                placeholder="Select Work Style"
                icon={<PiOfficeChairFill className="text-black/50" />}
              />
            </div>

            <div className="mb-4">
              <label className="block text-black/60">Job Type</label>
              <CustomDropdown
                options={jobTypes}
                value={jobType}
                onChange={setJobType}
                placeholder="Select Job Type"
                icon={<HiOfficeBuilding className="text-black/50" />}
              />
            </div>

            <div className="mb-4">
              <label className="block text-black/60">
                Salary Range {"(GH₵)"}
              </label>
              <CustomDropdown
                options={salaryRanges}
                value={salaryRange}
                onChange={setSalaryRange}
                placeholder="Select Salary Range"
                icon={<FaCediSign className="text-black/50" />}
              />
            </div>
          </div>

          <div className="w-full">
            <div className="mb-4">
              <label className="block text-black/60">Tags</label>
              <CustomDropdown
                options={jobCategory}
                value=""
                onChange={handleAddTag}
                placeholder="Select a Tag"
                icon={<IoMdPricetags className="text-black/50" />}
              />
              <div className="flex flex-wrap mt-2 gap-2">
                {jobTags.map((tag, index) => (
                  <div
                    key={index}
                    className="hover:translate-y-[0.5px] flex items-center border border-gray shadow-sm bg-white text-blue-500 px-3 py-1 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-2 textblack/50"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <IoIosCloseCircle className="text-black/60" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-black/60">About Role</label>
              <textarea
                value={aboutRole}
                onChange={(e) => setAboutRole(e.target.value)}
                className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70"
                placeholder="Describe the role"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black/60">Qualification</label>
              <textarea
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70"
                placeholder="List the qualifications"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black/60">Responsibility</label>
              <textarea
                value={responsibility}
                onChange={(e) => setResponsibility(e.target.value)}
                className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70"
                placeholder="List the responsibilities"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            type="submit"
            className={`${button} text-sm font-SatoshiMedium flex items-center`}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : null}
            {isLoading ? "Posting..." : "Post Job"}
          </button>
          <button
            type="button"
            className={`font-normal text-primary text-sm font-SatoshiMedium`}
            onClick={handleClear}
            disabled={isLoading} // Disable clear button while loading
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
