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
    maxApplicants: {
      type: Number,
      required: true,
    },
    currentApplicants: {
      type: Number,
      default: 0,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Mentorship = mongoose.model("Mentorship", mentorshipSchema);
