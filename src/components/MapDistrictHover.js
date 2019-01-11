import React from "react";
import "../style/map.scss";
import MapTags from "./MapTags";

export default props => (
  <div className="map-hover map-cd-candidate map-cd-candidate-popup map-cd-hover">
    <div>
      <div className="candidate-profile">
        <div
          className="candidate-pic"
          style={{ backgroundImage: `url(${props.image})` }}
        />
        <div className="candidate-info">
          <h3 className="candidate-name">{props.member_name} </h3>
          <h3>{props.name}</h3>
        </div>

        <MapTags member={props} />
      </div>

      {!props.member_is_jd && (
        <div className="nominations-count">
          Nominations for a primary challenger: {props.nominations}
        </div>
      )}
      <span className="note">click to expand</span>
    </div>
  </div>
);
