import PropTypes from "prop-types";
import React from "react";
import "../style/candidate.scss";

const officeTypeMap = {
  governor: "GOV",
  senate: "SN"
};

const electionTypeMap = {
  fake: "FAKE",
  primary: "Primary"
};

export default class CarouselCandidate extends React.Component {
  state = { expanded: false };

  render() {
    const {
      firstName,
      lastName,
      district,
      state,
      electionDate,
      image,
      office,
      electionType
    } = this.props;

    let ed = new Date(electionDate);
    let [d, m] = [ed.getDate(), ed.getMonth()];
    m = m + 1;
    d = d + 1;

    return (
      <div className="carousel-candidate">
        <div
          className="carousel-headshot"
          style={{
            backgroundImage: `url(${(image || defaultImage).trim('"')})`
          }}
        />

        <div
          className="district bold-m dark-blue-bg banner full-center"
          style={{ color: "white" }}
        >
          {state}-{office == "house" ? district : officeTypeMap[office]}
        </div>

        <div className="full-center name">
          <div className="dark-blue-color">
            {firstName} {lastName}
          </div>
        </div>

        <div
          className="rate-date dark-blue-bg banner full-center"
          style={{ color: "white" }}
        >
          {m}/{d}
        </div>
      </div>
    );
  }
}
