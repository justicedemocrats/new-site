import PropTypes from 'prop-types'
import React from 'react'

const Candidate = ({firstName, lastName, office, electionType, district, state, electionDate, image, bio, website, donationLink, outcome}) => {
  return (
    <div>
      <div>
        {firstName} {lastName}
      </div>
      <div>
        Election for {office} on {electionDate}
      </div>
    </div>
  )
}

Candidate.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  office: PropTypes.oneOf([
    'governor',
    'senate',
    'house'
  ]).isRequired,
  electionType: PropTypes.oneOf([
    'fake',
    'primary',
    'general'
  ]).isRequired,
  incumbent: PropTypes.bool.isRequired,
  district: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  electionDate: PropTypes.string.isRequired,
  image: PropTypes.string,
  website: PropTypes.string,
  donationLink: PropTypes.string,
  outcome: PropTypes.oneOf([ // if the election is passed, what was the outcome?
    'won',
    'lost'
  ])
}

Candidate.defaultProps = {
  incumbent: false
}

export default Candidate
