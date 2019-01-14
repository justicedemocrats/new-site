import React from "react";
import polylabel from "polylabel";
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
import MapSidebar from "../components/MapSidebar";

import "../style/map.scss";

const colors = {
  "jd-dark-dark-blue": "#051832",
  "jd-text-gray": "#575a5f",
  "jd-dark-blue": "#00769c",
  "jd-orange": "#d5176e",
  "jd-light-blue": "#6fccdd",
  "jd-dark-purple": "#311956"
};

const mapData = {
  style:
    "mapbox://styles/justicedemocrats/cjpkajukh00aw2qm9kxnqmvrv?fresh=true",
  layers: {
    district: "cjpk209eo0equ2qqdjp6bs0ps",
    state: "cjpk1tg000ekd2qqdhsymy2jo"
  },
  districtTileSource: "mapbox://justicedemocrats.districts",
  stateTileSource: "mapbox://justicedemocrats.states"
};

const DISTRICT_BREAKDOWN_ENDPOINT =
  "https://api.justicedemocrats.com/district-breakdown";

/*
 ----- ----- BEHAVIOR ----- -----
 State options –
  - Nothing is selected - selectedState: null, selectedDistrict: null
  
  - State is selected - selectedState: {}, selectedDistrict: null
    - visuals: enhanced state border
    - sidebar: top districts in state
  
  - District is selected – selectedState: {}, selectedDistrict: {}
    - visuals: enhanced district border
    - sidebar: rep info
*/

const defaultState = {
  mode: "sidebar",
  selectedState: null,
  selectedDistrict: null,
  selectedDistrictMarker: null,
  hoveredState: null,
  hoveredStateMarker: null,
  hoveredDistrict: null,
  hoveredDistrictMarker: null
};

const initialState = Object.assign({}, defaultState, {
  districtBreakdownQuery: [],
  districtBreakdown: [],
  districtLookup: {},
  districtsInView: []
});

export default class MapPage extends React.Component {
  state = Object.assign({}, initialState);
  map = null;
  zoomStartedAt = undefined;

  componentDidMount() {
    window.request.get(DISTRICT_BREAKDOWN_ENDPOINT).end((err, res) => {
      this.setState({
        districtBreakdownQuery: this.produceDistrictInterpolationQuery(
          res.body || []
        ),
        districtLookup: this.produceDistrictLookup(res.body || []),
        districtBreakdown: res.body
      });
    });
  }

  render() {
    const {
      selectedState,
      selectedDistrict,
      selectedDistrictMarker,
      hoveredState,
      hoveredStateMarker,
      hoveredDistrict,
      hoveredDistrictMarker,
      districtBreakdown,
      districtBreakdownQuery,
      districtLookup,
      districtsInView
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

    const styleTree = {
      districtBoundaries: selectedDistrict
        ? {
            "line-color": [
              "case",
              queries.district.isSelected,
              colors["jd-dark-purple"],
              colors["jd-dark-dark-blue"]
            ],
            "line-opacity": ["case", queries.district.isInState, 1, 0],
            "line-width": ["case", queries.district.isSelected, 2, 1]
          }
        : selectedState
        ? {
            "line-color": colors["jd-dark-dark-blue"],
            "line-opacity": ["case", queries.district.isInState, 1, 0]
          }
        : {
            "line-opacity": 0
          }
    };

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
            onZoomStart={this.onZoomStart}
            onZoomEnd={this.onZoomEnd}
          >
            <ZoomControl className="zoom-control" position="top-left" />
            {/*

            Congressional Districts Source

            */}
            <Source
              id="districts"
              tileJsonSource={{
                type: "vector",
                url: mapData.districtTileSource
              }}
            />
            {/*

            Congressional Districts Lines

            */}
            <Layer
              type="line"
              id="district-boundaries"
              sourceId="districts"
              sourceLayer="districts"
              before="waterway"
              // If we've selected a state, show its district boundaries
              paint={styleTree.districtBoundaries}
              layout={{
                visibility: "visible",
                "line-join": "round"
              }}
            />
            {/*

            Congressional Districts Fill

            */}
            <Layer
              type="fill"
              id="district-fill"
              sourceId="districts"
              sourceLayer="districts"
              before="waterway"
              paint={{
                "fill-color": colors["jd-dark-blue"],
                "fill-opacity": districtBreakdownQuery
              }}
            />
            {/* 
            
            States Source

            */}
            <Source
              id="states"
              tileJsonSource={{
                type: "vector",
                url: mapData.stateTileSource
              }}
            />
            {/* 
            
            States Line

            */}
            <Layer
              type="line"
              id="states-line"
              sourceId="states"
              sourceLayer="states"
              before="waterway"
              paint={{
                "line-color": colors["jd-orange"],
                "line-width": 2,
                "line-opacity": selectedState
                  ? ["case", queries.state.isSelected, 1, 0]
                  : 0
              }}
              layout={{ "line-join": "round" }}
            />

            {/* 
            
            States Fill

            */}
            <Layer
              type="fill"
              id="states-fill"
              sourceId="states"
              sourceLayer="states"
              before="waterway"
              paint={{
                "fill-opacity": 0
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
            {selectedDistrict && selectedDistrictMarker && (
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
          <div className="divider" style={{ margin: "5px 0px" }} />
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
          <MapSidebar
            {...{
              selectedDistrict,
              selectedState,
              districtBreakdown,
              districtLookup,
              districtsInView,
              hoveredDistrict,
              setHoveredDistrict: this.setHoveredDistrict,
              setSelectedDistrict: this.setSelectedDistrict
            }}
          />
        </section>
      </div>
    );
  }

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
    this.map.setCenter({ lng: -95.7129, lat: 37.0902 });
    this.map.setZoom(4);
    window.map = this.map;

    this.map.on("mousemove", "states-fill", this.onMouseMove["states-fill"]);
    this.map.on(
      "mousemove",
      "district-fill",
      this.onMouseMove["district-fill"]
    );

    this.map.on("click", "district-fill", this.onClick["district-fill"]);
    this.map.on("click", "states-fill", this.onClick["states-fill"]);
  };

  setHoveredDistrict = hoveredDistrict => this.setState({ hoveredDistrict });
  setSelectedDistrict = selectedDistrict => {
    const stateUpdate = { selectedDistrict };

    const district = this.getDistrictFeature(selectedDistrict.name);
    console.log(district);
    this.zoomToBounds(district.geometry);

    if (district) {
      stateUpdate.selectedState = this.getStateFeature(
        selectedDistrict.state
      ).properties;
    }

    this.setState(stateUpdate);
  };

  onZoomStart = () => {
    this.zoomStart = this.map.getZoom();
  };

  onZoomEnd = ev => {
    const zoomStart = this.zoomStart;
    const zoomEnd = this.map.getZoom();
    this.updatePropertiesInView();

    if (zoomEnd < zoomStart && zoomEnd < 4) {
      this.setState(defaultState);
    }
    this.zoomStart = undefined;
  };

  onMouseMove = {
    "states-fill": e => {
      this.updatePropertiesInView();
      const properties = e.features[0].properties;
      const state = properties.name;

      // When you're zoomed in on a state, and you hover over a nearby state
      // highlight the howevered state
      if (!this.state.selectedState) {
        this.setState({
          hoveredState: properties,
          hoveredStateMarker: myPolylabel(e.features[0].geometry)
        });
      } else {
        this.setState({ hoveredStateMarker: null });
      }
    },
    "district-fill": e => {
      this.updatePropertiesInView();
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
        const centroid = myPolylabel(e.features[0].geometry);
        this.setState({
          hoveredDistrict: properties,
          hoveredDistrictMarker: centroid
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
          selectedDistrictMarker: myPolylabel(e.features[0].geometry),
          hoveredDistrictMarker: null,
          hoveredDistrict: null
        });
      }
    }
  };

  onPopupClose = e => {
    this.setState({ selectedCD: null, popupLngLat: null });
  };

  ZOOM_TO_NEIGHBORING_STATE = true;
  zoomToBounds = geo => {
    const bounds = this.getBounds(geo);
    if (this.ZOOM_TO_NEIGHBORING_STATE || this.map.getZoom() <= 5) {
      this.map.fitBounds(bounds, { padding: 200, animate: true });
    }
  };

  getBounds = geom => {
    // Zoom in to State
    const coordinates = flattenToPairs(geom.coordinates);

    const bounds = coordinates.reduce(function(bounds, coord) {
      return bounds.extend(coord);
    }, new MapboxGL.LngLatBounds(coordinates[0], coordinates[0]));

    return bounds;
  };

  updatePropertiesInView = () => {
    const districtsInView = this.map
      .queryRenderedFeatures({
        layers: ["district-fill"]
      })
      .map(feature => feature.properties);
    this.setState({ districtsInView });
  };

  produceDistrictInterpolationQuery = breakdown => {
    const counts = breakdown.map(d => d.count);
    const maxNominations = Math.max(...counts);
    const districtInterpolation = ["case"];
    breakdown.forEach(({ state, district, count }) => {
      districtInterpolation.push([
        "==",
        ["get", "name"],
        `${state}-${district}`
      ]);
      districtInterpolation.push(count / maxNominations);
    });
    districtInterpolation.push(0);
    return districtInterpolation;
  };

  produceDistrictLookup = breakdown => {
    const result = {};
    breakdown.forEach(({ state, district, count }) => {
      result[`${state}-${district}`] = count;
    });
    return result;
  };

  getStateFeature = state =>
    this.map.queryRenderedFeatures({
      layers: ["states-fill"],
      filter: ["==", ["get", "name"], state]
    })[0];
  getDistrictFeature = name =>
    this.map.queryRenderedFeatures({
      layers: ["district-fill"],
      filter: ["==", ["get", "name"], name]
    })[0];
}

const flattenToPairs = arr =>
  arr.reduce(
    (acc, val) =>
      Array.isArray(val) && Array.isArray(val[0]) && Array.isArray(val[0][0])
        ? acc.concat(flattenToPairs(val))
        : acc.concat(val),
    []
  );

const myPolylabel = geojson =>
  geojson.type == "Polygon"
    ? polylabel(geojson.coordinates)
    : polylabel(geojson.coordinates[0]);
