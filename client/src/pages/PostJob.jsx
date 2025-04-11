import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { button } from "../constants/styles";
import { useNavigate } from "react-router-dom";

import { TbLocationFilled } from "react-icons/tb";
import { HiOfficeBuilding } from "react-icons/hi";
import { PiOfficeChairFill } from "react-icons/pi";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCediSign } from "react-icons/fa6";
import { IoMdPricetags } from "react-icons/io";

import CustomDropdown from "../components/CustomDropdown";

import { jobTypes } from "../constants/index";

const PostJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobTags, setJobTags] = useState([]);
  const [jobType, setJobType] = useState("");
  const [jobStyle, setJobStyle] = useState("");
  const [aboutRole, setAboutRole] = useState("");
  const [qualification, setQualification] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
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
    try {
      await axios.post(
        "http://localhost:3000/api/jobs",
        {
          title: jobTitle,
          location: jobLocation,
          type: jobType,
          tags: jobTags,
          style: jobStyle,
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
      setAboutRole("");
      setQualification("");
      setResponsibility("");
      setSalaryRange("");
      navigate(-1);
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job.");
    }
  };

  const handleClear = () => {
    setJobTitle("");
    setJobStyle("");
    setJobLocation("");
    setJobType("");
    setJobTags([]);
    setAboutRole("");
    setQualification("");
    setResponsibility("");
    setSalaryRange("");
  };

  const locations = [
    "Greater Accra Region",
    "Ashanti Region",
    "Central Region",
    "Eastern Region",
    "Brong Ahafo Region",
    "Northern Region",
    "Upper East Region",
    "Upper West Region",
    "Western North Region",
    "North East Region",
    "Oti Region",
    "Bono East Region",
    "Ahafo Region",
    "Savannah Region",
    "Volta Region",
    "Western Region",
    "Worldwide",
  ];

  const workStyles = ["Remote", "On-site", "Hybrid"];
  // const jobTypes = ["Internship", "Mentorship", "Full-time", "Contract"];
  const tags = [
    "Sales & Marketing",
    "Aerospace",
    "Agriculture",
    "Development & IT",
    "Hospitality",
    "Finance & Accounting",
  ];
  const salaryRanges = ["0 - 1k", "1k - 3k", "3k - 5k", "Confidential"];

  return (
    <div className="container mx-auto p-4 font-SatoshiMedium text-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div className="w-full mr-4">
            <div className="mb-4">
              <label className="block text-gray-700">Job Title</label>
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
              <label className="block text-gray-700">Location</label>
              <CustomDropdown
                options={locations}
                value={jobLocation}
                onChange={setJobLocation}
                placeholder="Select Job Location"
                icon={<TbLocationFilled className="text-black/50" />}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Work Style</label>
              <CustomDropdown
                options={workStyles}
                value={jobStyle}
                onChange={setJobStyle}
                placeholder="Select Work Style"
                icon={<PiOfficeChairFill className="text-black/50" />}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Job Type</label>
              <CustomDropdown
                options={jobTypes}
                value={jobType}
                onChange={setJobType}
                placeholder="Select Job Type"
                icon={<HiOfficeBuilding className="text-black/50" />}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
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
              <label className="block text-gray-700">Tags</label>
              <CustomDropdown
                options={tags}
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
              <label className="block text-gray-700">About Role</label>
              <textarea
                value={aboutRole}
                onChange={(e) => setAboutRole(e.target.value)}
                className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70"
                placeholder="Describe the role"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Qualification</label>
              <textarea
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70"
                placeholder="List the qualifications"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Responsibility</label>
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
            className={`${button} text-sm font-SatoshiMedium`}
          >
            Post Job
          </button>
          <button
            type="button"
            className={`font-normal text-primary text-sm font-SatoshiMedium`}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
