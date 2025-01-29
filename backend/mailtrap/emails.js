import { mailTrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (
  email,
  firstname,
  verificationToken
) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ).replace("{firstname}", firstname),
      category: "Email Verification",
    });
    console.log("email sent successfully ", response);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, firstname) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "9d652370-df2c-4f6b-92ec-38e5c4986b7c",
      template_variables: {
        company_info_name: "entrynest",
        name: firstname,
      },
    });
    console.log("Welcome email sent successfully ", response);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendResetPasswordEmail = async (email) => {
  const recipient = [{ email }];
  
};
