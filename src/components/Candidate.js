import PropTypes from "prop-types";
import React from "react";

const Candidate = ({
  firstName,
  lastName,
  electionType,
  district,
  state,
  electionDate,
  image,
  blurb,
  website,
  donationLink,
  outcome,
  office
}) => (
  <div className="candidate container">
    <div className="row">
      <div className="six columns headshot" style={{ backgroundImage: `url(/img/coffee.png)` }}>
        <a href={website} className="button">
          Website
        </a>
      </div>
      <div className="six columns">
        <a href={donationLink} className="button">
          Donate
        </a>
      </div>
    </div>
    <div className="row">
      {firstName} {lastName}
    </div>
    <div className="row" style={{ textTransform: "capitalize" }}>
      {state} {office == "house" ? district : office}
    </div>
  </div>
)

Candidate.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  office: PropTypes.oneOf(["governor", "senate", "house"]).isRequired,
  electionType: PropTypes.oneOf(["fake", "primary", "general"]).isRequired,
  incumbent: PropTypes.bool.isRequired,
  district: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  electionDate: PropTypes.string.isRequired,
  image: PropTypes.string,
  website: PropTypes.string,
  donationLink: PropTypes.string,
  outcome: PropTypes.oneOf([
    // if the election is passed, what was the outcome?
    "Won",
    "Lost",
    "Unknown"
  ])
};

Candidate.defaultProps = {
  incumbent: false
};

export default Candidate;
