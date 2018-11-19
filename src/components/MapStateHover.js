import React from 'react'
import '../style/map.scss'

export default props => (
  <div className="map-hover map-state-hover">
    <div>
      <h3>{props.name}</h3>
      <table>
        <tbody>
          <tr>
            <th>Total Nominations</th>
            <td>6,302</td>
          </tr>
        </tbody>
      </table>
      <span className="note">click to show districts</span>
    </div>
  </div>
)
