const request = require('request');
const cheerio = require('cheerio');
const db = require('../models');

// GET route for scraping website

module.exports = function(app) {

app.get('/', function (req, res) {
  db.Article.find({ saved: false}, function(err,data){
    const hbsObject ={
      article: data,
    }
    res.render('index-2', hbsObject);
  })
})

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
    // res.send("scrape complete");
    res.redirect('/')
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

  // POST to save an article
  // app.post("/savearticle/:id", function (req, res) {
  //   db.Article.findByIdAndUpdate({
  //       _id: req.params.id
  //     }, {
  //       saved: true
  //     })
  //     .then(function (dbArticle) {
  //       res.json(dbArticle);
  //     })
  //     .catch(function (err) {
  //       res.json(err);
  //     })
  // });


  app.get('/saved', function (req, res) {
    db.Article.find({ saved: true}, function(err,data){
      const hbsObject ={
        article: data,
      }
      res.render('index-2', hbsObject);
    })
  
  })

  
  
}
