import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";
import CustomDropdown from "../components/CustomDropdown";

import { HiMiniDocumentText } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { IoMdPricetags } from "react-icons/io";
import { ImSpinner6 } from "react-icons/im";

const SKILLS = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "Go",
  "Rust",
  "TypeScript",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "Laravel",
  "Ruby on Rails",
  "ASP.NET",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "GraphQL",
  "RESTful APIs",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud",
  "DevOps",
  "CI/CD",
  "Git",
  "Linux",
  "Shell Scripting",
  "Machine Learning",
  "Data Science",
  "Artificial Intelligence",
  "Blockchain",
  "Cybersecurity",
  "UI/UX Design",
  "Product Management",
  "Agile/Scrum",
  "Project Management",
  "Technical Writing",
];

const EditMentorshipPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingUpdateMentorship, setLoadingUpdateMentorship] = useState(false); // Add loading state for update mentorship
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    duration: "",
    maxApplicants: "",
  });

  useEffect(() => {
    const fetchMentorship = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/mentorships/${id}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          const mentorship = response.data.mentorship;
          setSelectedSkills(mentorship.skillsRequired);
          setFormData({
            title: mentorship.title,
            description: mentorship.description,
            skillsRequired: mentorship.skillsRequired.join(", "),
            duration: mentorship.duration,
            maxApplicants: mentorship.maxApplicants,
          });
        }
      } catch (error) {
        console.error("Error fetching mentorship:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch mentorship"
        );
        navigate("/mentor-dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchMentorship();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setFormData((prev) => ({
        ...prev,
        skillsRequired: [...selectedSkills, skill].join(", "),
      }));
    }
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    setFormData((prev) => ({
      ...prev,
      skillsRequired: selectedSkills.filter((s) => s !== skill).join(", "),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingUpdateMentorship(true); // Set loading state
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/mentorships/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Mentorship updated successfully");
        navigate("/mentor-dashboard");
      }
    } catch (error) {
      console.error("Error updating mentorship:", error);
      toast.error(
        error.response?.data?.message || "Failed to update mentorship"
      );
    } finally {
      setLoadingUpdateMentorship(false); // Reset loading state
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 font-SatoshiMedium text-sm">
      {/* Breadcrumb */}
      <nav className="mb-4 text-gray-600 text-breadcrumb inline-flex items-center text-black/70 gap-2">
        <span className="text-black/70 font-bold inline-flex items-center">
          <MdSpaceDashboard className="inline-block mr-1" />
          <Link to="/mentor-dashboard" className="hover:underline">
            Mentor Dashboard
          </Link>{" "}
        </span>
        /{" "}
        <span className="text-black/40 font-bold inline-flex items-center">
          <HiMiniDocumentText className="inline-block mr-1" />
          Edit Mentorship
        </span>
      </nav>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div className="w-full mr-4">
            <div className="mb-4">
              <label className="block text-black/60">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70"
                placeholder="Enter mentorship title"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black/60">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70"
                placeholder="e.g., 3 months"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black/60">Max Applicants</label>
              <input
                type="number"
                name="maxApplicants"
                value={formData.maxApplicants}
                onChange={handleChange}
                className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70"
                placeholder="Enter maximum number of applicants"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black/60">Skills Required</label>
              <CustomDropdown
                options={SKILLS.filter(
                  (skill) => !selectedSkills.includes(skill)
                )}
                value=""
                onChange={handleSkillChange}
                placeholder="Select a skill"
                icon={<IoMdPricetags className="text-black/50" />}
              />
              <div className="flex flex-wrap mt-2 gap-2">
                {selectedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="hover:translate-y-[0.5px] flex items-center border border-gray shadow-sm bg-white text-blue-500 px-3 py-1 rounded-full"
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
          </div>

          <div className="w-full">
            <div className="mb-4">
              <label className="block text-black/60">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border-[1px] border-grayStroke rounded-lg p-2 text-black/70 h-48"
                placeholder="Describe the mentorship opportunity"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
            disabled={loadingUpdateMentorship} // Disable button while loading
          >
            {loadingUpdateMentorship ? (
              <ImSpinner6 className="animate-spin text-white mx-4" />
            ) : (
              "Update Mentorship"
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate("/mentor-dashboard")}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMentorshipPage;
