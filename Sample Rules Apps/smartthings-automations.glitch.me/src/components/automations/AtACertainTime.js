import React from 'react';
import { populateDevices } from './populateDevices.js';


export default class AtACertainTime extends React.Component {
  componentDidMount() {
    populateDevices('switch', '#deviceOne', 'Select Device');
  }

  render() {
    return (
      <div>
        At 
        &nbsp; <select className="userSelection"><option value="Midnight">Midnight</option><option value="Noon">Noon</option><option value="Sunrise">Sunrise</option><option value="Sunset">Sunset</option></select> 
        &nbsp; <input placeholder="Offset (minute value)" type="number" className="userValue" /> 
        &nbsp; <select id="deviceOne" className="userSelection"><option value="">Select Device</option></select> will turn
        &nbsp; <select className="userSelection"><option value="on">On</option><option value="off">Off</option></select>
      </div>
    );
  }
}