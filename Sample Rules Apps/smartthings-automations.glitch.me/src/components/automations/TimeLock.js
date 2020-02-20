import React from 'react';
import { populateDevices } from './populateDevices.js';

export default class TimeLock extends React.Component {
  componentDidMount() {
    populateDevices('contactSensor', '#sensorOne', 'Select Device');
    populateDevices('lock', '#deviceOne', 'Select Device');
  }

  render() {
    return (
      <div>
        When
        &nbsp; <select className="userSelection" id="sensorOne"><option>Select sensor</option></select>
        &nbsp; is closed for 
        &nbsp; <input type="number" className="userValue" placeholder="10" /> minutes
        &nbsp; <select className="userSelection" id="deviceOne"><option>Select device</option></select> 
        &nbsp; will lock
      </div>
    );
  }
}