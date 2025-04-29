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
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "approved", "declined"],
          default: "pending",
        },
        message: {
          type: String,
          default: "",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Mentorship = mongoose.model("Mentorship", mentorshipSchema);
