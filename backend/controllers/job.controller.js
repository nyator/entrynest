import { Job } from "../models/job.model.js";

export const createJob = async (req, res) => {
  const { salaryRange, title, description, location, tag, type, style } = req.body;

  console.log("createJob - Request body:", req.body);
  console.log("createJob - User ID:", req.userId);

  try {
    const job = new Job({
      salaryRange,
      title,
      description,
      location,
      tag,
      type,
      style,
      postedBy: req.userId,
    });

    await job.save();

    console.log("Job posted successfully:", job);

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    console.error("Error details:", error.message); // Log the error message
    res.status(500).json({
      success: false,
      message: "Failed to post job",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "firstname lastname");
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    console.error("Error details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "firstname lastname");
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error("Error fetching job:", error);
    console.error("Error details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete job",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const applyToJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const cv = req.file?.path; // Ensure multer is configured correctly

    if (!cv) {
      console.error("CV file is missing in the request.");
      return res.status(400).json({ success: false, message: "CV is required" });
    }

    const job = await Job.findById(id);

    if (!job) {
      console.error(`Job with ID ${id} not found.`);
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const application = {
      user: req.userId, // Ensure `req.userId` is populated by the authentication middleware
      message,
      cvUrl: cv,
    };

    if (!req.userId) {
      console.error("User ID is missing in the request. Ensure authentication middleware is working.");
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    job.applications.push(application);
    await job.save();

    res.status(201).json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying to job:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      success: false,
      message: "Failed to apply to job",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getEmployerApplications = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.userId }).populate("applications.user", "firstname lastname email");

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ success: false, message: "No jobs found for this employer" });
    }

    const applications = jobs.flatMap((job) => 
      job.applications.map((app) => ({
        jobId: job._id,
        jobTitle: job.title,
        ...app.toObject(),
      }))
    );

    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("Error fetching employer applications:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
