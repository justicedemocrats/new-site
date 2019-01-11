import React from "react";
import Link from "gatsby-link";
import MapTags from "./MapTags";

const MapSidebarRow = ({ countFn, district }) => (
  <div className="">
    <div>
      <div className="candidate-profile">
        <div
          className="candidate-pic"
          style={{ backgroundImage: `url(${district.image})` }}
        />
        <div className="candidate-info">
          <h3 className="candidate-name">{district.member_name} </h3>
          <h3>{district.name}</h3>
        </div>

        <MapTags member={district} />
      </div>

      {!district.member_is_jd && district.member_party == "D" ? (
        <div className="nominations-count">
          We've received {countFn(district)} nominations for a primary
          challenger.
          <br />
          {!district.member_supports_gnd && (
            <div className="no-gnd-tag">
              {" "}
              {district.member_name} does not support the Green New Deal{" "}
            </div>
          )}
          <h3>
            Would you like to see a primary challenger to {district.member_name}
            ?
          </h3>
          <Link to={`/nominate?district=${district.state_district}`}>
            Nominate One Here
          </Link>
        </div>
      ) : (
        <div className="nominations-count">
          We've received {countFn(district)} nominations for possible Justice
          Democrats to run against {district.member_name}
          <h3>
            Would you like to see a Justice Democrat run against{" "}
            {district.member_name}?
          </h3>
          <Link to={`/nominate?district=${district.state_district}`}>
            Nominate One Here
          </Link>
        </div>
      )}
      <div />
    </div>
  </div>
);

export default MapSidebarRow;
