import React from "react";
import Link from "gatsby-link";
import MapSidebarRow from "./MapSidebarRow";
import "../style/map.scss";

const stateSortFn = props => (a, b) =>
  countOfDistrict(props, b) - countOfDistrict(props, a);

const countOfDistrict = (props, district) => {
  return props.districtLookup[district.name] || 0;
};

const wrapCountFn = props => district => countOfDistrict(props, district);

const getDistrictDetails = props => district =>
  props.districtsInView.filter(
    d => d.state == district.state && d.district == district.district
  )[0];

const renderOverView = props => (
  <React.Fragment>
    <div className="map-sidebar-header extra-bold-m home-subheader-b">
      Most Nominated Districts
    </div>
    {props.districtsInView
      .sort(stateSortFn(props))
      .slice(0, 5)
      .map(d => (
        <MapSidebarRow
          district={d}
          countFn={wrapCountFn(props)}
          details={getDistrictDetails(props)(d)}
          hovered={
            props.hoveredDistrict && props.hoveredDistrict.name == d.name
          }
          setHoveredDistrict={() => props.setHoveredDistrict(d)}
          setSelectedDistrict={() => props.setSelectedDistrict(d)}
        />
      ))}
  </React.Fragment>
);

const renderStateView = props => (
  <React.Fragment>
    <div className="map-sidebar-header extra-bold-m home-subheader-b">
      Most Nominated Districts in {props.selectedState.name}
    </div>
    {props.districtsInView
      .filter(d => d.state == props.selectedState.name)
      .sort(stateSortFn(props))
      .slice(0, 5)
      .map(d => (
        <MapSidebarRow
          district={d}
          countFn={wrapCountFn(props)}
          details={getDistrictDetails(props)(d)}
          hovered={
            props.hoveredDistrict && props.hoveredDistrict.name == d.name
          }
          setHoveredDistrict={() => props.setHoveredDistrict(d)}
          setSelectedDistrict={() => props.setSelectedDistrict(d)}
        />
      ))}
  </React.Fragment>
);

const renderDistrictView = props => (
  <React.Fragment>
    <div className="map-sidebar-header extra-bold-m home-subheader-b">
      {props.selectedDistrict.name}
    </div>
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
