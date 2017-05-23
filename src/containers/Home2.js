import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory, Link} from 'react-router'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

// import mapboxgl from 'mapbox-gl'

// import L from 'mapbox.js'


// import MapGL from 'react-map-gl';

import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

// import L from 'leaflet';
//
// L.Icon.Default.imagePath = '.';
// // OR
// delete L.Icon.Default.prototype._getIconUrl;
//
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });


// mapboxgl.accessToken = 'pk.eyJ1IjoiZHZyZWVkNzciLCJhIjoibVMzYlVGdyJ9.dYzBhVYkCw1GRZwDxlCsng';


const position = [51.0, -0.09]

class Home extends Component {
  // componentDidMount() {
  //
  //   L.mapbox.accessToken = 'pk.eyJ1IjoiZHZyZWVkNzciLCJhIjoibVMzYlVGdyJ9.dYzBhVYkCw1GRZwDxlCsng';
  //
  //
  //   L.mapbox.map(this.refs.map, 'mapbox.streets');
  //
  //   // var map = new mapboxgl.Map({
  //   //   container: this.refs.map,
  //   //   style: 'mapbox://styles/dvreed77/cir1ar1fk000lbunsz4rsjc3f',
  //   //   center: {lng: -71.12292253946296, lat: 42.31995258431931},
  //   //   zoom: 12.3,
  //   //   scrollZoom: false
  //   // });
  //
  //   // map.fitBounds(bounds, {padding: 10});
  // }
  render() {

    var divStyle = {
      width: '1000px',
      height: '1000px',
      float: 'left'
    };


    return (
      <div>
        <ReactMapboxGl
          style='mapbox://styles/dvreed77/cir1ar1fk000lbunsz4rsjc3f'
          accessToken='pk.eyJ1IjoiZHZyZWVkNzciLCJhIjoibVMzYlVGdyJ9.dYzBhVYkCw1GRZwDxlCsng'
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
          </Layer>
        </ReactMapboxGl>
      </div>

    )
  }
}

function mapStateToProps(state, ownProps) {
  return {  }
}

export default connect(mapStateToProps, {

})(Home)