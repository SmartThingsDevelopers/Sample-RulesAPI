import React from 'react';
import { populateDevices } from './populateDevices.js';

export default class PresenceTimeLock extends React.Component {
  componentDidMount() {
    populateDevices('presenceSensor', '#sensorOne', 'Select Device');
    populateDevices('lock', '#deviceOne', 'Select Device');
  }

  render() {
    return (
      <div>
        When 
        &nbsp; <select className="userSelection" id="sensorOne"><option>Select sensor</option></select> 
        &nbsp; is
        &nbsp; <select className="userSelection"><option value="present">Present</option><option value="not present">Not present</option></select> 
        &nbsp; for <input type="number" className="userValue" placeholder="10" /> minutes
        &nbsp; <select className="userSelection" id="deviceOne"><option>Select device</option></select> 
        &nbsp; will 
        &nbsp; <select className="userSelection"><option value="lock">Lock</option><option value="unlock">Unlock</option></select>
      </div>
    );
  }
}