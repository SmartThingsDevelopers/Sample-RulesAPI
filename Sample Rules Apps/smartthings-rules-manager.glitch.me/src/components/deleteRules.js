import React from "react";
import axios from "axios";
import { renderData } from "../utils.js";

export default class DeleteRules extends React.Component {
  componentDidMount() {
    var resetButton = document.querySelector("#delete-rule .clear");
    resetButton.addEventListener("click", function() {
      document.querySelector("#delete-rule #response").style.display = "none";
      document.querySelector("#delete-rule #loading").style.display = "none";
      document.querySelector("#delete-rule #responseH").style.display = "none";
    });
  }

  returnFalse(e) {
    e.preventDefault();
  }

  async deleteRule() {
    document.querySelector("#delete-rule #response").style.display = "none";
    document.querySelector("#delete-rule #responseH").style.display = "none";
    var bearerToken = `Bearer ${
      document.querySelector("#delete-rule #bearerToken").value
    }`;
    var locationId = document.querySelector("#delete-rule #locationId").value;
    var ruleId = document.querySelector("#delete-rule #ruleId").value;
    if (
      bearerToken === null ||
      bearerToken === "" ||
      locationId === null ||
      locationId === "" ||
      ruleId === null ||
      ruleId === ""
    ) {
      return false;
    }

    // Check API
    var apiEndpoint = `${process.env.REACT_APP_ST_API_URL}/rules/${ruleId}?locationId=${locationId}`;
    var deleteRule = await axios.delete(apiEndpoint, {
      headers: {
        Authorization: bearerToken,
        "Content-Type": "text",
        Accept: "application/vnd.smartthings+json;v=1"
      }
    });
    if (deleteRule.data) {
      renderData("delete-rule", deleteRule.data);
    }
  }

  render() {
    return (
      <div id="delete-rule" className="tab-pane fade in">
        <p>Delete a rule.</p>
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
          <label>Rule</label>
          <input
            placeholder="Rule id"
            id="ruleId"
            className="form-control"
            required=""
          />
          <button
            id="deleteRule"
            className="btn btn-primary"
            onClick={this.deleteRule}
          >
            Delete Rule
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
