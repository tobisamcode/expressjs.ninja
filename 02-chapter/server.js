const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// express app
const app = express();

// connect to mongodb
const uri =
  "mongoose.connect('mongodb://nodeblog-shard-00-01.srpro.mongodb.net:27017/?replicaSet=rsName');";
// Prints "MongoServerError: bad auth Authentication failed."
mongoose
  .connect(uri, {})
  .then(() => console.log("connected"))
  .catch(err => console.log(err.reason));

// register view engine
app.set("view engine", "ejs");

// listen for request
app.listen(3000, () => {
  console.log("server runing");
});
// middlewares and static files
app.use(express.static("public"));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur"
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur"
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur"
    }
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
