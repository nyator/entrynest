import mongoose from "mongoose";

const mentorshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skillsRequired: {
      type: [String],
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    maxApplicants: {
      type: Number,
      required: true,
    },
    currentApplicants: {
      type: Number,
      default: 0,
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Mentorship = mongoose.model("Mentorship", mentorshipSchema);
