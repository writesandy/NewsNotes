const express = require("express"); 
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require("request");


//Our scraping tools
const cheerio = require("cheerio");

//Require all models
const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Configure middleware

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());

// Use express.static to serve the public folder as a static directory

app.use(express.static("public"));
// Connect to Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/newarticles")

require("./routes/api-routes.js")(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  