const express = require("express");

// express app
const app = express();

// register view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //   res.send("<p> home page </p>");
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  //   res.send("<p> about page </p>");
  res.sendFile("./views/about.html", { root: __dirname });
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page

app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

// listen for request
app.listen(3000, () => {
  console.log("server runing");
});
