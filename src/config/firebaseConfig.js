import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBCZAcOpVNK0CRMZRFt1VE-f1GfdKVbmII",
  authDomain: "dexterity-network.firebaseapp.com",
  databaseURL: "https://dexterity-network.firebaseio.com",
  projectId: "dexterity-network",
  storageBucket: "dexterity-network.appspot.com",
  messagingSenderId: "658191816508",
  appId: "1:658191816508:web:e05d859d805cab1f2bf039",
  measurementId: "G-063STZKS8C"
};

const Fireapp = firebase.initializeApp(firebaseConfig);

export default Fireapp;
