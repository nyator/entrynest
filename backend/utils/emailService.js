import { sendEmail } from './email.config.js';
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from './emailTemplates.js';

export const sendVerificationEmail = async (email, firstname, verificationToken) => {
    try {
        const html = VERIFICATION_EMAIL_TEMPLATE
            .replace('{verificationCode}', verificationToken)
            .replace('{firstname}', firstname);

        await sendEmail({
            to: email,
            subject: 'Verify your email',
            html,
            text: `Hello ${firstname},\n\nYour verification code is: ${verificationToken}\n\nPlease enter this code on the verification page to complete your registration.\n\nBest regards,\nentrynest Team`
        });
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error(`Error sending verification email: ${error.message}`);
    }
};

export const sendPasswordResetEmail = async (email, firstname, resetURL) => {
    try {
        const html = PASSWORD_RESET_REQUEST_TEMPLATE
            .replace('{resetURL}', resetURL)
            .replace('{firstname}', firstname);

        await sendEmail({
            to: email,
            subject: 'Reset your password',
            html,
            text: `Hello ${firstname},\n\nTo reset your password, please click on the following link: ${resetURL}\n\nThis link will expire in 1 hour.\n\nBest regards,\nentrynest Team`
        });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error(`Error sending password reset email: ${error.message}`);
    }
};

export const sendPasswordResetSuccessEmail = async (email, firstname) => {
    try {
        const html = PASSWORD_RESET_SUCCESS_TEMPLATE
            .replace('{firstname}', firstname);

        await sendEmail({
            to: email,
            subject: 'Password Reset Successful',
            html,
            text: `Hello ${firstname},\n\nYour password has been successfully reset.\n\nBest regards,\nentrynest Team`
        });
    } catch (error) {
        console.error('Error sending password reset success email:', error);
        throw new Error(`Error sending password reset success email: ${error.message}`);
    }
}; 