import React from 'react';
import PropTypes from 'prop-types';
import Geocode from 'react-geocode';
import '../style/map-geocoder.scss';

class MapGeocoder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestion: '',
            searchText: '',
            takeSuggestion: false,
            result: null
        };

        Geocode.setApiKey("AIzaSyCW2bP6hUaZLATaAX-7Nfj5r4ISVsj99j8");
        Geocode.enableDebug();
    } 

    componentDidMount() {
        this.timeout = null;
    }
    componentWillUnmount() {
        this.timeout !== null && clearTimeout(this.timeout);
    }
    onKeyPress(e) {
        if (e.key == "ArrowRight" || e.key == "ArrowDown") {
            this.setState({takeSuggestion: true});
        } else if(e.key=="ArrowUp" || e.key == "ArrowLeft") {
            this.setState({takeSuggestion: false});
        } else if (e.key == "Enter") {
            if (this.state.takeSuggestion) {
                this.setState({ searchText: this.state.suggestion, suggestion: '' })
                this.submit();
            }
        } else {
            this.setState({ suggestion: '', takeSuggestion: false});
        }
    }

    // Listen to right button or enter
    onMapGeocoderChange(e) {
        this.setState({searchText: e.target.value});
    }

    onSuggestionClick(e) {
        this.setState({searchText: this.state.suggestion, takeSuggestion: false, suggestion: '' });
        this.submit();
    }

    
    geolocate() {
        this.timeout !== null && clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            Geocode.fromAddress(this.state.searchText).then(
                response => {
                  const { lat, lng } = response.results[0].geometry.location;
                  console.log(lat, lng, response);

                  this.setState({ result: response.results[0], suggestion: response.results[0].formatted_address })
                },
                error => {
                  console.error(error);
                }
            );
        }, 500);
    }

    submit() {
        this.props.onGeolocate(this.state.result);
    } 
    
    componentDidUpdate(prevProps, prevState) {

        //TODO Ben is this generally a good idea?
        prevState.searchText.trim() !== this.state.searchText.trim() &&
        this.state.searchText.length > 3 &&
        this.geolocate();

    }

    render = () => (
        <div  className='map-geocoder' style={this.props.style}>
            <input type='text' 
                onChange={this.onMapGeocoderChange.bind(this)} 
                placeholder='Enter Location'
                className='map-search'
                value={this.state.searchText}
                onKeyDown={this.onKeyPress.bind(this)}
            />
            {this.state.suggestion !== '' && 
                (<div 
                    className={`map-suggest ${this.state.takeSuggestion && 'map-take-suggestion' || ''}`}
                    onClick={this.onSuggestionClick.bind(this)}
                >
                <span>{this.state.suggestion}</span>
                </div>)
            }
        </div>
    )
}

MapGeocoder.propTypes = {
    onGeolocate: PropTypes.func.isRequired
};

export default MapGeocoder;