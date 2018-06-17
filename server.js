const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require("request");


//Our scraping tools
const cheerio = require("cheerio");

//Require all models
const db = require("./models");

const PORT = process.env.PORT || 3000;


// Initialize Express
const app = express();

// Configure middleware

// request for logging requests
// app.use(request(""));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true}));
// Use express.static to serve the public folder as a static directoryy
app.use(express.static("publc"));
// Connect to Mongo DB
mongoose.connect("mongodb://localhost/3000")

// Routes

// GET route for scraping website
app.get("/scrape", function (req, res) {
    request.get("http://www.echojs.com/").then(function(res){
        console.log(res)
    })
})


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  