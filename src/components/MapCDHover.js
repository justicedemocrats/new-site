import React from 'react'
import '../style/map.scss'
export default props => (
  <div className="map-hover map-cd-hover">
    <div>
      <h3>{props.name}</h3>
      <table>
        <tr>
          <th>Total Nominations</th>
          <td>6,302</td>
        </tr>
      </table>
      <span class="note">click to expand</span>
    </div>
  </div>
)
