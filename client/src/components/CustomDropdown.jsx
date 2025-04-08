import { useState, useEffect, useRef } from "react";

import { MdOutlineArrowDropDown } from "react-icons/md";

const CustomDropdown = ({ options, value, onChange, placeholder, icon }) => {
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
        className="w-full inline-flex justify-between bg-white border-[1px] border-grayStroke rounded-lg p-2 text-left"
        onClick={() => setIsOpen(!isOpen)}
      ><span className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {value && <span className="text-black/70">{value}</span>}
        {!value && <span className="text-black/70">{placeholder}</span>}
      </span>
        {isOpen ? (
          <MdOutlineArrowDropDown className="size-5 rotate-180 transition-all ease-in-out duration-200" />
        ) : (
          <MdOutlineArrowDropDown className="size-5 transition-all ease-in-out duration-200" />
        )}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border-[1px] border-gray rounded-lg mt-1 max-h-40 overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              className="py-2 px-8 hover:bg-gray-100 cursor-pointer border-b border-gray/50 hover:bg-blue-100 "
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

export default CustomDropdown;
