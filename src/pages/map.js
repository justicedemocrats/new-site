import React from 'react'
import MapboxGL from 'mapbox-gl'
import ReactMapboxGl, {
  Marker,
  ZoomControl,
  Layer,
  Feature,
  Source,
  Popup,
} from 'react-mapbox-gl'
import MapCDHover from '../components/MapCDHover'
import MapStateHover from '../components/MapStateHover'
import MapPopup from '../components/MapPopup'
import MapCDHoverCandidate from '../components/MapCDHoverCandidate'
import MapPopupCandidate from '../components/MapPopupCandidate'
import MapGeocoder from '../components/MapGeocoder'
import MapLegends from '../components/MapLegends'
import MapStateStatus from '../components/MapStateStatus'

import '../style/map.scss'
const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoicmNzY2FzdGlsbG8iLCJhIjoiY2pseDZ2bmp0MDcwYzNwcGp1bjBqNHo4aSJ9.3bD8gQrMAIEqV6yyS-__vg',
})

const SAMPLE_DATA = [
  { state: 'California', count: 1000, target: 6500, abbr: 'CA' },
  { state: 'New York', count: 500, target: 4000, abbr: 'NY' },
  { state: 'Maryland', count: 500, target: 1200, abbr: 'MD' },
  { state: 'Conneticut', count: 100, target: 1500, abbr: 'CT' },
]

export default class MapPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedState: null,
      selectedCD: null,
      popupLngLat: null,
      hoveredState: null,
      hoveredStateMarker: null,
      hoveredCD: null,
      hoveredCDMarker: null,
    }
  }

  onGeolocate(result) {
    const center = result.geometry.location
    const ne = result.geometry.viewport.northeast
    const sw = result.geometry.viewport.southwest
    const bbox = [[sw.lng, sw.lat], [ne.lng, ne.lat]]
    let stateId = null

    // Check if type is street_address, otherwise, just choose state?
    if (result.types.includes('street_address')) {
      //Set state and CD of feature
      this.map.fitBounds(bbox, { padding: 300, animate: false })
      const pbox = [this.map.project(bbox[0]), this.map.project(bbox[1])]
      const target = this.map.queryRenderedFeatures(pbox, {
        layers: ['cd-fill'],
      })

      if (target.length > 0) {
        stateId = target[0].properties.STATEFP
        this.setState({
          selectedCD: target[0].properties,
          selectedState: stateId,
        })
      }
    } else {
      this.map.fitBounds(bbox, { padding: 100, animate: false })
    }

    // console.log("Map setting pain property ~~>", stateId);
    // Show all districts in the state
    if (stateId !== null) {
      this.map.setPaintProperty('cd-line', 'line-opacity', [
        'case',
        ['==', ['get', 'STATEFP'], `${stateId}`],
        1,
        0,
      ])
      this.map.setPaintProperty('cd-fill', 'fill-opacity', [
        'case',
        ['==', ['get', 'STATEFP'], `${stateId}`],
        0.1,
        0,
      ])
    }
  }

  componentDidMount() {
    this.map = null // I had to.. :-/
  }

  onStyleLoad(map) {
    this.map = map
    map.setCenter({ lng: -95.7129, lat: 37.0902 })
    map.setZoom(4)

    map.on('mousemove', 'states-fill', e => {
      const stateProp = e.features[0].properties

      // Set data to highlight State that is not chosen...
      if (this.state.selectedState !== stateProp.STATE) {
        const relatedFeatures = stateProp.STATE
          ? map.querySourceFeatures('states', {
              sourceLayer: 'gz_2010_us_040_00_5m-81sosm',
              filter: ['==', 'STATE', stateProp.STATE],
            })
          : null

        const bounds = this.getBounds(e.features[0].geometry)
        const hoveredStateMarker = e.lngLat //[(bounds.getEast() + bounds.getWest())/2.0, bounds.getNorth()];
        this.setState({
          hoveredState: relatedFeatures,
          hoveredStateMarker: [e.lngLat.lng, e.lngLat.lat],
        })
      } else {
        this.setState({ hoveredStateMarker: null })
      }
    })

    map.on('mousemove', 'cd-fill', e => {
      const stateProp = e.features[0].properties

      // Set data to highlight State
      if (
        this.state.selectedState &&
        this.state.selectedState == stateProp.STATEFP &&
        (!this.state.selectedCD ||
          this.state.selectedCD.CD116FP !== stateProp.CD116FP)
      ) {
        const relatedFeatures = map.querySourceFeatures(
          'congressional-districts',
          {
            sourceLayer: 'cd-0ayx0b',
            filter: [
              'all',
              ['==', 'CD116FP', stateProp.CD116FP],
              ['==', 'STATEFP', stateProp.STATEFP],
            ],
          }
        )

        this.setState({
          hoveredCD: relatedFeatures,
          hoveredCDMarker: [e.lngLat.lng, e.lngLat.lat],
        })
      } else {
        this.setState({ hoveredCD: null, hoveredCDMarker: null })
      }
    })

    map.on('click', 'cd-fill', e => {
      const cdProps = e.features[0].properties

      if (
        this.state.selectedState &&
        cdProps.STATEFP === this.state.selectedState
      ) {
        this.setState({
          selectedCD: cdProps,
          popupLngLat: [e.lngLat.lng, e.lngLat.lat],
          hoveredCDMarker: null,
        })
      }

      const allEq = [
        'all',
        ['==', ['get', 'CD116FP'], cdProps.CD116FP],
        ['==', ['get', 'STATEFP'], cdProps.STATEFP],
      ]

      if (this.state.selectedState == cdProps.STATEFP) {
        map.setPaintProperty('cd-fill', 'fill-color', [
          'case',
          allEq,
          'green',
          'white',
        ])
        map.setPaintProperty('cd-fill', 'fill-opacity', ['case', allEq, 0.5, 0])
      }
    })

    // Select a state to focus
    map.on('click', 'states-fill', e => {
      const stateProp = e.features[0].properties

      // Clear any popups...
      this.state.selectedState != stateProp.STATE &&
        this.setState({ popupLngLat: null, selectedCD: null })

      this.setState({
        selectedState: stateProp.STATE,
        hoveredStateMarker: null,
        hoveredState: null,
      })

      // Show all districts in the state
      map.setPaintProperty('cd-line', 'line-opacity', [
        'case',
        ['==', ['get', 'STATEFP'], `${stateProp.STATE}`],
        1,
        0,
      ])
      map.setPaintProperty('cd-fill', 'fill-opacity', [
        'case',
        ['==', ['get', 'STATEFP'], `${stateProp.STATE}`],
        0.1,
        0,
      ])

      const bounds = this.getBounds(e.features[0].geometry)
      if (map.getZoom() <= 5) {
        map.fitBounds(bounds, { padding: 100, animate: false })
      }
    })
  }
  onPopupClose(e) {
    this.setState({ selectedCD: null, popupLngLat: null })
  }

  getBounds(geom) {
    // Zoom in to State
    let coordinates = geom.coordinates
    if (coordinates.length > 1) {
      let newCoord = []
      coordinates.forEach(coordSet => {
        newCoord = newCoord.concat(coordSet[0])
      })
      coordinates = newCoord
    } else {
      coordinates = coordinates[0]
    }

    const init = coordinates[0]
    const bounds = coordinates.reduce(function(bounds, coord) {
      return bounds.extend(coord)
    }, new MapboxGL.LngLatBounds(init, init))

    return bounds
  }

  render() {
    return (
      <div className="map-container">
        <section className="map-area">
          <Map
            style="mapbox://styles/rcscastillo/cjo93ejwe010e2spp07lyalev"
            containerStyle={{
              height: '100%',
              width: '100%',
            }}
            onMouseMove={(map, evt) => {}}
            onStyleLoad={this.onStyleLoad.bind(this)}
          >
            <ZoomControl className="zoom-control" position={'top-left'} />

            {/* Congressional Districts */}
            <Source
              id="congressional-districts"
              tileJsonSource={{
                type: 'vector',
                url: 'mapbox://rcscastillo.5r1x01zm',
              }}
            />
            <Layer
              type="line"
              id="cd-line"
              sourceId={'congressional-districts'}
              sourceLayer={'cd-0ayx0b'}
              before={'waterway-label'}
              paint={{
                'line-color': 'red',
                'line-opacity': 0,
              }}
              layout={{
                visibility: 'visible',
              }}
            />
            <Layer
              type="fill"
              id="cd-fill"
              sourceId={'congressional-districts'}
              sourceLayer={'cd-0ayx0b'}
              before={'waterway-label'}
              paint={{ 'fill-opacity': 0 }}
            />

            {/* States */}
            <Source
              id="states"
              tileJsonSource={{
                type: 'vector',
                url: 'mapbox://rcscastillo.25eloeq2',
              }}
            />
            <Layer
              type="fill"
              id="states-fill"
              sourceId={'states'}
              before={'waterway-label'}
              sourceLayer={'gz_2010_us_040_00_5m-81sosm'}
              paint={{
                'fill-color': 'green',
                'fill-opacity': 0.1,
              }}
            />

            {/* Hover */}
            <Layer
              type="fill"
              id="states-hover-layer"
              before={'cd-line'}
              paint={{
                'fill-color': '#ffffff',
                'fill-opacity': 0.5,
              }}
            >
              {this.state.hoveredState &&
                this.state.hoveredState.map(state => (
                  <Feature coordinates={state.geometry.coordinates} />
                ))}
            </Layer>

            <Layer
              type="fill"
              id="cd-hover-layer"
              before={'cd-line'}
              paint={{
                'fill-color': '#FFFFFF',
                'fill-opacity': 0.5,
              }}
            >
              {this.state.hoveredCD &&
                this.state.hoveredCD.map(cd => (
                  <Feature coordinates={cd.geometry.coordinates} />
                ))}
            </Layer>

            {this.state.selectedCD && this.state.popupLngLat && (
              <Popup
                coordinates={this.state.popupLngLat}
                className={'mb-mkr-popup'}
              >
                {this.state.selectedCD.isIncumbent || true ? (
                  <MapPopupCandidate
                    name={'NY-14'}
                    candidate_name={'Alexandria Ocasio-Cortez'}
                    image={
                      '/img/jd_site_alexandriaocasiocortez_550x600_061218.jpg'
                    }
                    description={`New York’s 14th Congressional District urgently needs access to more reliable jobs, increased access to family support services like parental leave and free childcare. She will fight for universal access to quality education from pre-K until college regardless of income and enrollment status because your ZIP code should never determine your quality of life.`}
                    onClose={this.onPopupClose.bind(this)}
                  />
                ) : (
                  <MapPopup
                    name={'NY-14'}
                    onClose={this.onPopupClose.bind(this)}
                  />
                )}
              </Popup>
            )}
            {this.state.hoveredStateMarker && (
              <Marker
                coordinates={this.state.hoveredStateMarker}
                anchor="bottom"
                className={'mb-mkr-hovered-state'}
              >
                <MapStateHover name={'New York'} />
              </Marker>
            )}

            {this.state.hoveredCD && this.state.hoveredCDMarker && (
              <Marker
                coordinates={this.state.hoveredCDMarker}
                anchor="bottom"
                className={'mb-mkr-hovered-state'}
              >
                {this.state.hoveredCD.isIncumbent || true ? (
                  <MapCDHoverCandidate
                    name={'NY-14'}
                    candidate_name={'Alexandria Ocasio-Cortez'}
                    image={
                      '/img/jd_site_alexandriaocasiocortez_550x600_061218.jpg'
                    }
                  />
                ) : (
                  <MapCDHover name={'NY-14'} />
                )}
              </Marker>
            )}
          </Map>
          <MapLegends
            splits={[
              { label: '40%', color: 'blue' },
              { label: '60%', color: 'yellow' },
              { label: '80%', color: 'brown' },
              { label: '100%', color: 'purple' },
            ]}
          />
        </section>
        <section className="activity-area">
          <div className="aa-search">
            <MapGeocoder onGeolocate={this.onGeolocate.bind(this)} />
          </div>
          {this.state.selectedCD && (
            <div>
              <h4>District Details</h4>
              <div className="aa-candidate-container">
                <MapPopupCandidate
                  name={'NY-14'}
                  candidate_name={'Alexandria Ocasio-Cortez'}
                  image={
                    '/img/jd_site_alexandriaocasiocortez_550x600_061218.jpg'
                  }
                  description={`New York’s 14th Congressional District urgently needs access to more reliable jobs, increased access to family support services like parental leave and free childcare. She will fight for universal access to quality education from pre-K until college regardless of income and enrollment status because your ZIP code should never determine your quality of life.`}
                  onClose={this.onPopupClose.bind(this)}
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
    )
  }
}
