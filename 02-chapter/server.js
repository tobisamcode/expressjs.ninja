const express = require("express");
const morgan = require("morgan");
// express app
const app = express();

const { MongoClient } = require("mongodb");
// connect to mongodb
async function main() {
  const uri =
    "mongodb+srv://netninja:testing1234@nodeninja.6cx5y.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("databases:");

  databasesList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  });
}

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
