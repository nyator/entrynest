import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Define your user routes here
router.get("/", (req, res) => {
  res.send("User route is working");
});

router.put("/profile", upload.single("avatar"), (req, res) => {
  const { firstname, lastname, email, companyName, biography, location, telNumber, skills } = req.body;
  const avatar = req.file ? req.file.filename : null;

  // Simulate updating the user profile in the database
  const updatedUser = {
    firstname,
    lastname,
    email,
    avatar,
    companyName,
    biography,
    location,
    telNumber,
    skills: skills.split(","),
  };

  // Respond with the updated user data
  res.json({ user: updatedUser });
});

export default router;
