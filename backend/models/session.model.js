import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
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
  },
  { timestamps: true }
);

export const Session = mongoose.model("Session", sessionSchema);
