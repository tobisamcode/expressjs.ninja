const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Blog = require("./models/blog");
const { result } = require("lodash");
// express app
const app = express();

mongoose
  .connect(
    "mongodb+srv://node:test1234@nodeninja.6cx5y.mongodb.net/nodeblogs?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(result =>
    app.listen(3000, () => {
      console.log("server runing");
    })
  )
  .catch(err => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middlewares and static files
app.use(express.static("public"));
app.use(morgan("dev"));

// mongoose nad mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog2 created",
    snippet: "about my new blog",
    body: "more about my new blog"
  });

  blog
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err));
});

app.get("/single-blog", (req, res) => {
  Blog.findById("62a7104b8eca91ae5d50eec0")
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err));
});

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
