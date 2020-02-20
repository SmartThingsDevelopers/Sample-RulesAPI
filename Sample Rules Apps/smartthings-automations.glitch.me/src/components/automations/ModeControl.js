import React from 'react';
import { populateDevices } from './populateDevices.js';

export default class TemperatureControl extends React.Component {
  componentDidMount() {
    populateDevices('switch', '#deviceOne', 'Select Device');
    this.populateLocationModes();
  }

  populateLocationModes() {
    let theModesString = '<option value="">Mode</option>';
    
    // Fetch location modes
    var authToken = "Bearer "+localStorage.getItem('authToken');
    var thisLocation = localStorage.getItem('location');
    var apiEndpoint = "https://api.smartthings.com/locations/"+thisLocation+"/modes";
    var getLocations = new XMLHttpRequest();
    getLocations.open('GET', apiEndpoint);
    getLocations.setRequestHeader("Authorization", authToken);
    getLocations.setRequestHeader("Content-type", "application/json");
    getLocations.onload = function() {
      let data = JSON.parse(getLocations.responseText);
      console.log(data);
      console.log(data['items'].length);
      for (let i = 0; i < data['items'].length; i++) {
        theModesString += "<option value="+data['items'][i]['id']+">"+data['items'][i]['label']+"</option>";
      }
      document.querySelector('#locationModes').innerHTML='';
      document.querySelector('#locationModes').insertAdjacentHTML('beforeend', theModesString);
    }
    getLocations.send();
  }

  render() {
    return (
      <div>
        When location mode is set to 
        &nbsp; <select className="userSelection" id="locationModes"><option>Mode</option></select>
        &nbsp; <select className="userSelection" id="deviceOne"><option>Select device</option></select> 
        &nbsp; will turn 
        &nbsp; <select className="userSelection"><option value="on">On</option><option value="off">Off</option></select>
      </div>
    );
  }
}