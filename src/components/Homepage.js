import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Map from './Map'
import Fireapp from '../config/firebaseConfig'
import {NavLink} from 'react-router-dom'

const storage = Fireapp.storage();

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `1000px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />
    <Marker position={{ lat: -34.397, lng: 150.54 }} onClick={props.onMarkerClick} />
  </GoogleMap>
);

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
    locs:[]
  }

  componentDidMount() {
    this.delayedShowMarker()

  }

  getMarker = () =>{
  let citiesRef = Fireapp.firestore().collection('test_collection');
let query = citiesRef.get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    let citiesRef = Fireapp.firestore().collection('test_collection');
    let query = citiesRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.state.locs.push(<div>doc.data().latitude</div>);
      });
    });
    {this.getMarker()}
    return (
      <div>
      <NavLink to='/profile'>Create Profile</NavLink>
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
      {this.state.locs}
      {console.log(this.state.locs, "sd")}
      </div>
    )
  }
}

export default MyFancyComponent
