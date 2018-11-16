import React from 'react'

export default props => (
  <div className="map-popup map-cd-popup">
    <div>
      <span className="close" onClick={props.onClose}>
        x
      </span>
      <h3>{props.name}</h3>
      <table>
        <tr>
          <th>Total Nominations</th>
          <td>6,302</td>
        </tr>
      </table>
      <div class="actions">
        <a href="/" class="cta-nominate">
          Nominate
        </a>
        <a href="/" class="cta-donate">
          Donate
        </a>
      </div>
    </div>
  </div>
)
