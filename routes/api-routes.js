// Routes
// https://umn.bootcampcontent.com/University-of-Minnesota-Boot-Camp/MINSTP201802FSF1-Class-Repository-FSF/blob/master/18-mongo-mongoose/01-Activities/11-Scraping-into-a-db/Solved/server.js


const request = require('request');

// GET route for scraping website

module.exports = function(app) {

app.get("/scrape", function (req, res) {
    request("http://www.echojs.com/", function(error, response, html){
    var $ = cheeerio.load(html);

    $(".title").each(function(i, element) {

    })
    })
    .on('response', function(response){
        console.log(res)
    });
});

}