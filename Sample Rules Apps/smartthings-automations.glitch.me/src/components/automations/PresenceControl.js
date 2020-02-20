import React from 'react';
import { populateDevices } from './populateDevices.js';

export default class TemperatureControl extends React.Component {
  componentDidMount() {
    populateDevices('presenceSensor', '#sensorOne', 'Select Device');
    populateDevices('switch', '#deviceOne', 'Select Device');
  }

  render() {
    return (
      <div>
        When 
        &nbsp; <select className="userSelection" id="sensorOne"><option>Select sensor</option></select> 
        &nbsp; detects
        &nbsp; <select className="userSelection"><option value="present">Present</option><option value="not present">Not present</option></select> 
        &nbsp; <select className="userSelection" id="deviceOne"><option>Select device</option></select> 
        &nbsp; will turn 
        &nbsp; <select className="userSelection"><option value="on">On</option><option value="off">Off</option></select>
      </div>
    );
  }
}