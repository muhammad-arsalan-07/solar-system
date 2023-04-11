import React from "react";
import "./Arrow.css";
import left from "../../assets/left.png";
import right from "../../assets/right.png";

const Arrow = ({ rightToLeft, leftToRight }) => {
  return (
    <>
      {rightToLeft && (
        <span className="right-to-left">
          <img src={right} alt="" width="20px" height="20px" />
        </span>
      )}
      {leftToRight && (
        <span className="left-to-right">
          <img src={left} alt="" width="20px" height="20px" />
        </span>
      )}
    </>
  );
};

export default Arrow;
