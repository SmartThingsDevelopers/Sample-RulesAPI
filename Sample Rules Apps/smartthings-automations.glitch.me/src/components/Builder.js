import React from 'react';
import axios from "axios";
import Catalog from './Catalog';
import Inventory from './Inventory';
import TemperatureControl from './automations/TemperatureControl';
import AtACertainTime from './automations/AtACertainTime';
import PresenceControl from './automations/PresenceControl';
import ModeControl from './automations/ModeControl';
import PresenceTimeLock from './automations/PresenceTimeLock';
import TimeLock from './automations/TimeLock';

export default class Builder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      appName: null,
      baseJson: null,
      moddedJson: null,
      componentToShow: null,
		};
    this.componentDidMount = this.componentDidMount(this);
    this.ruleNameInterpreter = this.ruleNameInterpreter.bind(this);
    this.grabAndReplace = this.grabAndReplace.bind(this);
    this.theAutomation = this.theAutomation.bind(this);
    this.submitRule = this.submitRule.bind(this);
    this.submitTheRule = this.submitTheRule.bind(this);
	}
  
  componentDidMount() {
    // Add event listener to rules list items
    let theState = this;

    setTimeout(function() {
      var allRules = document.querySelectorAll('.rules-container li');
      for (let x = 0; x < allRules.length; x++) {
        allRules[x].addEventListener('click', function(e) {
          let theDevices = localStorage.getItem('devices');
          if (theDevices !== null) {
            // Show canvas items
            let allToShow = document.querySelectorAll('.initialHidden');
            for (let x = 0; x < allToShow.length; x++) {
              allToShow[x].style.display="block";
            }
            
            // Fetch name, component, JSON
            let thisRule = JSON.parse(e.target.getAttribute('data-value'));
            let thisComponent = e.target.getAttribute('data-name');
            theState.setState({
              baseJson: thisRule,
              moddedJson: thisRule,
              componentToShow: thisComponent,
            });

            // Update JSON textarea
            document.querySelector('.jsonEditor .theJson').value='';
            document.querySelector('.jsonEditor .theJson').value=JSON.stringify(theState.state.baseJson);
          } else {
            alert('Please select a location first.');
          }
        });
      }
    }, 3000);


    setTimeout(function() {
      var allRules = document.querySelectorAll('.rules-container li');
      for (let x = 0; x < allRules.length; x++) {
        allRules[x].addEventListener('click', function(e) {
          let allSelects = document.querySelectorAll('.builderCanvas select');
          for (let a = 0; a < allSelects.length; a++) {
            allSelects[a].addEventListener('change', theState.grabAndReplace);
          }

          let allInputs = document.querySelectorAll('.builderCanvas input');
          for (let b = 0; b < allInputs.length; b++) {
            allInputs[b].addEventListener('keyup', theState.grabAndReplace);
          }
        });
      }

    }, 3000);
  }

  theAutomation() {
    let theComponent = this.state.componentToShow;
    let thisComponent = '';
    switch(theComponent) {
      case 'AT_CERTAIN_TIME':
        thisComponent = <AtACertainTime />;
        break;
      case 'TEMPERATURE_CONTROL':
        thisComponent = <TemperatureControl />;
        break;
      case 'PRESENCE_CONTROL':
        thisComponent = <PresenceControl />;
        break;
      case 'MODE_CONTROL':
        thisComponent = <ModeControl />;
        break;
      case 'PRESENCE_TIME_LOCK':
        thisComponent = <PresenceTimeLock />;
        break;
      case 'TIME_LOCK':
        thisComponent = <TimeLock />;
        break;
      default:
        thisComponent = null;
        break;
    }
    if (theComponent !== null) {
      return thisComponent;
    } else {
      return (
        <div>
          <p>
            <ol>
              <li>Start by selecting a location from the dropdown menu on the top right</li>
              <li>Select an automation template from the left sidebar menu</li>
              <li>Select the associated Devices and Capabilities for the Automation</li>
            </ol>
            When a selection is made, the JSON Rule file will update and replace the placeholder attributes with your selections from the GUI Builder. You can then use the Rules API to install the Automation to the Location.
          </p>
        </div>
      );
    }
  }
  
  ruleNameInterpreter() {
    try {
      var theRuleName = document.querySelector('.builderCanvas input').value;
      this.setState({
        appName: theRuleName,
      });

      if (document.querySelector('.jsonEditor .theJson').value !== ''){
        var theJson = this.state.baseJson;
        if (theJson !== null || theJson !== '') {
          theJson['name'] = theRuleName;
          this.setState({
            baseJson: theJson
          });
        }
      }
      this.grabAndReplace();
    } catch (e) {
      console.log(e);
    }
	}
  
  grabAndReplace() {
    // Set all placeholders
    let allPlaceholders = [
      '{{placeholder}}',
      '"{{valuePlaceholder}}"'
    ];

    // Grab devices, capabilities and command values
    let allSelectors = document.querySelectorAll('.builderCanvas .userSelection');
    let allValues = document.querySelectorAll('.builderCanvas .userValue')

    // Grab JSON
    let theJson = '';
    if (
      this.state.baseJson !== '' || 
      this.state.baseJson !== null || 
      this.state.baseJson !== undefined || 
      this.state.baseJson !== {}
      ) {
        theJson = JSON.stringify(this.state.baseJson);
      }

    // Iterate through all placeholders and devices
    for (let x = 0; x < allPlaceholders.length; x++) {
      let placeholderText = allPlaceholders[x];
      let valueArray = '';
      switch (placeholderText) {
        case '{{placeholder}}':
          valueArray = allSelectors;
          break;
        case '"{{valuePlaceholder}}"':
          valueArray = allValues;
          break;
        default:
          break;
      }
      var arr = theJson.split(placeholderText);
      arr = arr.length;
      

      // Replaces values with data from user
      for (let a = 1; a < arr; a++) {
        try {
          let myValue = valueArray[a-1].value;
          theJson = theJson.replace(placeholderText, myValue);
        } catch(e) {
          console.log(e);
        }
      }
    }

    // Sets new state and updates textarea
    this.setState({
      moddedJson: theJson
    });
    // console.log(this.state.moddedJson);
    document.querySelector('.jsonEditor .theJson').value='';
    document.querySelector('.jsonEditor .theJson').value=this.state.moddedJson;
  }
  
  async submitRule() {
    let bearerToken = "Bearer "+localStorage.getItem('authToken');
    var locationId = localStorage.getItem('locationId');
    var jsonBody = this.state.moddedJson;
    if (
      bearerToken === null ||
      bearerToken === "" ||
      locationId === "" ||
      locationId === null ||
      jsonBody === "" ||
      jsonBody === null
    ) {
      return false;
    }

    // Check API
    var apiEndpoint = `${process.env.REACT_APP_ST_API_URL}/rules?locationId=${locationId}`;
    var submitRules = await axios.post(apiEndpoint, jsonBody, {
      headers: {
        Authorization: bearerToken,
        "Content-Type": "application/json",
        Accept: "application/vnd.smartthings+json;v=1"
      }
    });
    if (submitRules.data) {
      console.log(submitRules.data);
      var loadAnimation = "<img src='https://cdn.glitch.com/bf30ed1e-b7e0-4de4-96b9-e0f42640f6a3%2Fload.gif?v=1575593902414' />";
      document.querySelector('.responsePrompt').style.display="block";
      document.querySelector('.responsePrompt .load').style.display="block";
      document.querySelector('.responsePrompt .load').insertAdjacentHTML('afterbegin', loadAnimation);
      let data = JSON.parse(submitRules.data);
      document.querySelector('.responsePrompt .load').style.display="none";
      document.querySelector('.responsePrompt textarea').innerText=JSON.stringify(data);
    } else {
      console.log('Error');
    }
  }
  
  
  submitTheRule() {
    let theRule = this.state.moddedJson;
    console.log(theRule);
    // Fetch location modes
    var authToken = "Bearer "+localStorage.getItem('authToken');
    var thisLocation = localStorage.getItem('location');
    var apiEndpoint = "https://api.smartthings.com/rules?locationId="+thisLocation;
    console.log(apiEndpoint);
    var submitRule = new XMLHttpRequest();
    submitRule.open('POST', apiEndpoint);
    submitRule.setRequestHeader("Authorization", authToken);
    submitRule.setRequestHeader("Content-type", "application/json");
    submitRule.setRequestHeader("Accept", "application/vnd.smartthings+json;v=1");
    submitRule.onload = function() {
      var loadAnimation = "<img src='https://cdn.glitch.com/bf30ed1e-b7e0-4de4-96b9-e0f42640f6a3%2Fload.gif?v=1575593902414' />";
      document.querySelector('.responsePrompt').style.display="block";
      document.querySelector('.responsePrompt .load').style.display="block";
      document.querySelector('.responsePrompt .load').insertAdjacentHTML('afterbegin', loadAnimation);
      let data = JSON.parse(submitRule.responseText);
      console.log(data);
      document.querySelector('.responsePrompt .load').style.display="none";
      document.querySelector('.responsePrompt textarea').innerText=JSON.stringify(data);
    }
    submitRule.send(theRule);
  }
	
	render() {
	    return (
        <div>
          <Catalog />
          <div className="builder">
            <div className="builderCanvas">
              <div className="initialHidden">
                <h2>Automation Name</h2>
                <input placeholder="Automation Name" onChange={this.ruleNameInterpreter} className="automationName" />
              </div>
              <h2>SmartThings Rule Builder Demo App</h2>
              <div className="">
                {this.theAutomation()}
              </div>
              <div className="initialHidden">
                <div className="jsonEditor">
                  <h2>Raw JSON</h2>
                  <textarea className="theJson" disabled>{JSON.stringify(this.state.moddedJson) ? this.state.moddedJson : "JSON will display here"}</textarea>
                </div>
                <div className="bottomButtons">
                  <ul>
                    <li value="submit" key="submit" onClick={this.submitTheRule}>Submit Automation</li>
                  </ul>
                  <div className="responsePrompt">
                    <h4>If you see the Rule JSON below, your rule was successfully submitted.</h4>
                    <div className="load"></div>
                    <textarea disabled></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Inventory {...this.props} />
        </div>
	    );
	}
}