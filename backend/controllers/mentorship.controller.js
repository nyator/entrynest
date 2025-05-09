import { Mentorship } from "../models/mentorship.model.js";
import { User } from "../models/user.model.js";
import {
  sendNewMentorshipPostingNotification,
  sendMentorshipApprovedEmail,
  sendMentorshipDeclinedEmail,
} from "../utils/emailService.js";

export const createMentorship = async (req, res) => {
  const { title, description, skillsRequired, duration, maxApplicants } =
    req.body;

  try {
    const mentorship = new Mentorship({
      title,
      description,
      skillsRequired,
      duration,
      maxApplicants,
      mentor: req.userId,
    });

    await mentorship.save();

    // Send notifications to jobseekers
    const jobseekers = await User.find({ role: "jobseeker" });
    const postingUrl = `${process.env.FRONTEND_URL}/mentorships/${mentorship._id}`; // Assuming you have a frontend URL in your env

    for (const jobseeker of jobseekers) {
      try {
        await sendNewMentorshipPostingNotification(jobseeker.email, jobseeker.firstname, {
          type: "Mentorship",
          title: mentorship.title,
          companyName: "Mentorship Program", // Since mentorships don't have company names
          location: "Remote", // Default to remote since mentorships are typically remote
          jobType: mentorship.duration,
          salaryRange: "", // Mentorships don't have salary ranges
          postingUrl,
        });
      } catch (error) {
        console.error(
          `Failed to send notification to ${jobseeker.email}:`,
          error
        );
        // Continue with other notifications even if one fails
      }
    }

    res.status(201).json({
      success: true,
      message: "Mentorship opportunity created successfully",
      mentorship,
    });
  } catch (error) {
    console.error("Error creating mentorship:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create mentorship opportunity",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getMentorships = async (req, res) => {
  try {
    const mentorships = await Mentorship.find();
    res.status(200).json({
      success: true,
      mentorships,
    });
  } catch (error) {
    console.error("Error fetching mentorships:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentorship opportunities.",
    });
  }
};

export const applyToMentorship = async (req, res) => {
  const { mentorshipId } = req.params;
  const userId = req.userId;
  const { message } = req.body;

  try {
    const mentorship = await Mentorship.findById(mentorshipId);

    if (!mentorship) {
      return res
        .status(404)
        .json({ success: false, message: "Mentorship not found." });
    }

    // Check if the user has already applied
    const alreadyApplied = mentorship.applicants.some(
      (applicant) => applicant.user.toString() === userId.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this mentorship.",
      });
    }

    // Check if the mentorship has reached the maximum number of applicants
    if (mentorship.currentApplicants >= mentorship.maxApplicants) {
      return res.status(400).json({
        success: false,
        message:
          "This mentorship has reached its maximum number of applicants.",
      });
    }

    // Add the user to the list of applicants with message and default status
    mentorship.applicants.push({ user: userId, message, status: "pending" });
    mentorship.currentApplicants += 1;
    await mentorship.save();

    res.status(200).json({
      success: true,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error("Error applying to mentorship:", error);
    res.status(500).json({
      success: false,
      message: "Failed to apply to mentorship.",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getMentorshipApplications = async (req, res) => {
  try {
    const applications = await Mentorship.find({ mentor: req.userId })
      .populate("applicants", "firstname lastname email")
      .select("applicants message");

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error fetching mentorship applications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentorship applications",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getMentorshipApplicants = async (req, res) => {
  try {
    const { mentorshipId } = req.params;

    const mentorship = await Mentorship.findById(mentorshipId).populate({
      path: "applicants.user",
      select: "firstname lastname email avatar skills biography role",
    });

    if (!mentorship) {
      return res.status(404).json({ message: "Mentorship not found" });
    }

    // Filter applicants to only include jobseekers
    const jobseekerApplicants = mentorship.applicants.filter(
      (applicant) => applicant.user && applicant.user.role === "jobseeker"
    );

    // Map applicants to include user details at top level for frontend convenience
    const applicantsWithUserDetails = jobseekerApplicants.map((applicant) => ({
      _id: applicant._id,
      status: applicant.status,
      message: applicant.message,
      ...(applicant.user ? applicant.user.toObject() : {}),
    }));

    res.status(200).json({
      success: true,
      applicants: applicantsWithUserDetails,
    });
  } catch (error) {
    console.error(
      "Error fetching mentorship applicants:",
      error.stack || error
    );
    res.status(500).json({ message: "Error fetching mentorship applicants" });
  }
};

export const getAllMentorshipApplicants = async (req, res) => {
  try {
    const mentorships = await Mentorship.find({ mentor: req.userId }).populate({
      path: "applicants.user",
      select: "firstname lastname email avatar skills biography role",
    });

    if (!mentorships || mentorships.length === 0) {
      return res.status(200).json({ success: true, applicants: [] });
    }

    const allApplicants = mentorships.flatMap((mentorship) =>
      mentorship.applicants.map((applicant) => ({
        _id: applicant._id,
        status: applicant.status,
        message: applicant.message,
        mentorshipId: mentorship._id,
        mentorshipTitle: mentorship.title,
        ...(applicant.user ? applicant.user.toObject() : {}),
      }))
    );

    res.status(200).json({ success: true, applicants: allApplicants });
  } catch (error) {
    console.error("Error fetching all mentorship applicants:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch applicants." });
  }
};

export const getApprovedMentees = async (req, res) => {
  try {
    const mentorships = await Mentorship.find({ mentor: req.userId }).populate({
      path: "applicants.user",
      select: "firstname lastname email",
    });

    if (!mentorships || mentorships.length === 0) {
      return res.status(200).json({
        success: true,
        mentees: [],
      });
    }

    const mentees = mentorships.flatMap((mentorship) =>
      mentorship.applicants
        .filter(
          (applicant) => applicant.status === "approved" && applicant.user
        )
        .map((applicant) => ({
          _id: applicant.user._id,
          firstname: applicant.user.firstname,
          lastname: applicant.user.lastname,
          email: applicant.user.email,
          message: applicant.message,
        }))
    );

    res.status(200).json({
      success: true,
      mentees,
    });
  } catch (error) {
    console.error("Error fetching approved mentees:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch approved mentees.",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

const updateApplicantStatus = async (req, res, status) => {
  try {
    const { mentorshipId, applicantId } = req.params;

    console.log("Mentorship ID:", mentorshipId); // Debugging
    console.log("Applicant ID:", applicantId); // Debugging

    // Fetch the mentorship document
    const mentorship = await Mentorship.findById(mentorshipId).populate(
      "applicants.user"
    );

    if (!mentorship) {
      console.log("Mentorship not found");
      return res
        .status(404)
        .json({ success: false, message: "Mentorship not found" });
    }

    // Ensure the logged-in user is the mentor of the mentorship
    if (mentorship.mentor.toString() !== req.userId) {
      console.log("Unauthorized action by user:", req.userId);
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized action" });
    }

    console.log(
      "Fetched Mentorship Applicants:",
      mentorship.applicants.map((app) => ({
        applicantId: app._id.toString(),
        userId: app.user._id.toString(),
      }))
    ); // Debugging

    // Find the applicant by their `_id` or `user` field
    const applicant = mentorship.applicants.find(
      (applicant) =>
        applicant._id.toString() === applicantId ||
        applicant.user._id.toString() === applicantId
    );

    if (!applicant) {
      console.log("Applicant not found in mentorship");
      return res
        .status(404)
        .json({ success: false, message: "Applicant not found" });
    }

    // Update the applicant's status
    applicant.status = status;
    await mentorship.save();

    // Send email notification to the applicant
    if (status === "approved") {
      await sendMentorshipApprovedEmail(
        applicant.user.email,
        applicant.user.firstname,
        {
          title: mentorship.title,
          // mentorshipUrl: `${process.env.FRONTEND_URL}/mentorships/${mentorship._id}`,
        }
      );
    } else if (status === "declined") {
      await sendMentorshipDeclinedEmail(
        applicant.user.email,
        applicant.user.firstname,
        {
          title: mentorship.title,
          // mentorshipsUrl: `${process.env.FRONTEND_URL}/mentorships`,
        }
      );
    }

    console.log(`Applicant status updated to ${status}`);
    res
      .status(200)
      .json({ success: true, message: `Applicant ${status} successfully` });
  } catch (error) {
    console.error(`Error updating applicant status to ${status}:`, error);
    res
      .status(500)
      .json({ success: false, message: `Failed to ${status} applicant` });
  }
};

export const approveApplicant = (req, res) =>
  updateApplicantStatus(req, res, "approved");
export const declineApplicant = (req, res) =>
  updateApplicantStatus(req, res, "declined");

export const deleteMentorship = async (req, res) => {
  const { mentorshipId } = req.params;
  const userId = req.userId; // Ensure `req.userId` is populated by authentication middleware

  try {
    const mentorship = await Mentorship.findById(mentorshipId);

    if (!mentorship) {
      return res
        .status(404)
        .json({ success: false, message: "Mentorship not found." });
    }

    // Check if the logged-in user is the mentor who created the mentorship
    if (mentorship.mentor.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this mentorship.",
      });
    }

    await mentorship.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Mentorship deleted successfully." });
  } catch (error) {
    console.error("Error deleting mentorship:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete mentorship.",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const updateMentorship = async (req, res) => {
  const { mentorshipId } = req.params;
  const { title, description, skillsRequired, duration, maxApplicants } =
    req.body;
  const userId = req.userId;

  try {
    const mentorship = await Mentorship.findById(mentorshipId);

    if (!mentorship) {
      return res
        .status(404)
        .json({ success: false, message: "Mentorship not found." });
    }

    // Check if the logged-in user is the mentor who created the mentorship
    if (!mentorship.mentor || mentorship.mentor.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this mentorship.",
      });
    }

    // Update the mentorship details
    mentorship.title = title || mentorship.title;
    mentorship.description = description || mentorship.description;

    // Convert skillsRequired from comma-separated string to array if it's a string
    if (typeof skillsRequired === "string") {
      mentorship.skillsRequired = skillsRequired
        .split(",")
        .map((skill) => skill.trim());
    } else if (Array.isArray(skillsRequired)) {
      mentorship.skillsRequired = skillsRequired;
    }

    mentorship.duration = duration || mentorship.duration;

    // Only update maxApplicants if it's greater than or equal to current applicants
    if (maxApplicants && maxApplicants >= mentorship.currentApplicants) {
      mentorship.maxApplicants = maxApplicants;
    } else if (maxApplicants) {
      return res.status(400).json({
        success: false,
        message: "Maximum applicants cannot be less than current applicants.",
      });
    }

    await mentorship.save();

    res.status(200).json({
      success: true,
      message: "Mentorship updated successfully",
      mentorship,
    });
  } catch (error) {
    console.error("Error updating mentorship:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update mentorship",
      errorDetails:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getMentorshipById = async (req, res) => {
  try {
    const mentorship = await Mentorship.findById(req.params.mentorshipId);
    if (!mentorship) {
      return res.status(404).json({
        success: false,
        message: "Mentorship not found",
      });
    }

    res.status(200).json({
      success: true,
      mentorship,
    });
  } catch (error) {
    console.error("Error fetching mentorship:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentorship",
      error: error.message,
    });
  }
};
