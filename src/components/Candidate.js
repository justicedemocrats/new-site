import PropTypes from "prop-types";
import React from "react";
import '../style/candidate.scss'

const defaultImage = '/assets/Fist.svg'
const officeTypeMap = {
  governor: 'GOV',
  senate: 'SN'
}

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
  office,
  incumbent
}) => (
  <div className="candidate">
    <div className="headshot" style={{ backgroundImage: `url(${image || defaultImage})` }}>
      <div className="race">
        {state}-
        {office == 'house' ? district : officeTypeMap[office]}
      </div>
    </div>
    <div className="meta">
      <div className="nameIncumbent">
        <span className="name">{firstName} {lastName}</span>
        <span className="incumbent">{incumbent && '(Incumbent)'}</span>
      </div>
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
