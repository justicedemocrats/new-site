import React from "react";
import democratImg from "../img/democrat.png";
import republicanImg from "../img/republican.png";
import jdImg from "../img/jd.png";
import gndImg from "../img/gnd.jpg";

const gnd = () => (
  <div className="tag-container">
    <img src={gndImg} />
  </div>
);

const jd = () => (
  <div className="tag-container">
    <img src={jdImg} />
  </div>
);

const democrat = () => (
  <div className="tag-container">
    <img src={democratImg} />
  </div>
);

const republican = () => (
  <div className="tag-container">
    <img src={republicanImg} />
  </div>
);

const tagStatements = [
  [m => m.member_party == "D", democrat],
  [m => m.member_party == "R", republican],
  [m => m.member_is_jd, jd],
  [m => m.member_supports_gnd, gnd]
];

const MapTags = props => {
  return (
    <div className="candidate-tag-box">
      {tagStatements
        .filter(([predicate, _Component]) => predicate(props.member))
        .map(([_predicate, Component]) => (
          <Component />
        ))}
    </div>
  );
};

export default MapTags;
