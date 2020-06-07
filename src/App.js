import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path='/' component = {Homepage}/>

      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
