const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
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
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
