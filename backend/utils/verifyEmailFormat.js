
/**
 * Verifies if the provided email has a valid format.
 * @param {string} email - The email to verify.
 * @returns {boolean} - Returns true if the email format is valid, otherwise false.
 */
export const verifyEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
