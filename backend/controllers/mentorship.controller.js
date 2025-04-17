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
    const mentorships = await Mentorship.find(); // Fetch all mentorships
    res.status(200).json({
      success: true,
      mentorships,
    });
  } catch (error) {
    console.error("Error fetching mentorships:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentorship opportunities.",
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

export const getMentorshipApplicants = async (req, res) => {
  try {
    // Fetch mentorships created by the logged-in mentor
    const mentorships = await Mentorship.find({ mentor: req.userId })
      .populate("applicants", "firstname lastname email") // Ensure applicants are populated
      .select("applicants message"); // Select only relevant fields

    if (!mentorships || mentorships.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No mentorship applicants found",
      });
    }

    // Flatten the applicants from all mentorships
    const applicants = mentorships.flatMap((mentorship) =>
      mentorship.applicants.map((applicant) => ({
        ...applicant._doc,
        message: mentorship.message, // Include the message from the mentorship
      }))
    );

    res.status(200).json({
      success: true,
      applicants,
    });
  } catch (error) {
    console.error("Error fetching mentorship applicants:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentorship applicants",
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
