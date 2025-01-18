import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const InputField = ({ type, placeholder, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? type : "text");
  };

  return (
    <div className="relative">
      <input
        type={inputType}
        placeholder={placeholder}
        onChange={onChange}
        className="w-1/2 p-2 pl-3 text-clampInputText text-black border border-grayStroke rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute top-1/2 transform -translate-y-1/2 right-2"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default InputField;
