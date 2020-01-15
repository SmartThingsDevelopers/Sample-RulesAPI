import React, { Component } from 'react';
import './App.css';
import './fonts.scss';
import { isLoggedIn, callBack } from './utils.js';
import Nav from './components/nav.js';
import Warning from './components/warning.js';
import ListRules from './components/listRules.js';
import SubmitRules from './components/submitRules.js';
import DeleteRules from './components/deleteRules.js';
import GetDevices from './components/getDevices.js';
import GetDeviceStatus from './components/getDeviceStatus';


class App extends Component {
  componentDidMount() {   
    isLoggedIn();
    callBack();
  }
  
  render() {
    return (
      <div>
        <h1>
          {process.env.REACT_APP_NAME}
        </h1>
        
        <Warning />
        
        <Nav />

        <div className="tab-content">
          <ListRules />
          <SubmitRules />
          <DeleteRules />
          <GetDevices />
          <GetDeviceStatus />
        </div>
      </div>
    );
  }
}

export default App;