import React from "react";
import { Link } from "react-router";

import { TbLoaderQuarter } from "react-icons/tb";

const Button = (props) => {
  const isLoading = false

  return (
    <Link to={props.Link}>
      <button
        onClick={() => props.onClick}
        type={props.Type}
        className={`px-3 py-1 rounded-lg border-[1.5px] border-primaryStroke ${props.className}`}
      >
       { isLoading ? <TbLoaderQuarter className="mx-auto animate-spin"/> : props.text } 
      </button>
    </Link>
  );
};

export default Button;
