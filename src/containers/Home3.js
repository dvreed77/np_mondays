import React, {Component} from "react";
import ReactMapboxGl, {Layer, GeoJSONLayer, Feature, Popup, ZoomControl} from "react-mapbox-gl";
// import styles from './london-cycle.style';
import {parseString} from "xml2js";
import {Map} from "immutable";
// import config from "./config.json";

const styles = {
  container: {
    height: "100vh",
    width: "100vw"
  },
  button: {
    cursor: "pointer"
  },
  stationDescription: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "16px 0px",
    textAlign: "center",
    backgroundColor: "white"
  },
  popup: {
    background: "#fff",
    padding: "5px",
    borderRadius: "2px"
  },
  btnWrapper: {
    position: 'absolute',
    textAlign: 'center',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%'
  },
  btnStationOpen: {
    marginBottom: 140
  },
  btn: {
    backgroundColor: 'rgb(71, 144, 229)',
    color: 'white',
    marginBottom: '20px',
    padding: '10px 20px',
    borderRadius: 4,
    border: '1px solid #5867BC',
    outline: 'none'
  }
}

// const { accessToken, style } = config;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


var eth = ['White', 'Black', 'Hispanic']


var gj_example = {
  "type": "FeatureCollection",
  "features": null
}

function getCycleStations() {

  var myHeaders = new Headers();

  myHeaders.append("Access-Control-Allow-Origin", "*");
  // return fetch("http://feeds.thehubway.com/stations/stations.xml", {mode: 'cors'})
  return fetch("data/posts2.json")
    .then(res => {
      return res.json()
    })
    .then(data => {
      // let re = new RegExp('POINT \(-?\d+.\d+ -?\d+.\d+\)');
      let re = /POINT \((-?\d+.\d+) (-?\d+.\d+)\)/
      var newData = data.map((d, i) => {
        let p = d.fields.location.match(re)
        d.lat = +p[2]
        d.lng = +p[1]
        d.eth = eth[getRandomInt(0, 2)]


        return {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [+p[1], +p[2]]
          },
          "properties": {
            "title": "Mapbox DC",
            "icon": "monument",
            eth: eth[getRandomInt(0, 2)]
          }
        }
      })

      // console.log(data)
      gj_example.features = newData
      return gj_example
      // console.log(data)
      // return new Promise((resolve, reject) => {
      //   parseString(data, (err, res) => {
      //     if (!err) {
      //       resolve(res.stations.station);
      //     } else {
      //       reject(err);
      //     }
      //   });
      // });
    })
}

const maxBounds = [
  [-0.481747846041145, 51.3233379650232], // South West
  [0.23441119994140536, 51.654967740310525], // North East
];

export default class LondonCycle extends Component {
  constructor(props) {
    super(props);


    this._onFitBoundsClick = this._onFitBoundsClick.bind(this);
    this._markerClick = this._markerClick.bind(this);
    this._onDrag = this._onDrag.bind(this);
    this._onControlClick = this._onControlClick.bind(this);
    this._popupChange = this._popupChange.bind(this);


    this.state = {
      center: [-71.0589, 42.3601],
      zoom: [11],
      skip: 0,
      stations: new Map(),
      popupShowLabel: true,
      toggle: true
    };
  }

  // state = {
  //   center: [-0.109970527, 51.52916347],
  //   zoom: [11],
  //   skip: 0,
  //   stations: new Map(),
  //   popupShowLabel: true
  // };

  componentWillMount() {
    getCycleStations().then(res => {
      console.log(res)
      this.setState(({stations}) => ({
        stations: res
        // stations.merge(res.reduce((acc, station) => {
        //     return acc.set(station.id[0], new Map({
        //       id: station.id[0],
        //       name: station.name[0],
        //       position: [ parseFloat(station.long[0]), parseFloat(station.lat[0]) ],
        //       bikes: parseInt(station.nbBikes[0], 10),
        //       slots: parseInt(station.nbEmptyDocks[0], 10)
        //     }))
        //   }, new Map()))
        // }
      }));
    });
  };

  _markerClick(station, {feature}) {
    this.setState({
      center: feature.geometry.coordinates,
      zoom: [14],
      station,
    });
  }

  _onDrag() {
    if (this.state.station) {
      this.setState({
        station: null,
      });
    }
  }

  _onToggleHover(cursor, {map}) {
    map.getCanvas().style.cursor = cursor;
  }

  _onControlClick(map, zoomDiff) {
    const zoom = map.getZoom() + zoomDiff;
    this.setState({zoom: [zoom]});
  };

  _popupChange(popupShowLabel) {
    this.setState({popupShowLabel});
  }

  _onFitBoundsClick() {
    if (this.state.toggle) {
      this.setState({
        fitBounds: [[-0.122555629777, 51.4734862092], [-0.114842, 51.50621]]
      });
    } else {
      this.setState({
        // this won't focus on the area as there is a maxBounds
        fitBounds: [[32.958984, -5.353521], [43.50585, 5.615985]]
      });
    }

    this.setState({toggle: !this.state.toggle})

  };

  render() {
    const {stations, station, popupShowLabel, fitBounds} = this.state;

    return (
      <div>
        <ReactMapboxGl
          style='mapbox://styles/dvreed77/cir1ar1fk000lbunsz4rsjc3f'
          accessToken='pk.eyJ1IjoiZHZyZWVkNzciLCJhIjoibVMzYlVGdyJ9.dYzBhVYkCw1GRZwDxlCsng'
          // style={style}
          fitBounds={fitBounds}
          center={this.state.center}
          zoom={this.state.zoom}
          // minZoom={8}
          // maxZoom={15}
          // maxBounds={maxBounds}
          // accessToken={accessToken}
          onDrag={this._onDrag}
          containerStyle={styles.container}>

          <ZoomControl
            zoomDiff={1}
            onControlClick={this._onControlClick}/>

          <GeoJSONLayer
            type="circle"
            data={stations}
            id="marker"
            onClick={d=>{console.log(d)}}
            circlePaint={{
              "circle-color": {
                property: 'eth',
                type: 'categorical',
                stops: [
                  ['White', '#fbb03b'],
                  ['Black', '#223b53'],
                  ['Hispanic', '#e55e5e'],
                  ['Asian', '#3bb2d0'],
                  ['Other', '#ccc']]
              },
            }}
            // layout={{ "icon-image": "marker-15" }}
          />

          {
            station && (
              <Popup
                key={station.get("id")}
                offset={[0, -50]}
                coordinates={station.get("position")}>
                <div>
                  <span style={{
                    ...styles.popup,
                    display: popupShowLabel ? "block" : "none"
                  }}>
                    {station.get("name")}
                  </span>
                  <div onClick={this._popupChange.bind(this, !popupShowLabel)}>
                    {
                      popupShowLabel ? "Hide" : "Show"
                    }
                  </div>
                </div>
              </Popup>
            )
          }
        </ReactMapboxGl>
        {
          station && (
            <div style={styles.stationDescription}>
              <p>{ station.get("name") }</p>
              <p>{ station.get("bikes") } bikes / { station.get("slots") } slots</p>
            </div>
          )
        }
        <div style={{
          ...styles.btnWrapper,
          ...(station && styles.btnStationOpen)
        }}>
          <button style={styles.btn} onClick={this._onFitBoundsClick}>Fit to bounds</button>
        </div>
      </div>
    )
  }
}