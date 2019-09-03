import React from "react";
import "../style/banner.scss";

export default props => {
  const { backgroundImage, text } = props;
  const words = text.split(" ");
  const first = words[0];
  const last = words[words.length - 1];
  const rest = words.slice(1, words.length - 1).join(" ");

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="banner-container"
    >
      <div className="page-contents">
        <div className="banner-text">
          {first === last ? (
            <div className="banner-text-bold">{first}</div>
          ) : (
            [
              <div className="banner-text-bold">{first}</div>,
              <div className="banner-text-light">{rest}</div>,
              <div className="banner-text-bold">{last}</div>
            ]
          )}
        </div>
      </div>
    </div>
  );
};
