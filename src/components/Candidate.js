import PropTypes from 'prop-types'
import React from 'react'
import '../style/candidate.scss'

const defaultImage = '/assets/Fist.svg'
const officeTypeMap = {
  governor: 'GOV',
  senate: 'SN',
  'lieutenant-governor': 'LTGOV',
}
const electionTypeMap = {
  fake: 'FAKE',
  primary: 'Primary',
}

class Candidate extends React.Component {
  state = { expanded: false }

  toggleExpanded = ev => {
    ev.stopPropagation()
    this.setState({ expanded: !this.state.expanded })
  }

  expand = () => this.setState({ expanded: true })
  collapse = () => this.setState({ expanded: false })

  render() {
    const {
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
      incumbent,
      hideDonate,
    } = this.props

    console.log(hideDonate)

    let ed = new Date(electionDate)
    let [d, m] = [ed.getDate(), ed.getMonth()]
    d = d + 1
    m = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ][m]
    return (
      <div className="candidate-container">
        <div
          className={`candidate ${this.state.expanded && 'no-fixed-height'}`}
          onClick={this.expand}
        >
          <div
            className="headshot"
            style={{
              backgroundImage: `url(${(image || defaultImage).trim('"')})`,
              backgroundSize: 'cover',
            }}
          >
            {false
              ? <div className="office bold-m dark-blue-bg">WON</div>
              : <div className="office bold-m">
                  {state}-{office == 'house' ? district : officeTypeMap[office]}
                </div>}
          </div>

          <div className="meta">
            <div className="nameIncumbent">
              <span className="name bold-m">
                {firstName} {lastName}
              </span>
              <span className="incumbent">{incumbent && '(Incumbent)'}</span>
            </div>
            <div className="office bold-m">
              {state}-{office == 'house' ? district : officeTypeMap[office]}
            </div>

            {/* <div className="race-date">
              <span className="race bold-m">
                {electionType === "general"
                  ? "General Election"
                  : `${state} ${electionTypeMap[electionType]}`}
              </span>
              {outcome == "Won" ? (
                <span
                  className="date bold-m orange-color"
                  style={{ textTransform: "uppercase" }}
                >
                  {m} {d}
                </span>
              ) : (
                <span>
                  |
                  <span className="date medium-m">
                    {m} {d}
                  </span>
                </span>
              )}
            </div>
 */}
            <div className="links-container">
              {!hideDonate &&
                <a href={website} target="_blank">
                  <img src="/assets/candidate-home.svg" />
                </a>}
              {donationLink &&
                !hideDonate &&
                <a href={donationLink} target="_blank">
                  <img src="/assets/candidate-donate.svg" />
                </a>}
            </div>
            <div className="read-more" onClick={this.toggleExpanded}>
              {this.state.expanded
                ? <img src="/assets/small-toggle-minus.svg" />
                : <img src="/assets/small-toggle-plus.svg" />}

              {this.state.expanded ? 'Close' : 'Read More'}
            </div>
          </div>
        </div>

        {this.state.expanded &&
          <div className="candidate-blurb">
            <br />
            <p> {blurb} </p>
          </div>}
      </div>
    )
  }
}

Candidate.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  office: PropTypes.oneOf(['governor', 'senate', 'house']).isRequired,
  electionType: PropTypes.oneOf(['fake', 'primary', 'general']).isRequired,
  incumbent: PropTypes.bool.isRequired,
  district: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  electionDate: PropTypes.string.isRequired,
  image: PropTypes.string,
  website: PropTypes.string,
  donationLink: PropTypes.string,
  outcome: PropTypes.oneOf([
    // if the election is passed, what was the outcome?
    'Won',
    'Lost',
    'Unknown',
  ]),
}

Candidate.defaultProps = {
  incumbent: false,
}

export default Candidate
