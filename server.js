const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


//Our scraping tools
const cheerio = require("cheerio");

//Require all models
const db = require("./models");

const PORT = 3000;

// Initialize Express
const app = express();

// Configure middleware

// request for logging requests

