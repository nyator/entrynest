import { useState, useEffect, useRef } from "react";

import { MdOutlineArrowDropDown } from "react-icons/md";

const CustomDropdownV2 = ({
  options,
  value,
  onChange,
  placeholder,
  classNameButton,
  classNameDrop,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`${classNameButton} w-full inline-flex justify-between bg-white border border-gray rounded-3xl px-4 py-2 text-start`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || placeholder}</span>
        <MdOutlineArrowDropDown
          className={`size-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray rounded-xl mt-2 max-h-52 overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              className={`${classNameDrop} px-4 py-2 hover:bg-blue-100 cursor-pointer`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdownV2;
