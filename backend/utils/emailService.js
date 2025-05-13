import { sendEmail } from "./email.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  NEW_JOB_POSTING_NOTIFICATION_TEMPLATE,
  NEW_MENTORSHIP_POSTING_NOTIFICATION_TEMPLATE,
  APPLICATION_APPROVED_TEMPLATE,
  APPLICATION_DECLINED_TEMPLATE,
  MENTORSHIP_APPROVED_TEMPLATE,
  MENTORSHIP_DECLINED_TEMPLATE,
  SESSION_CREATED_TEMPLATE,
  SESSION_DELETED_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (
  email,
  firstname,
  verificationToken
) => {
  try {
    const html = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    ).replace("{firstname}", firstname);

    await sendEmail({
      to: email,
      subject: "📮 Verify your email",
      html,
      text: `Hello ${firstname},\n\nYour verification code is: ${verificationToken}\n\nPlease enter this code on the verification page to complete your registration.\n\nBest regards,\nentrynest Team`,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, firstname, resetURL) => {
  try {
    const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      resetURL
    ).replace("{firstname}", firstname);

    await sendEmail({
      to: email,
      subject: "📮 Reset your password",
      html,
      text: `Hello ${firstname},\n\nTo reset your password, please click on the following link: ${resetURL}\n\nThis link will expire in 1 hour.\n\nBest regards,\nentrynest Team`,
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error(`Error sending password reset email: ${error.message}`);
  }
};

export const sendPasswordResetSuccessEmail = async (email, firstname) => {
  try {
    const html = PASSWORD_RESET_SUCCESS_TEMPLATE.replace(
      "{firstname}",
      firstname
    );

    await sendEmail({
      to: email,
      subject: "📮 Password Reset Successful",
      html,
      text: `Hello ${firstname},\n\nYour password has been successfully reset.\n\nBest regards,\nentrynest Team`,
    });
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error(
      `Error sending password reset success email: ${error.message}`
    );
  }
};

export const sendNewJobPostingNotification = async (
  email,
  firstname,
  jobData
) => {
  try {
    const {
      title = "Untitled",
      companyName = "Unknown Company",
      location = "Not specified",
      jobType = "Not specified",
      salaryRange = null,
      postingUrl = "#",
    } = jobData;

    const formattedSalaryRange = salaryRange
      ? `<p><strong>Salary Range:</strong> ${salaryRange}</p>`
      : "";

    const html = NEW_JOB_POSTING_NOTIFICATION_TEMPLATE.replace(
      "{firstname}",
      firstname
    )
      .replace("{title}", title)
      .replace("{companyName}", companyName)
      .replace("{location}", location)
      .replace("{jobType}", jobType)
      .replace("{salaryRange}", formattedSalaryRange)
      .replace("{postingUrl}", postingUrl);

    const text = `Hello ${firstname},\n\nA new job opportunity has been posted:\n\nTitle: ${title}\nCompany: ${companyName}\nLocation: ${location}\nType: ${jobType}\n${
      salaryRange ? `Salary Range: ${salaryRange}\n` : ""
    }\nView the job details here: ${postingUrl}\n\nBest regards,\nentrynest Team`;

    await sendEmail({
      to: email,
      subject: `📮 New Job Opportunity: ${title}`,
      html,
      text,
    });
  } catch (error) {
    console.error("Error sending job posting notification email:", error);
    throw new Error(
      `Error sending job posting notification email: ${error.message}`
    );
  }
};

export const sendNewMentorshipPostingNotification = async (
  email,
  firstname,
  mentorshipData
) => {
  try {
    const {
      title = "Untitled",
      mentorName = "Unknown Mentor",
      duration = "Not specified",
      skillsRequired = "Not specified",
      generalMentorshipUrl = `${process.env.CLIENT_URL}/mentorships`,
    } = mentorshipData;

    const html = NEW_MENTORSHIP_POSTING_NOTIFICATION_TEMPLATE.replace(
      "{firstname}",
      firstname
    )
      .replace("{title}", title)
      .replace("{mentorName}", mentorName)
      .replace("{duration}", duration)
      .replace("{skillsRequired}", skillsRequired)
      .replace("{generalMentorshipUrl}", generalMentorshipUrl);

    const text = `Hello ${firstname},\n\nA new mentorship opportunity has been posted:\n\nTitle: ${title}\nMentor: ${mentorName}\nDuration: ${duration}\nSkills Required: ${skillsRequired}\n\nView all mentorship opportunities here: ${generalMentorshipUrl}\n\nBest regards,\nentrynest Team`;

    await sendEmail({
      to: email,
      subject: `📮 New Mentorship Opportunity: ${title}`,
      html,
      text,
    });
  } catch (error) {
    console.error(
      "Error sending mentorship posting notification email:",
      error
    );
    throw new Error(
      `Error sending mentorship posting notification email: ${error.message}`
    );
  }
};

export const sendApplicationApprovedEmail = async (
  email,
  firstname,
  jobData
) => {
  try {
    const { jobTitle, companyName, jobUrl } = jobData;

    const html = APPLICATION_APPROVED_TEMPLATE.replace("{firstname}", firstname)
      .replace("{jobTitle}", jobTitle)
      .replace("{companyName}", companyName)
      .replace("{jobUrl}", jobUrl);

    await sendEmail({
      to: email,
      subject: `📮 Application Approved: ${jobTitle} at ${companyName}`,
      html,
      text: `Hello ${firstname},\n\nGreat news! Your application for the position of ${jobTitle} at ${companyName} has been approved!\n\nThe employer will be in touch with you shortly regarding the next steps in the hiring process.\n\nView the job details here: ${jobUrl}\n\nBest regards,\nentrynest Team`,
    });
  } catch (error) {
    console.error("Error sending application approved email:", error);
    throw new Error(
      `Error sending application approved email: ${error.message}`
    );
  }
};

export const sendApplicationDeclinedEmail = async (
  email,
  firstname,
  jobData
) => {
  try {
    const { jobTitle, companyName, jobsUrl } = jobData;

    const html = APPLICATION_DECLINED_TEMPLATE.replace("{firstname}", firstname)
      .replace("{jobTitle}", jobTitle)
      .replace("{companyName}", companyName)
      .replace("{jobsUrl}", jobsUrl);

    await sendEmail({
      to: email,
      subject: `📮 Application Update: ${jobTitle} at ${companyName}`,
      html,
      text: `Hello ${firstname},\n\nWe wanted to inform you about the status of your application for the position of ${jobTitle} at ${companyName}.\n\nAfter careful consideration, the employer has decided not to move forward with your application at this time.\n\nWhile this particular opportunity didn't work out, we encourage you to continue exploring other opportunities on our platform, keep your profile and skills up to date, and apply for other positions that match your qualifications.\n\nRemember, every application is a learning experience, and the right opportunity is out there for you.\n\nBrowse more jobs here: ${jobsUrl}\n\nBest regards,\nentrynest Team`,
    });
  } catch (error) {
    console.error("Error sending application declined email:", error);
    throw new Error(
      `Error sending application declined email: ${error.message}`
    );
  }
};

export const sendMentorshipApprovedEmail = async (
  email,
  firstname,
  mentorshipData
) => {
  try {
    const html = MENTORSHIP_APPROVED_TEMPLATE.replace(
      "{firstname}",
      firstname
    ).replace("{mentorshipTitle}", mentorshipData.title);
    // .replace('{mentorshipUrl}', mentorshipData.mentorshipUrl);

    const text = `Hello ${firstname},\n\nGreat news! Your application for the mentorship program "${mentorshipData.title}" has been approved!\n\nYour mentor will be in touch with you shortly to discuss the next steps and schedule your first session.\n\nBest regards,\nentrynest Team`;

    await sendEmail({
      to: email,
      subject: `📮 Mentorship Application Approved: ${mentorshipData.title}`,
      text,
      html,
    });
  } catch (error) {
    console.error("Error sending mentorship approved email:", error);
  }
};

export const sendMentorshipDeclinedEmail = async (
  email,
  firstname,
  mentorshipData
) => {
  try {
    const html = MENTORSHIP_DECLINED_TEMPLATE.replace(
      "{firstname}",
      firstname
    ).replace("{mentorshipTitle}", mentorshipData.title);
    // .replace('{mentorshipsUrl}', mentorshipData.mentorshipsUrl);

    const text = `Hello ${firstname},\n\nWe wanted to inform you about the status of your application for the mentorship program "${mentorshipData.title}".\n\nAfter careful consideration, the mentor has decided not to move forward with your application at this time.\n\nWhile this particular mentorship opportunity didn't work out, we encourage you to explore other mentorship opportunities on our platform and keep your profile and skills up to date.\n\nBest regards,\nentrynest Team`;

    await sendEmail({
      to: email,
      subject: `📮 Mentorship Application Update: ${mentorshipData.title}`,
      text,
      html,
    });
  } catch (error) {
    console.error("Error sending mentorship declined email:", error);
  }
};

export const sendSessionCreatedEmail = async ({
  email,
  firstname,
  sessionDetails,
}) => {
  try {
    const { topic, date, startTime, endTime, message, link } = sessionDetails;

    const html = SESSION_CREATED_TEMPLATE.replace("{firstname}", firstname)
      .replace("{topic}", topic)
      .replace("{date}", new Date(date).toLocaleDateString())
      .replace("{startTime}", startTime)
      .replace("{endTime}", endTime)
      .replace("{message}", message || "No additional message provided.")
      .replace("{link}", link)
      .replace("{lin}", link);

    await sendEmail({
      to: email,
      subject: `📅 New Session Scheduled: ${topic}`,
      html,
      text: `Hello ${firstname},\n\nA new session has been scheduled with the following details:\n\nTopic: ${topic}\nDate: ${new Date(
        date
      ).toLocaleDateString()}\nTime: ${startTime} - ${endTime}\nMessage: ${
        message || "No additional message provided."
      }\nLink: ${link}\n\nPlease make sure to join the session on time.\n\nBest regards,\nentrynest Team`,
    });
  } catch (error) {
    console.error("Error sending session created email:", error);
    throw new Error(`Error sending session created email: ${error.message}`);
  }
};

export const sendSessionDeletedEmail = async ({ email, firstname, sessionDetails }) => {
  try {
    const { topic, date, startTime, endTime } = sessionDetails;

    const html = SESSION_DELETED_TEMPLATE.replace("{firstname}", firstname)
      .replace("{topic}", topic)
      .replace("{date}", new Date(date).toLocaleDateString())
      .replace("{startTime}", startTime)
      .replace("{endTime}", endTime);

    const text = `Hello ${firstname},\n\nWe regret to inform you that the session "${topic}" scheduled on ${new Date(
      date
    ).toLocaleDateString()} from ${startTime} to ${endTime} has been canceled.\n\nBest regards,\nentrynest Team`;

    await sendEmail({
      to: email,
      subject: `📮 Session Canceled: ${topic}`,
      html,
      text,
    });
  } catch (error) {
    console.error("Error sending session deleted email:", error);
  }
};
