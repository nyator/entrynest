import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; //but PORT 5000 is already taken by macos

app.use(express.json());

app.use("/api/auth", authRoutes); //allows you to parse incoming requests from user

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});
