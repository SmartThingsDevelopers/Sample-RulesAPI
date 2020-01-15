import React from "react";
import axios from "axios";
import { renderData } from "../utils.js";

export default class GetDeviceStatus extends React.Component {
  componentDidMount() {
    var resetButton = document.querySelector("#get-device-status .clear");
    resetButton.addEventListener("click", function() {
      document.querySelector("#get-device-status #response").style.display =
        "none";
      document.querySelector("#get-device-status #loading").style.display =
        "none";
      document.querySelector("#get-device-status #responseH").style.display =
        "none";
    });
  }

  returnFalse(e) {
    e.preventDefault();
  }

  async getDeviceStatus() {
    document.querySelector("#get-device-status #response").style.display =
      "none";
    document.querySelector("#get-device-status #responseH").style.display =
      "none";
    var bearerToken = `Bearer ${
      document.querySelector("#get-device-status #bearerToken").value
    }`;
    var locationId = document.querySelector("#get-device-status #locationId")
      .value;
    var deviceId = document.querySelector("#get-device-status #deviceId").value;
    if (
      bearerToken === null ||
      bearerToken === "" ||
      locationId === null ||
      locationId === "" ||
      deviceId === null ||
      deviceId === ""
    ) {
      return false;
    }

    // Check API
    var apiEndpoint = `${process.env.REACT_APP_ST_API_URL}/devices/${deviceId}/status?locationId=${locationId}`;
    var getDeviceStatus = await axios.get(apiEndpoint, {
      headers: {
        Authorization: bearerToken,
        "Content-Type": "application/json",
        Accept: "application/vnd.smartthings+json;v=1"
      }
    });
    if (getDeviceStatus.data) {
      renderData("get-device-status", getDeviceStatus.data);
    }
  }

  render() {
    return (
      <div id="get-device-status" className="tab-pane fade in">
        <p>Get the status of a specific device.</p>
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
          <label>Device</label>
          <input
            placeholder="Device id"
            id="deviceId"
            className="form-control"
            required=""
          />
          <button
            id="getDeviceStatus"
            className="btn btn-primary"
            onClick={this.getDeviceStatus}
          >
            Get Device Status
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
