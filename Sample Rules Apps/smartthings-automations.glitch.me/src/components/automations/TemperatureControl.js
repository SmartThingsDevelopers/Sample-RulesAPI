import React from 'react';
import { populateDevices } from './populateDevices.js';

export default class TemperatureControl extends React.Component {
  componentDidMount() {
    populateDevices('temperatureMeasurement', '#sensorOne', 'Select Device');
    populateDevices('switch', '#deviceOne', 'Select Device');
  }

  render() {
    return (
      <div>
        When
        &nbsp; <select className="userSelection"><option value="less_than">Below</option><option value="greater_than">Above</option></select> 
        &nbsp; <select className="userSelection" id="sensorOne"><option>Select sensor</option></select> 
        &nbsp; <input type="number" placeholder="72" className="userValue" />
        &nbsp; degrees
        &nbsp; <select className="userSelection" id="deviceOne"><option>Select device</option></select> 
        &nbsp; will turn 
        &nbsp; <select className="userSelection"><option value="on">On</option><option value="off">Off</option></select>
      </div>
    );
  }
}