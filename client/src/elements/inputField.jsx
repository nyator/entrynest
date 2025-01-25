import React, { useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";



const InputField = ({ type, placeholder, onChange, value }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? type : "text");
  };

  return (
    <div className="relative ">
      <input
      value={value}
        type={inputType}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full p-2 pl-3 pr-7 text-clampInputText text-black border-[1.5px] border-gray rounded-xl focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray placeholder:font-light"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute top-1/2 transform -translate-y-1/2 right-2 "
        >
          {showPassword ? <VscEyeClosed className="text-grayStroke"/> : <VscEye className="text-grayStroke"/>}
        </button>
      )}
    </div>
  );
};

export default InputField;
