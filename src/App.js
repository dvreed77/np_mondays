import React, {Component} from 'react';
import './App.css';

// import MapGL from 'react-map-gl';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import NPPin from './np-pin';

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


    // updatePercentiles(data, f => f.properties.income[this.state.year]);

    // const mapStyle = defaultMapStyle
    //     .setIn(['sources', 'incomeByState'], {type: 'geojson', data});
    // Add point layer to map
    // .set('layers', defaultMapStyle.get('layers').push(dataLayer));

    // this.setState({data});
    // };

    // _renderPopup() {
    //     const {popupInfo} = this.state;
    //
    //     return popupInfo && (
    //         <Popup tipSize={5}
    //                anchor="top"
    //                longitude={popupInfo.longitude}
    //                latitude={popupInfo.latitude}
    //                onClose={() => this.setState({popupInfo: null})} >
    //             <div>
    //                 Dave
    //             </div>
    //         </Popup>
    //     );
    // }

    _renderCityMarker = (city, index) => {
        return (
            <Marker key={`marker-${index}`}
                    longitude={city.lng}
                    latitude={city.lat}>
                <NPPin size={20} onClick={() => this.setState({popupInfo: city})}/>
            </Marker>
        );
    }

    render() {

        const {viewport, npLocs} = this.state;

        const CITIES = npLocs

        console.log('LOCS', npLocs)

        return (
            <MapGL
                {...viewport}
                mapStyle="mapbox://styles/dvreed77/cir1ar1fk000lbunsz4rsjc3f"
                onViewportChange={v => this.setState({viewport: v})}
                preventStyleDiffing={false}
                mapboxApiAccessToken={token}>

                {CITIES.map(this._renderCityMarker)}

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
