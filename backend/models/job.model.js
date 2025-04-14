import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String },
    cvUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    tags: {
      type: [String], // Update to allow multiple tags
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    salaryRange: {
      type: String,
      required: true,
    },
    aboutRole: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    responsibility: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: { type: [applicationSchema], default: [] }, // Add applications field
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
