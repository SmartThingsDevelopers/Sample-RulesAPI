const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const qs = require("query-string");
const axios = require("axios");
const app = express();
const compareUrls = require("compare-urls");

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS for OPTIONS req
app.options("/oauth/token");

// Listen for POST /oauth/token request coming to proxy with secrets
app.post("/oauth/token", async (req, res) => {
  const formData = req.body;
  const publicUrl = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
  
  console.log(formData);
  
  // Ensure the client sends the client_id and the origin URL matches
  // what we configured it to be with ENV variables.
  if (
    !formData ||
    (!formData.client_id || 0 === formData.client_id.length) ||
    formData.client_id !== process.env.REACT_APP_CLIENTID ||
    !compareUrls(req.headers.origin, publicUrl)
  ) {
    console.log(
      "CLIENT_ID should match",
      `${formData.client_id}:${process.env.REACT_APP_CLIENTID}`
    );
    console.log(
      "ORIGIN should match",
      `${req.headers.origin}:${publicUrl}`
    );
    return res.sendStatus(400);
  }


  // When refreshing our bearer token, inject the app's
  // OAuth secret
  if (formData.grant_type === "refresh_token") {
    formData.client_secret = process.env.OAUTHSECRET;
  }

  axios
    .post(`${process.env.REACT_APP_ST_API_URL}/v1/oauth/token`, qs.stringify(formData), {
      auth: {
        username: formData.client_id,
        password: process.env.OAUTHSECRET
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(response => {
      console.log("Success", response && response.data);
      res.status(response.status).send(response.data);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(401);
    });
});

// Handle all requests that aren't matched
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start webserver
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
