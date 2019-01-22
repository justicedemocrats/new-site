import React from "react";
import Link from "gatsby-link";
import "../style/map.scss";
import MapTags from "./MapTags";

export default props => (
  <div
    className="map-hover map-cd-candidate map-cd-candidate-popup map-cd-hover"
    style={{ padding: 20 }}
  >
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

      {!props.member_is_jd && props.member_party == "D" ? (
        <div className="nominations-count">
          We've received {props.count} nominations for a primary challenger.
          <br />
          {!props.member_supports_gnd && (
            <div className="no-gnd-tag">
              {" "}
              {props.member_name} does not support the Green New Deal{" "}
            </div>
          )}
          <h3>
            Would you like to see a primary challenger to {props.member_name}?
          </h3>
          <Link
            to={`/nominate?district=${props.state_district}`}
            className="nominate-button bold-m"
          >
            Nominate
          </Link>
        </div>
      ) : (
        <div className="nominations-count">
          We've received {props.nominations} nominations for possible Justice
          Democrats to run against {props.member_name}
          <h3>
            Would you like to see a Justice Democrat run against{" "}
            {props.member_name}?
          </h3>
          <Link
            to={`/nominate?district=${props.state_district}`}
            className="nominate-button bold-m"
          >
            Nominate
          </Link>
        </div>
      )}

      <div />
    </div>
  </div>
);
