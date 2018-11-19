import React from 'react'
import '../style/map.scss'
export default props => (
  <div className="map-hover map-cd-candidate map-cd-candidate-popup">
    <div>
      <div className="candidate-profile">
        <div
          className="candidate-pic"
          style={{ backgroundImage: `url(${props.image})` }}
        />
        <div className="candidate-info">
          <h3 className="candidate-name">
            {props.candidate_name}{' '}
            <span>
              {props.is_incumbent || true ? 'incumbent' : 'candidate'}
            </span>
          </h3>
          <h3>{props.name}</h3>
        </div>
      </div>
      <span className="note">click to expand</span>
    </div>
  </div>
)
