import mongoose from "mongoose";

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
  },
  { timestamps: true }
);
// Add the timestamps option to the schema

export const Job = mongoose.model("Job", jobSchema);
