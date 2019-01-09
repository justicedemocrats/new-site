import React from "react";
import Link from "gatsby-link";
import "../style/map.scss";

const stateSortFn = props => (a, b) =>
  countOfDistrict(props, b) - countOfDistrict(props, a);

const countOfDistrict = (props, district) =>
  props.districtLookup[`${district.state}-${district.district}`];

const renderOverView = props => (
  <React.Fragment>
    <div className="map-sidebar-header"> Most Nominated Districts </div>
    {props.districtBreakdown
      .sort(stateSortFn(props))
      .slice(0, 5)
      .map(d => (
        <div className="map-sidebar-item">
          {d.state + "-" + d.district}: {countOfDistrict(props, d)}
        </div>
      ))}
  </React.Fragment>
);

const renderStateView = props => (
  <React.Fragment>
    <div className="map-sidebar-header">
      Most Nominated Districts in {props.selectedState.name}
    </div>
    {props.districtBreakdown
      .filter(d => d.state == props.selectedState.name)
      .sort(stateSortFn(props))
      .slice(0, 5)
      .map(d => (
        <div className="map-sidebar-item">
          {d.state + "-" + d.district}: {countOfDistrict(props, d)}
        </div>
      ))}
  </React.Fragment>
);

const renderDistrictView = props => (
  <React.Fragment>
    <div className="map-sidebar-header">{props.selectedDistrict.name}</div>
  </React.Fragment>
);

export default props => (
  <div className="map-sidebar">
    {props.selectedDistrict
      ? renderDistrictView(props)
      : props.selectedState
      ? renderStateView(props)
      : renderOverView(props)}
  </div>
);
