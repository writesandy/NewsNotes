// Routes
// https://umn.bootcampcontent.com/University-of-Minnesota-Boot-Camp/MINSTP201802FSF1-Class-Repository-FSF/blob/master/18-mongo-mongoose/01-Activities/11-Scraping-into-a-db/Solved/server.js


const request = require('request');
const cheerio = require('cheerio');
const db = require('../models');

// GET route for scraping website

module.exports = function(app) {

app.get("/scrape", function (req, res) {
    request("http://www.nytimes.com/", function(error, response, html){
    let $ = cheerio.load(html);

    $(".theme-summary").each(function(i, element) {
        let headline = $(this)
        .children(".story-heading")
        .text()
        .trim();

        let url = $(this)
        .children(".story-heading")
        .children("a")
        .attr("href");

        let summary = $(this)
        .children(".summary")
        .text()
        .trim();

        let dataToAdd = {
            headline: headline,
            url: url,
            summary: summary
        };
        db.Article.create(dataToAdd)
        .then(function(dbArticle){
            console.log(dbArticle);
        }).catch(function (err){
            return res.JSON(err);
        });
    });
    res.send("scrape complete");
});
})

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  
  
}
