import React from "react";
import {
  MapboxGL,
  Map,
  Marker,
  ZoomControl,
  Layer,
  Feature,
  Source,
  Popup
} from "../components/MapWrapper";
import MapDistrictHover from "../components/MapDistrictHover";
import MapStateHover from "../components/MapStateHover";
import MapPopupCandidate from "../components/MapPopupCandidate";
import MapGeocoder from "../components/MapGeocoder";
import MapLegends from "../components/MapLegends";
import MapStateStatus from "../components/MapStateStatus";

import "../style/map.scss";

const SAMPLE_DATA = [
  { state: "California", count: 1000, target: 6500, abbr: "CA" },
  { state: "New York", count: 500, target: 4000, abbr: "NY" },
  { state: "Maryland", count: 500, target: 1200, abbr: "MD" },
  { state: "Conneticut", count: 100, target: 1500, abbr: "CT" }
];

const mapData = {
  style: "mapbox://styles/justicedemocrats/cjpk6niji0vec2splua1fs6e9",
  layers: {
    district: "cjpk209eo0equ2qqdjp6bs0ps",
    state: "cjpk1tg000ekd2qqdhsymy2jo"
  },
  districtTileSource: "mapbox://justicedemocrats.districts",
  stateTileSource: "mapbox://justicedemocrats.states"
};

const print = s => {
  console.log(s);
  return s;
};

const initialState = {
  selectedState: null,
  selectedDistrict: null,
  selectedDistrictMarker: null,
  hoveredState: null,
  hoveredStateMarker: null,
  hoveredDistrict: null,
  hoveredDistrictMarker: null
};

export default class MapPage extends React.Component {
  state = Object.assign({}, initialState);
  map = null;

  /* TODO – zoom to containing district, not actual address, and start as if it had been clicked on */
  onGeolocate = result => {
    const center = result.geometry.location;
    const ne = result.geometry.viewport.northeast;
    const sw = result.geometry.viewport.southwest;
    const bbox = [[sw.lng, sw.lat], [ne.lng, ne.lat]];
    let stateId = null;

    // Check if type is street_address, otherwise, just choose state?
    if (result.types.includes("street_address")) {
      //Set state and CD of feature
      this.map.fitBounds(bbox, { padding: 300, animate: false });
      const pbox = [this.map.project(bbox[0]), this.map.project(bbox[1])];
      const target = this.map.queryRenderedFeatures(pbox, {
        layers: ["district-fill"]
      });

      if (target.length > 0) {
        stateId = target[0].properties.STATEFP;
        this.setState({
          selectedCD: target[0].properties,
          selectedState: stateId
        });
      }
    } else {
      this.map.fitBounds(bbox, { padding: 100, animate: false });
    }

    // console.log("Map setting pain property ~~>", stateId);
    // Show all districts in the state
    if (stateId !== null) {
      this.map.setPaintProperty("district-boundaries", "line-opacity", [
        "case",
        ["==", ["get", "STATEFP"], `${stateId}`],
        1,
        0
      ]);
      this.map.setPaintProperty("district-fill", "fill-opacity", [
        "case",
        ["==", ["get", "STATEFP"], `${stateId}`],
        0.1,
        0
      ]);
    }
  };

  onStyleLoad = map => {
    this.map = map;
    map.setCenter({ lng: -95.7129, lat: 37.0902 });
    map.setZoom(4);

    map.on("mousemove", "states-fill", this.onMouseMove["states-fill"]);
    map.on("mousemove", "district-fill", this.onMouseMove["district-fill"]);

    map.on("click", "district-fill", this.onClick["district-fill"]);
    map.on("click", "states-fill", this.onClick["states-fill"]);
  };

  onZoomEnd = () => {
    // if (this.map.getZoom() >= 4) {
    //   this.setState(Object.assign({}, initialState));
    // }
  };

  onMouseMove = {
    "states-fill": e => {
      const properties = e.features[0].properties;
      const state = properties.name;

      // When you're zoomed in on a state, and you hover over a nearby state
      // highlight the howevered state
      if (!this.state.selectedState) {
        this.setState({
          hoveredState: properties,
          hoveredStateMarker: [e.lngLat.lng, e.lngLat.lat]
        });
      } else {
        this.setState({ hoveredStateMarker: null });
      }
    },
    "district-fill": e => {
      const properties = e.features[0].properties;
      const { state, district, name: state_district } = properties;

      // If we're zoomed in, (selectedState is not null)
      // and we've selected the state clicked on,
      // and we have selected a district that's not the one being hovered,
      // set hoveredDistrict and the hoveredDistrictMarker
      const inSelectedState =
        this.state.selectedState && this.state.selectedState.name == state;

      const inSelectedDistrict =
        this.state.selectedDistrict &&
        this.state.selectedDistrict.name == state_district;

      if (inSelectedState && !inSelectedDistrict) {
        this.setState({
          hoveredDistrict: properties,
          hoveredDistrictMarker: [e.lngLat.lng, e.lngLat.lat]
        });
      } else {
        this.setState({ hoveredDistrict: null, hoveredDistrictMarker: null });
      }
    }
  };

  onClick = {
    /* Clear popups, select a state to fill, zoom there */
    "states-fill": e => {
      const properties = e.features[0].properties;

      const clickWasInSameStateAsSelectedDistrict =
        this.state.selectedDistrict &&
        this.state.selectedDistrict.state == properties.name;

      if (!clickWasInSameStateAsSelectedDistrict) {
        this.setState({
          selectedDistrict: null,
          selectedState: properties,
          hoveredStateMarker: null,
          hoveredState: null
        });
      }

      this.zoomToBounds(e.features[0].geometry);
    },
    "district-fill": e => {
      const properties = e.features[0].properties;
      const { state, district, name: state_district } = properties;

      const clickedOnCurrentState =
        this.state.selectedState && state === this.state.selectedState.name;

      if (clickedOnCurrentState) {
        this.setState({
          selectedDistrict: properties,
          selectedDistrictMarker: [e.lngLat.lng, e.lngLat.lat],
          hoveredDistrictMarker: null,
          hoveredDistrict: null
        });
      }
    }
  };

  zoomToBounds = geo => {
    const bounds = this.getBounds(geo);
    if (this.map.getZoom() <= 5) {
      this.map.fitBounds(bounds, { padding: 100, animate: false });
    }
  };

  onPopupClose = e => {
    this.setState({ selectedCD: null, popupLngLat: null });
  };

  getBounds = geom => {
    // Zoom in to State
    let coordinates = geom.coordinates;
    if (coordinates.length > 1) {
      let newCoord = [];
      coordinates.forEach(coordSet => {
        newCoord = newCoord.concat(coordSet[0]);
      });
      coordinates = newCoord;
    } else {
      coordinates = coordinates[0];
    }

    const init = coordinates[0];
    const bounds = coordinates.reduce(function(bounds, coord) {
      return bounds.extend(coord);
    }, new MapboxGL.LngLatBounds(init, init));

    // return [0, 0];
    return bounds;
  };

  render() {
    const {
      selectedState,
      selectedDistrict,
      selectedDistrictMarker,
      hoveredState,
      hoveredStateMarker,
      hoveredDistrict,
      hoveredDistrictMarker
    } = this.state;

    const queries = {
      state: {
        isSelected: [
          "==",
          ["get", "name"],
          selectedState ? selectedState.name : "--"
        ]
      },
      district: {
        isSelected: [
          "==",
          ["get", "name"],
          selectedDistrict ? selectedDistrict.name : "--"
        ],
        isInState: [
          "==",
          ["get", "state"],
          selectedState ? selectedState.name : "--"
        ]
      }
    };

    const districtInterpolation = [
      "interpolate",
      ["linear"],
      ["get", "nominations"],
      0,
      0,
      50,
      1
    ];

    const localDistrictInterpolation = [
      "interpolate",
      ["linear"],
      ["get", "nominations"],
      0,
      0,
      10,
      1
    ];

    return (
      <div className="map-container">
        <section className="map-area">
          <Map
            style={mapData.style}
            containerStyle={{
              height: "100%",
              width: "100%"
            }}
            onStyleLoad={this.onStyleLoad}
            onZoomEnd={this.onZoomEnd}
          >
            <ZoomControl className="zoom-control" position="top-left" />
            {/* Congressional Districts */}
            <Source
              id="districts"
              tileJsonSource={{
                type: "vector",
                url: mapData.districtTileSource
              }}
            />
            <Layer
              type="line"
              id="district-boundaries"
              sourceId="districts"
              sourceLayer="districts"
              before="waterway"
              // If we've selected a state, show its district boundaries
              paint={{
                "line-color": "red",
                "line-opacity": selectedState
                  ? ["case", queries.district.isInState, 1, 0]
                  : 0
              }}
              layout={{
                visibility: "visible"
              }}
            />
            <Layer
              type="fill"
              id="district-fill"
              sourceId="districts"
              sourceLayer="districts"
              before="waterway"
              // If we've selected a district, show it as green, and give other districts no fill
              paint={{
                "fill-color": selectedDistrict
                  ? ["case", queries.district.isSelected, "#00769c", "white"]
                  : "#00769c",
                "fill-opacity": selectedDistrict
                  ? ["case", queries.district.isSelected, 1, 0]
                  : selectedState
                  ? [
                      "case",
                      queries.district.isInState,
                      localDistrictInterpolation,
                      0
                    ]
                  : localDistrictInterpolation
              }}
            />
            {/* States */}
            <Source
              id="states"
              tileJsonSource={{
                type: "vector",
                url: mapData.stateTileSource
              }}
            />
            <Layer
              type="fill"
              id="states-fill"
              sourceId="states"
              sourceLayer="states"
              before="waterway"
              paint={{
                "fill-color": "green",
                "fill-opacity": selectedState
                  ? ["case", queries.state.isSelected, 0.1, 0]
                  : 0
              }}
            />
            {/* 

            ***** Hovered State ***** 

            */}
            {hoveredStateMarker && (
              <Marker
                coordinates={hoveredStateMarker}
                anchor="bottom"
                className="mb-mkr-hovered-state"
              >
                <MapStateHover {...hoveredState} />
              </Marker>
            )}
            {/*

            ***** Hovered District *****
            
            */}
            {hoveredDistrict && hoveredDistrictMarker && (
              <Marker
                coordinates={hoveredDistrictMarker}
                anchor="bottom"
                className="mb-mkr-hovered-state"
              >
                <MapDistrictHover {...hoveredDistrict} />
              </Marker>
            )}
            {/*

            ***** Selected District *****

            */}
            {selectedDistrict && (
              <Marker
                coordinates={selectedDistrictMarker}
                anchor="bottom"
                className="mb-mkr-hovered-state"
              >
                <MapPopupCandidate {...selectedDistrict} />
              </Marker>
            )}
          </Map>

          <MapLegends
            splits={[
              { label: "40%", color: "blue" },
              { label: "60%", color: "yellow" },
              { label: "80%", color: "brown" },
              { label: "100%", color: "purple" }
            ]}
          />
        </section>
        <section className="activity-area">
          <div className="aa-search">
            <MapGeocoder onGeolocate={this.onGeolocate} />
          </div>
          {this.state.selectedCD && (
            <div>
              <h4>District Details</h4>
              <div className="aa-candidate-container">
                <MapPopupCandidate
                  name="NY-14"
                  candidate_name="Alexandria Ocasio-Cortez"
                  image={
                    "/img/jd_site_alexandriaocasiocortez_550x600_061218.jpg"
                  }
                  description={`New York’s 14th Congressional District urgently needs access to more reliable jobs, increased access to family support services like parental leave and free childcare. She will fight for universal access to quality education from pre-K until college regardless of income and enrollment status because your ZIP code should never determine your quality of life.`}
                  onClose={this.onPopupClose}
                />
              </div>
            </div>
          )}
          <h4>State Stats</h4>
          <div className="aa-stats">
            {SAMPLE_DATA.map(item => (
              <MapStateStatus {...{ ...item }} />
            ))}
          </div>
        </section>
      </div>
    );
  }
}
