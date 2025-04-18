import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.MAILTRAP_API_TOKEN; // Ensure this environment variable is set correctly

if (!TOKEN) {
  throw new Error("MAILTRAP_API_TOKEN is not defined in the environment variables.");
}

export const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "no-reply@entrynest.com", // Ensure this matches the verified domain in Mailtrap
  name: "entrynest Team", // Update the sender name if needed
};

