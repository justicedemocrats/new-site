import React from "react";
import Link from "gatsby-link";
import MapTags from "./MapTags";

const MapSidebarRow = ({
  countFn,
  district,
  details,
  hovered,
  setHoveredDistrict,
  setSelectedDistrict
}) => (
  <div
    className={hovered ? "hovered map-sidebar-row" : "map-sidebar-row"}
    onClick={setSelectedDistrict}
    onMouseEnter={setHoveredDistrict}
  >
    <div>
      <div className="candidate-profile medium-m">
        <div
          className="candidate-pic"
          style={{ backgroundImage: `url(${details.image})` }}
        />
        <div className="candidate-info">
          <h3 className="candidate-name bold-m" style={{ fontSize: 16 }}>
            {district.member_name}{" "}
          </h3>
          <h3 style={{ fontSize: 16 }} className="home-subheader-b bold-m">
            {district.name}
          </h3>
        </div>

        <MapTags member={district} />
      </div>

      {!district.member_is_jd && district.member_party == "D" ? (
        <div className="nominations-count" style={{ fontsSize: 15 }}>
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
          <Link
            to={`/nominate?district=${district.name}`}
            className="nominate-button bold-m"
            style={{ fontSize: 14 }}
          >
            Nominate
          </Link>
        </div>
      ) : (
        <div className="nominations-count medium-m">
          We've received {countFn(district)} nominations for possible Justice
          Democrats to run against {district.member_name}
          <h3>
            Would you like to see a Justice Democrat run against{" "}
            {district.member_name}?
          </h3>
          <Link
            to={`/nominate?district=${district.name}`}
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

export default MapSidebarRow;
