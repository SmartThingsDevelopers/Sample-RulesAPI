import React from "react";
import axios from "axios";
import { renderData } from "../utils.js";

export default class ListRules extends React.Component {
  componentDidMount() {
    var resetButton = document.querySelector("#list-rules .clear");
    resetButton.addEventListener("click", function() {
      document.querySelector("#list-rules #response").style.display = "none";
      document.querySelector("#list-rules #loading").style.display = "none";
      document.querySelector("#list-rules #responseH").style.display = "none";
    });
  }

  returnFalse(e) {
    e.preventDefault();
  }

  async listRule() {
    document.querySelector("#list-rules #response").style.display = "none";
    document.querySelector("#list-rules #responseH").style.display = "none";
    var bearerToken = `Bearer ${
      document.querySelector("#list-rules #bearerToken").value
    }`;
    var locationId = document.querySelector("#list-rules #locationId").value;
    if (
      bearerToken === null ||
      bearerToken === "" ||
      locationId === null ||
      locationId === ""
    ) {
      return false;
    }

    // Check API
    var apiEndpoint = `${process.env.REACT_APP_ST_API_URL}/rules?locationId=${locationId}`;
    var listRules = await axios.get(apiEndpoint, {
      headers: {
        Authorization: bearerToken,
        "Content-Type": "application/json",
        Accept: "application/vnd.smartthings+json;v=1"
      }
    });
    if (listRules.data) {
      renderData("list-rules", listRules.data);
    }
  }

  render() {
    return (
      <div id="list-rules" className="tab-pane fade in active">
        <p>List all rules for a location.</p>
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
            id="listRules"
            className="btn btn-primary"
            onClick={this.listRule}
          >
            View rules
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
