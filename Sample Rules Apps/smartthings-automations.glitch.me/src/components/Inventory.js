import React from 'react';

export default class Inventory extends React.Component {
	constructor(props) {
		super(props);
		this.getLocations = this.getLocations.bind(this);
		this.getDevices = this.getDevices.bind(this);
	}
	
	// Pull locations after DOM loads
	componentDidMount() {
		this.getLocations();
	}
	
	// Grab all location
	getLocations() {
		let locations = [];
		var authToken = "Bearer "+localStorage.getItem('authToken');
		// Check API
    var apiEndpoint = "https://api.smartthings.com/locations";
    var getLocations = new XMLHttpRequest();
    getLocations.open('GET', apiEndpoint);
    getLocations.setRequestHeader("Authorization", authToken);
    getLocations.setRequestHeader("Content-type", "application/json");
    getLocations.onload = function() {
      var data = JSON.parse(getLocations.responseText);
      for (let i = 0; i < data['items'].length; i++) {
        locations.push(data['items'][i]);
      }
      var newLocation = "";
      for (let i = 0; i < locations.length; i++) {
        console.log(locations.length);
        newLocation += "<option value='"+locations[i]['locationId']+"' key='"+locations[i]['name']+"'>"+locations[i]['name']+"</option>";
      }
      document.querySelector('.locationList').insertAdjacentHTML('beforeend', newLocation);
    }
		getLocations.send();
	}
	
	// Grab devices when location selector changes
	getDevices() {
		var loadAnimation = "<img src='https://cdn.glitch.com/bf30ed1e-b7e0-4de4-96b9-e0f42640f6a3%2Fload.gif?v=1575593902414' />";
		document.querySelector('.deviceList').innerHTML=loadAnimation;
		
		let devices = [];
		var locationId = document.querySelector('select.locationList').value;
    localStorage.setItem('location', locationId);
		if (locationId === "null") {
			document.querySelector('.deviceList').innerHTML='';
			return false;
		}
		var authToken = "Bearer "+localStorage.getItem('authToken');
		// Check API
    var apiEndpoint = "https://api.smartthings.com/devices?locationId="+locationId;
    var getDevices = new XMLHttpRequest();
    getDevices.open('GET', apiEndpoint);
    getDevices.setRequestHeader("Authorization", authToken);
    getDevices.setRequestHeader("Content-type", "application/json");
    getDevices.onload = function() {
      var data = JSON.parse(getDevices.responseText);
      for (let i = 0; i < data['items'].length; i++) {
        devices.push(data['items'][i]);
      }
      var newDevices = "";
      for (let i = 0; i < devices.length; i++) {
        newDevices += "<li value='"+devices[i]['deviceId']+"'>";
        newDevices += devices[i]['name'];
        newDevices += "<ul>";
        newDevices += "<li style='list-style-type:none;margin:5px 0;font-size:15px;font-weight:600;'>Capabilities</li>";
        for (let x = 0; x < devices[i]['components'][0]['capabilities'].length; x++){
          newDevices += "<li>";
          newDevices += devices[i]['components'][0]['capabilities'][x]['id'];
          newDevices += "</li>";
        }
        newDevices += "</ul>";
        newDevices += "</li>";
      }
      setTimeout(function() {
        localStorage.setItem('devices', JSON.stringify(devices));
        document.querySelector('.deviceList').innerHTML='';
        document.querySelector('.deviceList').insertAdjacentHTML('beforeend', newDevices);
      }, 1000);
    }
    getDevices.send();
	}
	
	render() {
	    return (
		  <div className="inventory">
		    <select className="locationList" onChange={this.getDevices}>
				  <option value="null">Select a Location</option>
			  </select>
			  <ul className="deviceList">
			  </ul>
		  </div>
	    );
	}
}