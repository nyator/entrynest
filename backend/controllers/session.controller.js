import { Session } from "../models/session.model.js";
import cron from "node-cron";
import { sendSessionCreatedEmail } from "../utils/emailService.js";

export const getSessionsByMentor = async (req, res) => {
  try {
    const sessions = await Session.find({ mentor: req.userId })
      .populate("mentees", "firstname lastname email") // Populate mentee details
      .select("topic date startTime endTime message mentees link"); // Include the link field

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

export const createSession = async (req, res) => {
  try {
    const { topic, date, startTime, endTime, message, selectedMentees, link } = req.body;

    const session = new Session({
      topic,
      date,
      startTime,
      endTime,
      message,
      mentor: req.userId,
      mentees: selectedMentees,
      link, // Ensure the link is saved
    });

    await session.save();

    // Fetch mentee details for email
    const mentees = await Session.findById(session._id)
      .populate("mentees", "firstname lastname email")
      .select("mentees");

    // Send email to mentees
    mentees.mentees.forEach((mentee) => {
      sendSessionCreatedEmail({
        email: mentee.email,
        firstname: mentee.firstname,
        sessionDetails: {
          topic,
          date,
          startTime,
          endTime,
          message,
          link,
        },
      });
    });

    res.status(201).json({
      success: true,
      message: "Session created successfully",
      session,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create session",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // Ensure the logged-in user is the mentor who created the session
    if (session.mentor.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this session",
      });
    }

    await session.deleteOne();

    res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete session",
      errorDetails: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Schedule a cron job to delete expired sessions
cron.schedule("*/5 * * * *", async () => {
  try {
    const now = new Date();
    const result = await Session.deleteMany({ date: { $lt: now } });
    console.log(`Auto-deleted ${result.deletedCount} expired sessions.`);
  } catch (error) {
    console.error("Error auto-deleting expired sessions:", error);
  }
});
