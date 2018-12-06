import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Thumb = ({ src, alt, objectID }) => {
  return (
    <Link to={`/projects/${objectID}`}>
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%"
        }}
      />
    </Link>
  );
};
