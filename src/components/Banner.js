import PropTypes from "prop-types";
import React from "react";
import "../style/banner.scss";

export default ({ backroundImage, text }) => {
  const words = text.split(" ");
  const first = words[0];
  const last = words[words.length - 1];
  const rest = words.slice(1, words.length - 1).join(" ");

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="banner-container"
    >
      <div className="banner-text">
        <div className="banner-text-bold">{first}</div>
        <div className="banner-text-light">{rest}</div>
        <div className="banner-text-bold">{last}</div>
      </div>
    </div>
  );
};
