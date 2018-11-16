import React from 'react'
import '../style/map.scss'
export default props => (
  <div className="map-hover map-cd-candidate map-cd-candidate-popup">
    <div>
      <div class="candidate-profile">
        <div
          class="candidate-pic"
          style={{ backgroundImage: `url(${props.image})` }}
        />
        <div class="candidate-info">
          <h3 class="candidate-name">
            {props.candidate_name}{' '}
            <span>
              {props.is_incumbent || true ? 'incumbent' : 'candidate'}
            </span>
          </h3>
          <h3>{props.name}</h3>
        </div>
      </div>
      <span class="note">click to expand</span>
    </div>
  </div>
)
