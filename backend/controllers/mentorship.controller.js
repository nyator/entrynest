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

export const getMentorshipsByMentor = async (req, res) => {
  try {
    const mentorships = await Mentorship.find({ mentor: req.userId });
    res.status(200).json({
      success: true,
      mentorships,
    });
  } catch (error) {
    console.error("Error fetching mentorships:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentorship opportunities",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const applyToMentorship = async (req, res) => {
  const { mentorshipId } = req.params;

  try {
    const mentorship = await Mentorship.findById(mentorshipId);

    if (!mentorship) {
      return res.status(404).json({
        success: false,
        message: "Mentorship opportunity not found",
      });
    }

    if (mentorship.isClosed) {
      return res.status(400).json({
        success: false,
        message: "Applications for this mentorship are closed",
      });
    }

    if (mentorship.currentApplicants >= mentorship.maxApplicants) {
      mentorship.isClosed = true;
      await mentorship.save();
      return res.status(400).json({
        success: false,
        message: "Applications for this mentorship are closed",
      });
    }

    mentorship.currentApplicants += 1;

    if (mentorship.currentApplicants >= mentorship.maxApplicants) {
      mentorship.isClosed = true;
    }

    await mentorship.save();

    res.status(200).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Error applying to mentorship:", error);
    res.status(500).json({
      success: false,
      message: "Failed to apply to mentorship",
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
