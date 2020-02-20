import React from 'react';

export default class Catalog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: false
		};
		this.changeStateView = this.changeStateView.bind(this);
	}
	
	changeStateView(menu) {
		var currentState = this.state.isVisible;
		if (currentState === true){
			this.setState(
				{
					isVisible: false
				}
			);
			document.querySelector('.rules-catalog').style.width="60px";
			document.querySelector('.rules-container').style.display="none";
			document.querySelector('.hamburger').classList.toggle('is-active');	
			document.querySelector('.builder').style.marginLeft="80px";
			document.querySelector('.builder').style.width="70%";
		} else {
			this.setState(
				{
					isVisible: true
				}
			);
			document.querySelector('.rules-container').style.display="block";
			document.querySelector('.rules-catalog').style.width="250px";
			document.querySelector('.hamburger').classList.toggle('is-active');
			document.querySelector('.builder').style.marginLeft="280px";
			document.querySelector('.builder').style.width="55%";
		}
		return true;
	}
	
	render() {
	    return (
	      <div className="rules-catalog">
          <button className="hamburger catalog-state hamburger--spin-r" onClick={() => this.changeStateView('catalog')}>
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <ul className="rules-container">
            <h2>Rule Catalog</h2>
            <li data-name='AT_CERTAIN_TIME' data-value='{"name":"Turn on a light at 9:00 am","actions":[{"every":{"specific":{"reference":"{{placeholder}}","offset":{"value":{"integer":"{{valuePlaceholder}}"},"unit":"Minute"}},"actions":[{"command":{"devices":["{{placeholder}}"],"commands":[{"component":"main","capability":"switch","command":"{{placeholder}}"}]}}]}}]}'>At a certain time</li>
            <li data-name='TEMPERATURE_CONTROL' data-value='{"name":"If temperature is above/below, execute device command","actions":[{"if":{"{{placeholder}}":{"right":{"device":{"devices":["{{placeholder}}"],"component":"main","capability":"temperatureMeasurement","attribute":"temperature"}},"left":{"integer":"{{valuePlaceholder}}"}},"then":[{"command":{"devices":["{{placeholder}}"],"commands":[{"component":"main","capability":"switch","command":"{{placeholder}}"}]}}]}}]}'>Temperature control</li>
						<li data-name='PRESENCE_CONTROL' data-value='{"name":"If presence is detected, turn on/off switch","actions":[{"if":{"equals":{"right":{"device":{"devices":["{{placeholder}}"],"component":"main","capability":"presenceSensor","attribute":"presence"}},"left":{"string":"{{placeholder}}"}},"then":[{"command":{"devices":["{{placeholder}}"],"commands":[{"component":"main","capability":"switch","command":"{{placeholder}}"}]}}]}}]}'>Presence control</li>
						<li data-name='MODE_CONTROL' data-value='{"name":"Turn device on/off when location mode changes","actions":[{"if":{"equals":{"left":{"location":{"attribute":"Mode"}},"right":{"string":"{{placeholder}}"}},"then":[{"command":{"devices":["{{placeholder}}"],"commands":[{"component":"main","capability":"switch","command":"{{placeholder}}"}]}}]}}]}'>Mode control</li>
						<li data-name='PRESENCE_TIME_LOCK' data-value='{"name":"When presence is not detected, lock doors after N minutes","actions":[{"if":{"equals":{"right":{"device":{"devices":["{{placeholder}}"],"component":"main","capability":"presenceSensor","attribute":"presence"}},"left":{"string":"{{placeholder}}"}},"then":[{"sleep":{"duration":{"value":{"integer":"{{valuePlaceholder}}"},"unit":"minute"}}},{"command":{"devices":["{{placeholder}}"],"commands":[{"component":"main","capability":"lock","command":"{{placeholder}}"}]}}]}}]}'>Presence time lock</li>
						<li data-name='TIME_LOCK' data-value='{"name":"If door is closed for N seconds, lock it","actions":[{"if":{"equals":{"right":{"device":{"devices":["{{placeholder}}"],"component":"main","capability":"contactSensor","attribute":"contact"}},"left":{"string":"closed"}},"then":[{"sleep":{"duration":{"value":{"integer":"{{valuePlaceholder}}"},"unit":"second"}}},{"command":{"devices":["{{placeholder}}"],"commands":[{"component":"main","capability":"lock","command":"lock"}]}}]}}]}'>Time lock</li>
            <h3 id="auth-url">Log Out</h3>
          </ul>
	      </div>
	    );
	}
}