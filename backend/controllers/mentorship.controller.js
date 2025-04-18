import { Mentorship } from "../models/mentorship.model.js";

export const createMentorship = async (req, res) => {
  const { title, description, skillsRequired, duration, maxApplicants } = req.body;

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
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
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
  const userId = req.userId; // Ensure `req.userId` is populated by authentication middleware

  try {
    const mentorship = await Mentorship.findById(mentorshipId);

    if (!mentorship) {
      return res.status(404).json({ success: false, message: "Mentorship not found." });
    }

    // Check if the user has already applied
    const alreadyApplied = mentorship.applicants.some((applicant) => applicant.toString() === userId);
    if (alreadyApplied) {
      return res.status(400).json({ success: false, message: "You have already applied to this mentorship." });
    }

    // Check if the mentorship has reached the maximum number of applicants
    if (mentorship.currentApplicants >= mentorship.maxApplicants) {
      return res.status(400).json({ success: false, message: "This mentorship has reached its maximum number of applicants." });
    }

    // Add the user to the list of applicants
    mentorship.applicants.push(userId);
    mentorship.currentApplicants += 1; // Increment the currentApplicants count
    await mentorship.save();

    res.status(200).json({ success: true, message: "Application submitted successfully." });
  } catch (error) {
    console.error("Error applying to mentorship:", error);
    res.status(500).json({
      success: false,
      message: "Failed to apply to mentorship.",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
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
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getMentorshipApplicants = async (req, res) => {
  try {
    const mentorships = await Mentorship.find({ mentor: req.userId }) // Fetch mentorships created by the logged-in mentor
      .populate("applicants", "firstname lastname email") // Populate applicant details
      .select("title applicants"); // Select relevant fields

    if (!mentorships || mentorships.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No mentorship applicants found.",
      });
    }

    res.status(200).json({
      success: true,
      mentorships,
    });
  } catch (error) {
    console.error("Error fetching mentorship applicants:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentorship applicants.",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getApprovedMentees = async (req, res) => {
  try {
    const mentorships = await Mentorship.find({ mentor: req.userId })
      .populate("applicants", "firstname lastname email")
      .select("applicants");

    const mentees = mentorships.flatMap((mentorship) =>
      mentorship.applicants.filter((applicant) => applicant.status === "approved")
    );

    res.status(200).json({
      success: true,
      mentees,
    });
  } catch (error) {
    console.error("Error fetching approved mentees:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch approved mentees",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const deleteMentorship = async (req, res) => {
  const { mentorshipId } = req.params;
  const userId = req.userId; // Ensure `req.userId` is populated by authentication middleware

  try {
    const mentorship = await Mentorship.findById(mentorshipId);

    if (!mentorship) {
      return res.status(404).json({ success: false, message: "Mentorship not found." });
    }

    // Check if the logged-in user is the mentor who created the mentorship
    if (mentorship.mentor.toString() !== userId) {
      return res.status(403).json({ success: false, message: "You are not authorized to delete this mentorship." });
    }

    await mentorship.deleteOne();

    res.status(200).json({ success: true, message: "Mentorship deleted successfully." });
  } catch (error) {
    console.error("Error deleting mentorship:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete mentorship.",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
