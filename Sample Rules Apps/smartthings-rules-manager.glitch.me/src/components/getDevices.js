import React from "react";
import axios from "axios";
import { renderData } from "../utils.js";

export default class GetDevices extends React.Component {
  componentDidMount() {
    var resetButton = document.querySelector("#get-devices .clear");
    resetButton.addEventListener("click", function() {
      document.querySelector("#get-devices #response").style.display = "none";
      document.querySelector("#get-devices #loading").style.display = "none";
      document.querySelector("#get-devices #responseH").style.display = "none";
    });
  }

  returnFalse(e) {
    e.preventDefault();
  }

  async getDevices() {
    document.querySelector("#get-devices #response").style.display = "none";
    document.querySelector("#get-devices #responseH").style.display = "none";
    var bearerToken = `Bearer ${
      document.querySelector("#get-devices #bearerToken").value
    }`;
    var locationId = document.querySelector("#get-devices #locationId").value;
    if (
      bearerToken === null ||
      bearerToken === "" ||
      locationId === null ||
      locationId === ""
    ) {
      return false;
    }

    // Check API
    var apiEndpoint = `${process.env.REACT_APP_ST_API_URL}/devices?${locationId}`;
    var getDevices = await axios.get(apiEndpoint, {
      headers: {
        Authorization: bearerToken,
        "Content-Type": "application/json",
        Accept: "application/vnd.smartthings+json;v=1"
      }
    });
    if (getDevices.data) {
      renderData("get-devices", getDevices.data);
    }
  }

  render() {
    return (
      <div id="get-devices" className="tab-pane fade in">
        <p>Get a list of all devices at a location.</p>
        <form className="form-group" onSubmit={this.returnFalse}>
          <label>Bearer Token</label>
          <input
            placeholder="Bearer token"
            id="bearerToken"
            className="form-control"
            required=""
          />
          <label>Location</label>
          <select id="locationId" className="form-control">
            <option value="">Select a location</option>
          </select>
          <button
            id="getDevices"
            className="btn btn-primary"
            onClick={this.getDevices}
          >
            Get Devices
          </button>{" "}
          &nbsp;
          <button type="reset" className="btn btn-danger clear">
            Clear
          </button>
        </form>

        <div id="loading">
          <img
            alt="loading"
            src="https://cdn.glitch.com/d6f457f7-8290-4eea-a7da-88a19a116c37%2Floading.gif?v=1573415794331"
          />
        </div>
        <h3 id="responseH">JSON Response</h3>
        <textarea id="response" className="form-control"></textarea>
      </div>
    );
  }
}
