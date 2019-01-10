import React from "react";
import "../style/map.scss";
import states from "../lib/states";

export default props => (
  <div className="map-hover map-state-hover">
    <div>
      <h3>{states[props.name]}</h3>
      <table>
        <tbody>
          <tr>
            <th>Total Nominations</th>
            <td>{props.nominations}</td>
          </tr>
        </tbody>
      </table>
      <span className="note">click to show districts</span>
    </div>
  </div>
);
