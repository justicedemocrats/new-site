import React from "react";
let MapboxGL;
let ReactMapboxGl;
let Map;
let Marker;
let ZoomControl;
let Layer;
let Feature;
let Source;
let Popup;

if (typeof window !== `undefined`) {
  MapboxGL = require("mapbox-gl");
  ReactMapboxGl = require("react-mapbox-gl");
  console.log(ReactMapboxGl);
  Map = ReactMapboxGl.Map({
    accessToken:
      "pk.eyJ1IjoianVzdGljZWRlbW9jcmF0cyIsImEiOiJjamQ2Y2p0anQyMDlyMzNud3ppbm1rcG9sIn0.mxzbQ35NUz70LILrs5yOYA"
  });
  Marker = ReactMapboxGl.Marker;
  ZoomControl = ReactMapboxGl.ZoomControl;
  Layer = ReactMapboxGl.Layer;
  Feature = ReactMapboxGl.Feature;
  Source = ReactMapboxGl.Source;
  Popup = ReactMapboxGl.Popup;
} else {
  const makeMock = () => {
    return class Mock extends React.Component {
      render() {
        return <div />;
      }
    };
  };

  Map = makeMock;
  Marker = makeMock();
  ZoomControl = makeMock();
  Layer = makeMock();
  Feature = makeMock();
  Source = makeMock();
  Popup = makeMock();
}

export { Map, MapboxGL, Marker, ZoomControl, Layer, Feature, Source, Popup };
