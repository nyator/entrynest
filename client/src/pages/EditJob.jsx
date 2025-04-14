import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

import { HiMiniDocumentText } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";

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
  salaryRanges,
  jobCategory, // Import jobCategory for tag options
} from "../constants/index";

const EditJob = () => {
  const { user } = useAuthStore();
  const { jobId } = useParams();
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobTags, setJobTags] = useState([]);
  const [jobType, setJobType] = useState("");
  const [jobStyle, setJobStyle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [aboutRole, setAboutRole] = useState("");
  const [qualification, setQualification] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        const job = response.data.job;
        setJobTitle(job.title);
        setJobLocation(job.location);
        setJobTags(job.tags);
        setJobType(job.type);
        setJobStyle(job.style);
        setCompanyName(job.companyName);
        setAboutRole(job.aboutRole);
        setQualification(job.qualification);
        setResponsibility(job.responsibility);
        setSalaryRange(job.salaryRange);
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Failed to fetch job details.");
      }
    };

    fetchJobDetails();
  }, [jobId]);

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
      await axios.put(
        `/jobs/${jobId}`,
        {
          title: jobTitle,
          location: jobLocation,
          type: jobType,
          tags: jobTags,
          style: jobStyle,
          companyName: user.role === "admin" ? companyName : undefined,
          aboutRole,
          qualification,
          responsibility,
          salaryRange,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Job updated successfully!");
      navigate("/em-dashboard");
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job.");
    }
  };

  return (
    <div className="container mx-auto p-4 font-SatoshiMedium text-sm">
      {/* Breadcrumb */}
      <nav className="mb-4 text-gray-600 text-breadcrumb inline-flex items-center text-black/70 gap-2">
        <span className="text-black/70 font-bold inline-flex items-center">
          <MdSpaceDashboard className="inline-block mr-1" />
          <Link to="/em-dashboard" className="hover:underline">
            Employer Dashboard
          </Link>{" "}
        </span>
        /{" "}
        <span className="text-black/40 font-bold inline-flex items-center">
          <HiMiniDocumentText className="inline-block mr-1" />
          Edit Job
        </span>
      </nav>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div className="w-full mr-4">
            {user.role === "admin" && (
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
              <label className="block text-black/60">Salary Range</label>
              <CustomDropdown
                options={salaryRanges}
                value={salaryRange}
                onChange={setSalaryRange}
                placeholder="Select Salary Range"
                icon={<FaCediSign className="text-black/50" />}
              />
            </div>
        
            <div className="mb-4">
              <label className="block text-black/60">Tags</label>
              <CustomDropdown
                options={jobCategory} // Use jobCategory for tag options
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
                      className="ml-2 text-black/50"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <IoIosCloseCircle className="text-black/60" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            </div>
            <div className="w-full">
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
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update Job
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJob;
