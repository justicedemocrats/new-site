import React from 'react'
import '../style/map.scss'
export default props => (
  <div className="map-popup map-popup-candidate">
    <div>
      <span className="close" onClick={props.onClose}>
        x
      </span>
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
          <div class="candidate-actions">
            <a href="/">
              <img src="/assets/candidate-home.svg" />
            </a>
            <a href="/">
              <img src="/assets/candidate-donate.svg" />
            </a>
          </div>
        </div>
      </div>
      <div class="candidate-description">
        <p>{props.description}</p>
      </div>
    </div>
  </div>
)
