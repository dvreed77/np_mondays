import React, {Component} from 'react';
import './App.css';

// import MapGL from 'react-map-gl';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import NPPin from './np-pin';
import NPInfo from './np-info';

const token = process.env.REACT_APP_MapboxAccessToken;

console.log(process.env);


const d = {
    "source": {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-71.038887, 42.364506]
                },
                "properties": {
                    "title": "Mapbox DC",
                    "icon": "monument"
                }
            }]
        }
    }
}


class Dave extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: 2015,
            popupInfo: null,
            npLocs: [],
            viewport: {
                latitude: 42.3601,
                longitude: -71.0589,
                zoom: 14,
                bearing: 0,
                pitch: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }

    componentDidMount() {
        this._loadData();
    }

    _loadData = () => {
        fetch('/locations.json')
            .then(d => {
                return d.json();
            })
            .then(d=>{
                console.log(d)
                this.setState({
                    npLocs: d
                })
            })
    };


    _renderPopup() {
        const {popupInfo} = this.state;

        return popupInfo && (
            <Popup tipSize={5}
                   anchor="top"
                   longitude={popupInfo.lng}
                   latitude={popupInfo.lat}
                   onClose={() => this.setState({popupInfo: null})} >
                <div>
                    <NPInfo info={popupInfo} />
                </div>
            </Popup>
        );
    }

    _renderCityMarker = (loc, index) => {
        return (
            <Marker key={`marker-${index}`}
                    longitude={loc.lng}
                    latitude={loc.lat}>
                <NPPin size={20} onClick={() => this.setState({popupInfo: loc})}/>
            </Marker>
        );
    }

    render() {

        const {viewport, npLocs} = this.state;

        const CITIES = npLocs

        return (
            <MapGL
                {...viewport}
                mapStyle="mapbox://styles/dvreed77/cir1ar1fk000lbunsz4rsjc3f"
                onViewportChange={v => this.setState({viewport: v})}
                preventStyleDiffing={false}
                mapboxApiAccessToken={token}>

                {CITIES.map(this._renderCityMarker)}

                {this._renderPopup()}

            </MapGL>
        );
    }

}


class App extends Component {
    render() {
        return (
            <div className="App2">
                <Dave/>

            </div>
        );
    }
}

export default App;
