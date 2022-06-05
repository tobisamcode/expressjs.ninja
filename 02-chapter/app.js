const express = require("express");

// express app
const app = express();

app.get("/", (req, res) => {
  //   res.send("<p> home page </p>");
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  //   res.send("<p> about page </p>");
  res.sendFile("./views/about.html", { root: __dirname });
});

// listen for request
app.listen(3000, () => {
  console.log("server runing");
});
