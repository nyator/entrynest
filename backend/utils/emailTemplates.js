export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet">
  <style>
    h1, p {
      font-family: "Sora", serif;
    }
</style>
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #8B3AE1, #6B29B0); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello, {firstname}</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <h1 style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #6B29B0;">{verificationCode}</h1>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>entrynest Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet">
  <style>
    h1, p {
      font-family: "Sora", serif;
    }
</style>
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #8B3AE1, #6B29B0); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello, {firstname}</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #6B29B0; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>entrynest Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet">
  <style>
    h1, p {
      font-family: "Sora", serif;
    }
</style>
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #8B3AE1, #6B29B0); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello, {firstname}</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #6B29B0; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>entrynest Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const NEW_POSTING_NOTIFICATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet">
  <style>
    h1, p {
      font-family: "Sora", serif;
    }
  </style>
  <title>📮 New {type} Opportunity</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #8B3AE1, #6B29B0); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">New {type} Opportunity</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {firstname},</p>
    <p>A new {type} opportunity has been posted that might interest you:</p>
    <div style="background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h2 style="color: #6B29B0; margin-top: 0;">{title}</h2>
      <p><strong>Company:</strong> {companyName}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Type:</strong> {jobType}</p>
      {salaryRange}
    </div>
    <p>Click the button below to view the full details and apply:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{postingUrl}" style="background-color: #6B29B0; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View {type}</a>
    </div>
    <p>Best regards,<br>entrynest Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const APPLICATION_APPROVED_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet">
  <style>
    h1, p {
      font-family: "Sora", serif;
    }
  </style>
  <title>📮 Application Approved</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #8B3AE1, #6B29B0); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Application Approved</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {firstname},</p>
    <p>Great news! Your application for the position of <strong>{jobTitle}</strong> at <strong>{companyName}</strong> has been approved!</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #6B29B0; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>The employer will be in touch with you shortly regarding the next steps in the hiring process.</p>
    <p>In the meantime, you can view the job details and prepare for the next stage:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{jobUrl}" style="background-color: #6B29B0; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Job Details</a>
    </div>
    <p>Best regards,<br>entrynest Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const APPLICATION_DECLINED_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet">
  <style>
    h1, p {
      font-family: "Sora", serif;
    }
  </style>
  <title>📮 Application Update</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #8B3AE1, #6B29B0); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Application Update</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {firstname},</p>
    <p>We wanted to inform you about the status of your application for the position of <strong>{jobTitle}</strong> at <strong>{companyName}</strong>.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #6B29B0; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        !
      </div>
    </div>
    <p>After careful consideration, the employer has decided not to move forward with your application at this time.</p>
    <p>While this particular opportunity didn't work out, we encourage you to:</p>
    <ul style="margin-left: 20px;">
      <li>Continue exploring other opportunities on our platform</li>
      <li>Keep your profile and skills up to date</li>
      <li>Apply for other positions that match your qualifications</li>
    </ul>
    <p>Remember, every application is a learning experience, and the right opportunity is out there for you.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{jobsUrl}" style="background-color: #6B29B0; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Browse More Jobs</a>
    </div>
    <p>Best regards,<br>entrynest Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const MENTORSHIP_APPROVED_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet">
  <style>
    h1, p {
      font-family: "Sora", serif;
    }
  </style>
  <title>📮 Mentorship Application Approved</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #8B3AE1, #6B29B0); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Mentorship Application Approved</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {firstname},</p>
    <p>Great news! Your application for the mentorship program <strong>{mentorshipTitle}</strong> has been approved!</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #6B29B0; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>Your mentor will be in touch with you shortly to discuss the next steps and schedule your first session.</p>
    <p>In the meantime, you can review the mentorship details and prepare for your journey:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{mentorshipUrl}" style="background-color: #6B29B0; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Mentorship Details</a>
    </div>
    <p>Best regards,<br>entrynest Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const MENTORSHIP_DECLINED_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap" rel="stylesheet">
  <style>
    h1, p {
      font-family: "Sora", serif;
    }
  </style>
  <title>📮 Mentorship Application Update</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #8B3AE1, #6B29B0); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Mentorship Application Update</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {firstname},</p>
    <p>We wanted to inform you about the status of your application for the mentorship program <strong>{mentorshipTitle}</strong>.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #6B29B0; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        !
      </div>
    </div>
    <p>After careful consideration, the mentor has decided not to move forward with your application at this time.</p>
    <p>While this particular mentorship opportunity didn't work out, we encourage you to:</p>
    <ul style="margin-left: 20px;">
      <li>Explore other mentorship opportunities on our platform</li>
      <li>Keep your profile and skills up to date</li>
      <li>Apply for other mentorship programs that match your interests</li>
    </ul>
    <p>Remember, every application is a learning experience, and the right mentorship opportunity is out there for you.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{mentorshipsUrl}" style="background-color: #6B29B0; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Browse More Mentorships</a>
    </div>
    <p>Best regards,<br>entrynest Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`; 