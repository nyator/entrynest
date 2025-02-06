import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // But PORT 5000 is already taken by macos

app.use(express.json()); //  allows to parse incoming request:req:body
app.use(cookieParser()); // allows to parse incoming cookies

app.use("/api/auth", authRoutes); // allows  to parse incoming requests from user

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});
