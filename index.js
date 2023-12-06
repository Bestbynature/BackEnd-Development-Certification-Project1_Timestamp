// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date; // If no date provided, use current time

  // Check if the dateInput is a valid date or a timestamp
  if (!dateInput) {
    dateInput = new Date();
  } else {
    dateInput = isNaN(dateInput) ? dateInput : parseInt(dateInput);
  }
  let parsedDate = new Date(dateInput);
  if (parsedDate.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: parsedDate.getTime(), // Get Unix timestamp in milliseconds
      utc: parsedDate.toUTCString(), // Get date in UTC string format
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
