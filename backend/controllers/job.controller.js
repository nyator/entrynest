import { Job } from "../models/job.model.js";

export const createJob = async (req, res) => {
  const { title, description, location, tag, type } = req.body;

  console.log("createJob - Request body:", req.body);
  console.log("createJob - User ID:", req.userId);

  try {
    const job = new Job({
      title,
      description,
      location,
      tag,
      type,
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
    console.error("Error details:", error);
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
    res.status(500).json({
      success: false,
      message: "Failed to fetch job",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
