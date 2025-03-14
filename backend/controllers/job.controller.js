import { Job } from "../models/job.model.js";

export const createJob = async (req, res) => {
  const { title, description, location, type } = req.body;

  console.log("createJob - Request body:", req.body);

  try {
    const job = new Job({
      title,
      description,
      location,
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
