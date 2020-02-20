// Initialize
import React from 'react';
import './App.css';
import './hamburgers.css';
import { isLoggedIn, callBack } from './utils.js';

// Import components
import Builder from './components/Builder';

// Sets initial state
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			authToken: null
		};
	}

	componentDidMount() {
    isLoggedIn();
    callBack();
	}
	
	render() {
    return (
      <div className="App">
        <Builder {...this.state} />
      </div>
    );
	}
}

export default App;
