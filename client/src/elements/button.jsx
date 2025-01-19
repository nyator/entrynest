import React from "react";
import { Link } from "react-router";

const Button = (props) => {
  return (
    <Link to={props.Link}>
    <button onClick={props.onClick}
      className={`px-3 py-1 rounded-lg border-[1.5px] border-primaryStroke ${props.className}`}
    >
      {props.text}
    </button>
      </Link>
  );
};

export default Button;
