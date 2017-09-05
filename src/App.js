import React, { Component } from 'react';
import './App.css';

import MapGL from 'react-map-gl';

const token = process.env.REACT_APP_MapboxAccessToken;

console.log(process.env)

// [-71.0589, 42.3601]
class Dave extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    render() {

        const {viewport} = this.state;

        return (
            <MapGL
                {...viewport}
                // mapStyle="mapbox://styles/mapbox/dark-v9"
                mapStyle="mapbox://styles/dvreed77/cir1ar1fk000lbunsz4rsjc3f"
                onViewportChange={v => this.setState({viewport: v})}
                preventStyleDiffing={false}
                mapboxApiAccessToken={token} >
            </MapGL>
        );
    }

}


class App extends Component {
  render() {
    return (
      <div className="App2">
          <Dave />

      </div>
    );
  }
}

export default App;
