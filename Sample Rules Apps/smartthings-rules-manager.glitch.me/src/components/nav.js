import React from 'react';

export default class Nav extends React.Component {
  render() {
    return(
      <ul className="nav nav-tabs">
          <li className="active"><a data-toggle="tab" href="#list-rules">List Rules</a></li>
          <li><a data-toggle="tab" href="#rules-submit">Submit Rule</a></li>
          <li><a data-toggle="tab" href="#delete-rule">Delete Rule</a></li>
          <li><a data-toggle="tab" href="#get-devices">Get Devices</a></li>
          <li><a data-toggle="tab" href="#get-device-status">Get Device Status</a></li>
          <li><a href="#" id="auth-url">Sign Out</a></li>
        </ul>
    );
  }
}