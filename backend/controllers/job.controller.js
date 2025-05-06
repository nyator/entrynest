import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js"; // Import User model
import { 
  sendNewPostingNotification, 
  sendApplicationApprovedEmail,
  sendApplicationDeclinedEmail 
} from "../utils/emailService.js";
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.VITE_API_URL || "http://localhost:3000"; // Define API base URL

export const createJob = async (req, res) => {
  const {
    salaryRange,
    title,
    location,
    tags,
    type,
    style,
    aboutRole,
    qualification,
    responsibility,
    companyName,
    externalLinks, // Add externalLinks field
  } = req.body;

  try {
    const user = await User.findById(req.userId); // Fetch the user to check their role
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const job = new Job({
      title,
      location,
      type,
      tags,
      style,
      aboutRole,
      qualification,
      responsibility,
      salaryRange,
      companyName: user.role === "admin" ? companyName : user.companyName, // Use provided companyName only if admin
      postedBy: req.userId,
      externalLinks, // Save externalLinks in the job document
    });

    await job.save();

    // Send notifications to jobseekers
    const jobseekers = await User.find({ role: "jobseeker" });
    const postingUrl = `${process.env.CLIENT_URL}/jobs/${job._id}`; // Assuming you have a frontend URL in your env

    for (const jobseeker of jobseekers) {
      try {
        await sendNewPostingNotification(
          jobseeker.email,
          jobseeker.firstname,
          {
            type: "Job",
            title: job.title,
            companyName: job.companyName,
            location: job.location,
            jobType: job.type,
            salaryRange: job.salaryRange,
            postingUrl
          }
        );
      } catch (error) {
        console.error(`Failed to send notification to ${jobseeker.email}:`, error);
        // Continue with other notifications even if one fails
      }
    }

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
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "firstname lastname avatar companyName");
    const userId = req.userId;

    const jobsWithApplicationStatus = jobs.map((job) => ({
      ...job._doc,
      applications: job.applications.map((app) => ({
        ...app,
        cvUrl: app.cvUrl ? `${API_URL}/${app.cvUrl}` : null, // Include full CV URL
      })),
      postedBy: {
        ...job.postedBy._doc,
        avatar: job.postedBy.avatar
          ? `${process.env.API_URL}${job.postedBy.avatar}`
          : null,
      },
      hasApplied: job.applications.some(
        (application) => application.user.toString() === userId
      ),
    }));

    res.status(200).json({
      success: true,
      jobs: jobsWithApplicationStatus,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "firstname lastname"
    );
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
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
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

    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete job",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const applyForJob = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required." });
    }

    const { id } = req.params;
    const { message } = req.body;
    const cv = req.file?.path;

    if (!cv) {
      console.error("CV file is missing in the request.");
      return res
        .status(400)
        .json({ success: false, message: "CV is required" });
    }

    const job = await Job.findById(id);

    if (!job) {
      console.error(`Job with ID ${id} not found.`);
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const application = {
      user: req.userId,
      message,
      cvUrl: `${API_URL}/${cv.replace(/\\/g, "/")}`, // Ensure the full URL is returned
    };

    job.applications.push(application);
    await job.save();

    res
      .status(201)
      .json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({
      message: error.message || "Failed to apply for the job.",
    });
  }
};

export const getEmployerApplications = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.userId }).populate(
      "applications.user",
      "firstname lastname email"
    );

    if (!jobs) {
      return res
        .status(404)
        .json({ success: false, message: "No jobs found for this employer" });
    }

    const applications = jobs.flatMap((job) =>
      job.applications.map((app) => ({
        jobId: job._id,
        jobTitle: job.title,
        ...app.toObject(),
        cvUrl: app.cvUrl ? `${API_URL}/${app.cvUrl.replace(/\\/g, "/")}` : null, // Ensure the full URL is returned
      }))
    );

    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("Error fetching employer applications:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getEmployerJobs = async (req, res) => {
  try {
    if (!req.userId) {
      console.error("User ID is missing in the request.");
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - User ID missing" });
    }

    console.log("Fetching jobs for employer with ID:", req.userId);

    const jobs = await Job.find({ postedBy: req.userId }).lean(); // Use .lean() for better performance

    if (!jobs || jobs.length === 0) {
      console.log("No jobs found for employer with ID:", req.userId);
      return res
        .status(404)
        .json({ success: false, message: "No jobs found for this employer" });
    }

    // Add application count to each job
    const jobsWithApplicationCount = jobs.map((job) => ({
      ...job,
      applicationCount: job.applications.length,
    }));

    res.status(200).json({ success: true, jobs: jobsWithApplicationCount });
  } catch (error) {
    console.error("Error fetching employer jobs:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employer jobs",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const editJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    console.log("Editing job with ID:", id);
    console.log("Updates:", updates);

    const job = await Job.findOneAndUpdate(
      { _id: id, postedBy: req.userId }, // Ensure the job belongs to the logged-in user
      updates,
      { new: true, runValidators: true } // Return the updated job and validate the updates
    );

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found or unauthorized" });
    }

    res
      .status(200)
      .json({ success: true, message: "Job updated successfully", job });
  } catch (error) {
    console.error("Error editing job:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to edit job",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { jobId, applicationId } = req.params;
    const { status } = req.body; // "approved" or "declined"

    if (!["approved", "declined"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const job = await Job.findById(jobId).populate('postedBy', 'companyName');

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const application = job.applications.id(applicationId);

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    application.status = status; // Update the application status

    if (status === "declined") {
      application.archived = true; // Mark the application as archived
    }

    await job.save();

    // Send appropriate email notification to the jobseeker
    try {
      const jobseeker = await User.findById(application.user);
      if (jobseeker) {
        if (status === "approved") {
          await sendApplicationApprovedEmail(
            jobseeker.email,
            jobseeker.firstname,
            {
              jobTitle: job.title,
              companyName: job.postedBy.companyName,
              jobUrl: `${process.env.FRONTEND_URL}/jobs/${job._id}`
            }
          );
        } else if (status === "declined") {
          await sendApplicationDeclinedEmail(
            jobseeker.email,
            jobseeker.firstname,
            {
              jobTitle: job.title,
              companyName: job.postedBy.companyName,
              jobsUrl: `${process.env.FRONTEND_URL}/jobs`
            }
          );
        }
      }
    } catch (error) {
      console.error('Error sending status notification:', error);
      // Don't fail the request if the email fails to send
    }

    res
      .status(200)
      .json({ success: true, message: `Application ${status} successfully` });
  } catch (error) {
    console.error("Error updating application status:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update application status",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getAllSubmittedCVs = async (req, res) => {
  try {
    const jobs = await Job.find().populate(
      "applications.user",
      "firstname lastname email"
    );

    const applications = jobs.flatMap((job) =>
      job.applications.map((app) => ({
        jobId: job._id,
        jobTitle: job.title,
        employerId: job.postedBy,
        user: app.user,
        cvUrl: app.cvUrl, // Include the CV URL
        message: app.message, // Include the applicant's message
        status: app.status, // Include the application status
      }))
    );

    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("Error fetching submitted CVs:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch submitted CVs",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.userId;

    // Check if a file was uploaded
    if (!req.file) {
      console.error("Resume file is missing in the request.");
      return res.status(400).json({ message: "Resume file is required." });
    }

    // Validate job existence
    const job = await Job.findById(jobId);
    if (!job) {
      console.error(`Job with ID ${jobId} not found.`);
      return res.status(404).json({ message: "Job not found." });
    }

    // Check if the user has already applied
    const alreadyApplied = job.applications.some(
      (application) => application.user.toString() === userId
    );
    if (alreadyApplied) {
      console.error(`User with ID ${userId} has already applied for job ${jobId}.`);
      return res.status(400).json({ message: "You have already applied for this job." });
    }

    // Add the application to the job
    const application = {
      user: userId,
      cvUrl: req.file.path, // Ensure cvUrl is explicitly set
      message: req.body.message || "", // Optional message
    };

    // Use `updateOne` to add the application without modifying `updatedAt`
    await Job.updateOne(
      { _id: jobId },
      { $push: { applications: application } },
      { timestamps: false } // Prevent `updatedAt` from being updated
    );

    console.log(`Application submitted successfully for job ${jobId} by user ${userId}.`);
    res.status(200).json({ message: "Application submitted successfully." });
  } catch (error) {
    console.error("Error applying to job:", error.message);
    res.status(500).json({ message: "Failed to apply to the job." });
  }
};
