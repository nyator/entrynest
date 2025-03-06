// import React, { useState } from "react";
// import InputField from "../elements/inputField";
// import Button from "../elements/button";
// import { FcGoogle } from "react-icons/fc";
// import { useAuthStore } from "../store/authStore";
// import { Link, useNavigate } from "react-router-dom";

// function JobseekerForm({
//   jsfirstname,
//   setJsfirstname,
//   jslastname,
//   setJslastname,
//   jsemail,
//   setJsemail,
//   jspassword,
//   setJspassword,
//   jsconfirmpassword,
//   setJsconfirmpassword,
// }) {
//   const navigate = useNavigate();
//   const { signup, error, isLoading } = useAuthStore();

//   const [signupError, setSignupError] = useState("");
//   const handleSignup = async (e, handleNextStep, currentStep, totalSteps) => {
//     e.preventDefault();
//     console.log("Form submitted with:", {
//       jsfirstname,
//       jslastname,
//       jsemail,
//       jspassword,
//       jsconfirmpassword,
//     });

//     // Logic to handle multi-page form submission
//     if (currentStep < totalSteps) {
//       handleNextStep();
//     } else {
//       // Final submission logic
//       setSignupError(""); // Reset error state before signup attempt

//       try {
//         await signup(jsfirstname, jslastname, jsemail, jspassword);
//         console.log("Signup successful, navigating to SignupJobSeeker");
//         navigate("/signup-jobseeker"); // Navigate to SignupJobSeeker.jsx
//       } catch (error) {
//         setSignupError(error.response?.data?.message || "Signup failed"); // Set error message
//         console.log("Signup error:", error);
//       }
//     }
//   };

//   return (
//     <div className="space-y-4 md:space-y-7 w-4/5">
//       <form
//         onSubmit={(e) => handleSignup(e, handleNextStep)}
//         className="space-y-4 md:space-y-7 items-center"
//       >
//         {signupError && <p className="text-red-500">{signupError}</p>}{" "}
//         {/* Display error message */}
//         <div className="flex sm:flex-row flex-col justify-between gap-4">
//           <div className="w-full">
//             <label className="text-clampText">First Name</label>
//             <InputField
//               type="text"
//               placeholder="First Name"
//               value={jsfirstname}
//               onChange={(e) => setJsfirstname(e.target.value)}
//             />
//           </div>
//           <div className="w-full">
//             <label className="text-clampText">Last Name</label>
//             <InputField
//               type="text"
//               placeholder="Last Name"
//               value={jslastname}
//               onChange={(e) => setJslastname(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <label className="text-clampText">Email</label>
//           <InputField
//             type="email"
//             placeholder="Type email"
//             value={jsemail}
//             onChange={(e) => setJsemail(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-clampText">Create a password</label>
//           <InputField
//             type="password"
//             placeholder="Type password"
//             value={jspassword}
//             onChange={(e) => setJspassword(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-clampText">Confirm password</label>
//           <InputField
//             type="password"
//             placeholder="Confirm password"
//             value={jsconfirmpassword}
//             onChange={(e) => setJsconfirmpassword(e.target.value)}
//           />
//         </div>
//         <div>
//           <button
//             type="submit"
//             className="w-full bg-primary text-white font-medium py-2 rounded-xl"
//           >
//             Signup
//           </button>
//         </div>
//       </form>

//       <div className="flex items-center justify-between text-gray">
//         <div className="w-2/5 h-[1.5px] bg-gray"></div>or
//         <div className="w-2/5 h-[1.5px] bg-gray"></div>
//       </div>

//       <Link to={""} className="flex items-center justify-center">
//         <div className="flex w-fit items-center gap-2 rounded-full text-clampInputText bg-gray border border-grayStroke px-[20px] py-[10px]">
//           <FcGoogle className="size-6" />
//           Signup with Google
//         </div>
//       </Link>

//       <div className="flex justify-center items-center">
//         <p className="font-SatoshiMedium">
//           Have an account ?{"  "}
//           <Link to="/login">
//             <span className="font-medium underline">Login</span>
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default JobseekerForm;

import React, { useState } from "react";
import InputField from "../elements/inputField";
import Button from "../elements/button";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

async function signup(firstname, lastname, email, password, role) {
  try {
    const response = await axios.post("/signup", {
      firstname,
      lastname,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

function JobseekerForm({
  jsfirstname,
  setJsfirstname,
  jslastname,
  setJslastname,
  jsemail,
  setJsemail,
  jspassword,
  setJspassword,
  jsconfirmpassword,
  setJsconfirmpassword,
}) {
  const [signupError, setSignupError] = useState(""); // Initialize signupError state
  const navigate = useNavigate(); // Add useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", {
      jsfirstname,
      jslastname,
      jsemail,
      jspassword,
      jsconfirmpassword,
    });

    // Final submission logic
    if (jspassword !== jsconfirmpassword) {
      setSignupError("Passwords do not match.");
      return;
    }

    try {
      await signup(jsfirstname,jslastname, jsemail, jspassword, "jobseeker");
      console.log("Signup successful, navigating to jobs");
      navigate("/jobs"); // Navigate to jobs page
    } catch (error) {
      setSignupError(error.response?.data?.message || "Signup failed"); // Set error message
      console.log("Signup error:", error);
    }
  };

  return (
    <div className="space-y-4 md:space-y-7 w-4/5 items-center">
      <form
        id="2"
        className="space-y-4 md:space-y-7 items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex sm:flex-row flex-col justify-between gap-4">
          <div className="w-full">
            <label className="text-clampText">
              First Name
              <InputField
                placeholder="First Name"
                value={jsfirstname}
                onChange={(e) => setJsfirstname(e.target.value)}
              />
            </label>
          </div>
          <div className="w-full">
            <label className="text-clampText">
              Last Name
              <InputField
                placeholder="Last Name"
                value={jslastname}
                onChange={(e) => setJslastname(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-clampText">
            Email
            <InputField
              placeholder="Type email"
              value={jsemail}
              onChange={(e) => setJsemail(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label className="text-clampText">
            Create a password
            <InputField
              type="password"
              placeholder="Type password"
              value={jspassword}
              onChange={(e) => setJspassword(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label className="text-clampText">
            Confirm password
            <InputField
              type="password"
              placeholder="Confirm password"
              value={jsconfirmpassword}
              onChange={(e) => setJsconfirmpassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-primary text-white font-medium py-2 rounded-xl"
          >
            Signup
          </button>
        </div>
      </form>
      <div className="flex items-center justify-between text-gray">
        <div className="w-2/5 h-[1.5px] bg-gray"></div>or
        <div className="w-2/5 h-[1.5px] bg-gray"></div>
      </div>

      <Link to={""} className="flex items-center justify-center">
        <div className="flex w-fit items-center  gap-2 rounded-full text-clampInputText bg-gray border border-grayStroke px-[20px] py-[10px]">
          <FcGoogle className="size-6" />
          Signup with Google
        </div>
      </Link>

      <div className="flex justify-center items-center">
        <p className="font-SatoshiMedium ">
          Have an account ?{"  "}
          <Link to="/login">
            <span className="font-medium underline">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default JobseekerForm;
