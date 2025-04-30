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
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Ensure the reference to the User model is correct
      },
    ],
    link: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(v);
        },
        message: "Invalid URL format",
      },
    },
  },
  { timestamps: true }
);

export const Session = mongoose.model("Session", sessionSchema);
