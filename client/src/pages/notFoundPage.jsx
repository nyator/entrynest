import React from "react";
import { webpage } from "../constants/assests";

import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <body class="bg-purple-600 flex items-center justify-center h-screen">
      <div class="text-center justify-center flex flex-col items-center">
        <img
          src={webpage}
          alt="404 Not Found"
          className="size-3/5 object-contain"
        />
        <p class="text-2xl font-SatoshiBold text-black">
          Oops! Page not found.
        </p>
        <p class="text-black">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate(-1)}
          class="mt-6 font-SatoshiMedium inline-block px-6 py-3 bg-black text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-200 hover:scale-110 transition-all ease-in-out duration-300"
        >
          Go Back
        </button>
      </div>
    </body>
  );
};

export default NotFoundPage;
