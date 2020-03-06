const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("search");
});

app.get("/results", (req, res) => {
  const query = req.query.search;
  const url = `http://www.omdbapi.com/?s=${query}&apikey=thewdb`;

  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.render("results", {
        data: data,
        query: query
      });
    }
  });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
