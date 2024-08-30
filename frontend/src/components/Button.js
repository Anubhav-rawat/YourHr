import React from "react";
import "./Button.css"; 
const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button type={type} onClick={onClick} className="custom-button">
      {text}
    </button>
  );
};

export default Button;
