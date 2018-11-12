import React from 'react';
import MapboxGL from 'mapbox-gl';
import ReactMapboxGl, { LngLatBounds, ScaleControl, ZoomControl, Layer, 
                        Feature, Source, GeoJSONLayer } from 'react-mapbox-gl';
import "../style/map.scss";


const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoicmNzY2FzdGlsbG8iLCJhIjoiY2pseDZ2bmp0MDcwYzNwcGp1bjBqNHo4aSJ9.3bD8gQrMAIEqV6yyS-__vg"
  });

export default class MapPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedState: null,
            hoveredState: null,
            stateCDs: [],
            hoveredCD: null
        };
    }

    onStyleLoad(map) {

        map.setCenter({lng: -95.7129, lat: 37.0902});
        map.setZoom(4);
        map.on('mousemove', 'cd-fill', (e) => {

        });

        map.on('mousemove', 'states-fill', e => {
            const stateProp =  e.features[0].properties;
            // Set data to highlight State

            // console.log("Testing ::", this.state.selectedState, stateProp.STATE, this.selectedState !== stateProp.STATE);
            const relatedFeatures = this.state.selectedState !== stateProp.STATE ? map.querySourceFeatures('states', {
                sourceLayer: 'gz_2010_us_040_00_5m-81sosm',
                filter: ['==', 'STATE', stateProp.STATE]
            }) : null;

            // console.log(relatedFeatures);
            this.setState({ hoveredState: relatedFeatures });

            // console.log("Hovered State:: ", this.state.hoveredState, " Selected State:: ", this.state.selectedState );
        });

        // Select a state to focus
        map.on('click', 'states-fill', e => {
            const stateProp =  e.features[0].properties;
            this.setState({ selectedState: stateProp.STATE });
            
            // GEt all vectors for the state
            const stateCDs = stateProp.STATE ? map.querySourceFeatures('congressional-districts', {
                sourceLayer: 'cd-0ayx0b',
                filter: ['==', 'STATEFP', `${stateProp.STATE}`]
            }) : null;

            // Show all districts in the state
            map.setPaintProperty('cd-line', 'line-opacity', ['case', 
                ['==', ['get', 'STATEFP'], `${stateProp.STATE}`], 1,
                0
            ]);

            // Zoom in to State
            let coordinates = e.features[0].geometry.coordinates;
            if (coordinates.length > 1) {
                let newCoord = [];    
                coordinates.forEach(coordSet => {
                    newCoord = newCoord.concat(coordSet[0]);
                    console.log("New Coords", coordSet[0], newCoord);
                });
                coordinates = newCoord;
            } else {
                coordinates = coordinates[0];
            }
            
            const init = coordinates[0];
            const bounds = coordinates.reduce(function (bounds, coord) {
                return bounds.extend(coord);
            }, new MapboxGL.LngLatBounds(init, init))
            
            map.fitBounds(bounds, { padding: 100 });

        });

        
    } 

    render() {
        return (
        <div className='map-container'>
            <section className='map-area'>
                <Map
                    
                    style="mapbox://styles/rcscastillo/cjo93ejwe010e2spp07lyalev"
                    containerStyle={{
                        height: "100%",
                        width: "100%",        
                    }}
                    onMouseMove={(map, evt) => { 
                        // console.log(map, evt) 
                        }
                    }

                    onStyleLoad={this.onStyleLoad.bind(this)}
                >
                    <ZoomControl className='zoom-control' position={'top-left'}/>

                    {/* Congressional Districts */}
                    <Source 
                        id="congressional-districts"
                    tileJsonSource={{
                        "type": "vector", 
                        "url": "mapbox://rcscastillo.5r1x01zm"
                    }}/>
                    <Layer
                        type='line'
                        id='cd-line'
                        sourceId={'congressional-districts'}
                        sourceLayer={'cd-0ayx0b'}
                        before={'waterway-label'}
                        paint={{
                            'line-color': 'red',
                            'line-opacity': 0
                        }}
                        layout={{
                            'visibility': 'visible'
                        }}
                    ></Layer>

                    {/* States */}
                    <Source
                        id="states"
                        tileJsonSource={{
                            "type": "vector", 
                            "url": "mapbox://rcscastillo.25eloeq2"
                        }} />

                    <Layer
                        type='fill'
                        id='states-fill'
                        sourceId={'states'}
                        sourceLayer={'gz_2010_us_040_00_5m-81sosm'}
                        before={'waterway-label'}
                        paint={{
                            'fill-color': 'green',
                            'fill-opacity': 0.1
                        }}
                    ></Layer>

                     {/* Hover */}
                    <Layer
                        type='fill'
                        id='states-hover-layer'
                        before={'cd-line'}
                        paint={{
                            'fill-color': '#FAFAFA',
                            'fill-opacity': 1
                        }}
                        >
                        {this.state.hoveredState && this.state.hoveredState.map(state => <Feature coordinates={state.geometry.coordinates}/>)}
                    </Layer>

                    
                </Map>
            </section>
            <section className='activity-area'>
            </section>
        </div>);
    }
}



// {/* Activated CDs */}
// <Layer
//  type='fill'
//  id='active-state-cd-fill'
//  paint={{
//      'fill-color': 'blue',
//      'fill-opacity': 0.1,
//  }}
// >
//  {this.state.stateCDs && this.state.stateCDs.map(cd => <Feature coordinates={cd.geometry.coordinates}/>)}
// </Layer>
// <Layer
//  type='line'
//  id='active-state-cd-line'
//  paint={{
//      'line-width': 2,
//      'line-color': 'black'
//  }}
// >
//  {this.state.stateCDs && this.state.stateCDs.map(cd => <Feature coordinates={cd.geometry.coordinates}/>)}
// </Layer>