const express = require('express');
const router = express.Router();
const db = require('../models');
const articles = db.Article;


const path = require('path');
// router.use('/', express.static(publicPath));

router.get('/', function(req,res) {
    res.render('main');
})

module.exports = router;