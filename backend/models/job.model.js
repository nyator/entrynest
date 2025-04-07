import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String },
  cvUrl: { type: String, required: true },
});

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
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
