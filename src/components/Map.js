import React, {Component} from "react";
import Fireapp from '../config/firebaseConfig';

const storage = Fireapp.storage();

class Map extends Component {

getMarker = () =>{


}

render() {
  let citiesRef = Fireapp.firestore().collection('test_collection');
  var locs = [];
  let query = citiesRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      locs.push("<div>"+doc.data().latitude+"</div>");
      console.log(doc.id, '=>', doc.data());
      console.log(locs);
    });
  });
  return (
    <div>
    {locs}
    SUDSD
    {locs}
    </div>
  )
}
}

export default Map
