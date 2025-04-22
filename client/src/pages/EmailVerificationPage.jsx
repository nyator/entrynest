import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../elements/button";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds

  // Get user from auth store and location state
  const { error, isLoading, verifyEmail, user } = useAuthStore();
  const email = user?.email || location.state?.email;

  const handleResendCode = async () => {
    if (resendCooldown > 0) {
      toast.warning(
        `Please wait ${resendCooldown} seconds before requesting a new code`
      );
      return;
    }

    if (!email) {
      toast.error("Email not found. Please try signing up again.");
      return;
    }

    setIsResending(true);
    try {
      // Use the correct API endpoint path
      const response = await axios.post("/auth/resend-verification", {
        email,
      });

      if (response.data.success) {
        toast.success("New verification code sent to your email");
        setResendCooldown(60);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      toast.error(
        error.response?.data?.message || "Failed to send new verification code"
      );
    } finally {
      setIsResending(false);
    }
  };

  // Handle cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // Reset countdown when resending code
  useEffect(() => {
    if (resendCooldown === 0) {
      setCountdown(600); // Reset to 10 minutes
    }
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      const response = await verifyEmail(verificationCode);
      const user = response.user;

      // Redirect based on user role
      switch (user.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "employer":
          navigate("/em-dashboard");
          break;
        case "jobseeker":
          navigate("/jobs");
          break;
        case "mentor":
          navigate("/mentor-dashboard");
          break;
        default:
          navigate("/");
      }

      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div className="max-w-md w-full bg-gray-800 bg-opacity-50 rounded-2xl shadow-xl overflow-hidden mx-auto">
        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md h-4/5">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primaryStroke text-transparent bg-clip-text">
            Verify Your Email
          </h2>
          <p className="text-center text-gray-300 mb-6">
            Enter the 6-digit code sent to your email address {" "}
            <span className="font-bold">{email}</span>
          </p>
          <p className="text-center text-gray-300 mb-6">
            code expires in {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')} minutes
          </p>
          <form className="space-y-6">
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="6"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-black border-2 border-primary/10 rounded-lg focus:border-primary/30 focus:outline-none"
                />
              ))}
            </div>
            {error && (
              <p className="text-red-500 font-semibold mt-2">{error}</p>
            )}
            <Button
              type="submit"
              disabled={isLoading || code.some((digit) => !digit)}
              className="w-full mt-5 bg-gradient-to-r from-primary to-primaryStroke text-white font-bold py-3 px-4 rounded-lg shadow-lg disabled:opacity-50"
              text="Verify Email"
            />
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending || resendCooldown > 0}
                className="text-primary hover:text-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending
                  ? "Sending..."
                  : resendCooldown > 0
                  ? `Resend code in ${resendCooldown}s`
                  : "Resend verification code"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
