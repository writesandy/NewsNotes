const express = require('express');
const router = express.Router();
const db = require('../models');
const articles = db.Article;


const path = require('path');

module.exports = function(app) {

router.use('/', express.static('public'));

router.get('/', function(req,res) {
    res.render('main');
});
}