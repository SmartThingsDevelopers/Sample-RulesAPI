const axios = require("axios");

export function renderData(parentId, data) {
  data = JSON.stringify(data, null, "\t");
  document.querySelector(`#${parentId} #response`).value = "";
  document.querySelector(`#${parentId} #loading`).style.display = "block";
  document.querySelector(`#${parentId} #response`).value = data;
  setTimeout(function() {
    document.querySelector(`#${parentId} #loading`).style.display = "none";
    document.querySelector(`#${parentId} #responseH`).style.display = "block";
    document.querySelector(`#${parentId} #response`).style.display = "block";
  }, 1000);
}

export async function isLoggedIn() {
  // Log out
  document.querySelector("#auth-url").addEventListener("click", function() {
    localStorage.removeItem("bearer");
    localStorage.removeItem("refresh");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("expired_after");
    localStorage.removeItem("setBearer");
    window.location = `https://${process.env.REACT_APP_PROJECT_DOMAIN}.glitch.me/`;
  });

  // Compose auth URL
  var redirectUrl = `${process.env.REACT_APP_ST_API_URL}/oauth/authorize?`;
  var apiParams = {
    client_id: process.env.REACT_APP_CLIENTID,
    redirect_uri: `https://${process.env.REACT_APP_PROJECT_DOMAIN}.glitch.me`,
    scope: process.env.REACT_APP_ST_SCOPES,
    response_type: "code"
  };
  var myParams = new URLSearchParams(apiParams).toString();
  redirectUrl += myParams;

  // Check if logged in
  var authBearerToken = localStorage.getItem("bearer");
  console.log("Bearer: " + authBearerToken);
  if (authBearerToken !== null) {
    var expiredDate = new Date(localStorage.getItem("expired_after"));
    if (new Date() >= expiredDate) {
      var authUrl = `https://${process.env.REACT_APP_PROJECT_DOMAIN}.glitch.me/oauth/token`;
      var formData = `grant_type=refresh_token&client_id=${process.env.REACT_APP_CLIENTID}&redirect_uri=https://${process.env.REACT_APP_PROJECT_DOMAIN}.glitch.me`;

      // Proxy call to refresh bearer token using refresh token
      axios
        .post(authUrl, formData)
        .then(response => {
          var now = new Date();
          localStorage.setItem("bearer", response.data.access_token);
          localStorage.setItem("refresh", response.data.refresh_token);
          localStorage.setItem("expires_in", response.data.expires_in);
          localStorage.setItem(
            "expired_after",
            new Date(now.getTime() + response.data.expires_in * 1000)
          );
          localStorage.setItem("setBearer", new Date());
          window.location = `https://${process.env.REACT_APP_PROJECT_DOMAIN}.glitch.me`;
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      // Set API bearer field to token
      var allTokenInputs = document.querySelectorAll("#bearerToken");
      for (var i = 0; i < allTokenInputs.length; i += 1) {
        allTokenInputs[i].value = authBearerToken;
        allTokenInputs[i].readOnly = true;
      }
      // Grab locations and create dropdown element
      var dropdownGetLocationsHtml = "";
      var dropdownGetLocations = await axios.get(
        `${process.env.REACT_APP_ST_API_URL}/locations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bearer")}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (dropdownGetLocations.data) {
        // Create locations markup string
        // eslint-disable-next-line 
        dropdownGetLocations.data.items.map(loc => {
          dropdownGetLocationsHtml += `<option value='${loc.locationId}'>${loc.name}</option>`;
        });
        // Insert HTML
        // eslint-disable-next-line 
        for (var i = 0; i < document.querySelectorAll("#locationId").length; i++) {
          document.querySelectorAll("#locationId")[i].insertAdjacentHTML("beforeend", dropdownGetLocationsHtml);
        }
      }
    }
  } else {
    // If not signed in...
    var authCode = document.URL.split("code=")[1];
    if (authCode !== null) {
      document.querySelector(".tab-content").innerHTML = "";
      document.querySelector(".nav").innerHTML = "";
      document.querySelector(".tab-content").innerHTML =
        '<br/><br/><h1 style="font-weight:300 !important;">Hello! Please <a style="color:#08a2db;" href="' +
        redirectUrl +
        '">authorize your Samsung account</a>';
    }
  }
}

export function callBack() {
  // Callback function for Oauth
  var authUrl = `https://${process.env.REACT_APP_PROJECT_DOMAIN}.glitch.me/oauth/token`;

  // Only execute if we have received an authorization token
  if (document.URL.search("code") !== -1) {
    var authCode = document.URL.split("code=")[1];
    if (authCode !== null) {
      var formData = `grant_type=authorization_code&code=${authCode}&client_id=${process.env.REACT_APP_CLIENTID}&redirect_uri=https://${process.env.REACT_APP_PROJECT_DOMAIN}.glitch.me`;
      axios
        .post(authUrl, formData)
        .then(response => {
          var now = new Date();
          localStorage.setItem("bearer", response.data.access_token);
          localStorage.setItem("refresh", response.data.refresh_token);
          localStorage.setItem("expires_in", response.data.expires_in);
          localStorage.setItem(
            "expired_after",
            new Date(now.getTime() + response.data.expires_in * 1000)
          );
          localStorage.setItem("setBearer", new Date());
          window.location = `https://${process.env.REACT_APP_PROJECT_DOMAIN}.glitch.me`;
        })
        .catch(err => {
          console.error(err);
        });
    }
  } else if (document.URL.search("error") !== -1) {
    alert("Authorization error, try again later.");
  }
}
