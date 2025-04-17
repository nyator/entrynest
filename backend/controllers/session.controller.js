import { Session } from "../models/session.model.js";

export const getSessionsByMentor = async (req, res) => {
  try {
    const sessions = await Session.find({ mentor: req.userId })
      .populate("mentees", "firstname lastname email") // Populate mentee details
      .select("topic date time mentees"); // Select relevant fields

    res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sessions",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
