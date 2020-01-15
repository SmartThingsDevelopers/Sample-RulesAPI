import React from "react";
import axios from "axios";
import { renderData } from "../utils.js";

export default class SubmitRules extends React.Component {
  componentDidMount() {
    var resetButton = document.querySelector("#rules-submit .clear");
    resetButton.addEventListener("click", function() {
      document.querySelector("#rules-submit #response").style.display = "none";
      document.querySelector("#rules-submit #loading").style.display = "none";
      document.querySelector("#rules-submit #responseH").style.display = "none";
    });
  }

  returnFalse(e) {
    e.preventDefault();
  }

  async submitRule() {
    document.querySelector("#rules-submit #response").style.display = "none";
    document.querySelector("#rules-submit #response").style.display = "none";
    var bearerToken = `Bearer ${
      document.querySelector("#rules-submit #bearerToken").value
    }`;
    var locationId = document.querySelector("#rules-submit #locationId").value;
    var jsonBody = document.querySelector("#rules-submit #jsonBody").value;
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
      renderData("rules-submit", submitRules.data);
    }
  }

  render() {
    return (
      <div id="rules-submit" className="tab-pane fade in">
        <p>Submit a new rule to a location.</p>
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
          <label>Rule JSON</label>
          <textarea
            id="jsonBody"
            placeholder="Paste your JSON here"
            className="form-control"
            required=""
          ></textarea>
          <button
            id="submitRule"
            className="btn btn-primary"
            onClick={this.submitRule}
          >
            Submit Rule
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
