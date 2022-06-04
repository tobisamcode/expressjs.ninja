const fs = require("fs");
// reading files
// fs.readFile("./docs/blog1.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data.toString());
// });

// console.log("last line");

// writing files
// fs.writeFile("./docs/blog1.txt", "hello world", () => {
//   console.log("already written in the file");
// });

// fs.writeFile("./docs/blog2.txt", "hello again", () => {
//   console.log("already written in the file");
// });

// directories
fs.mkdir("./assets", err => {
  if (err) {
    console.log(err);
  }
  console.log("folder created");
});

// deleting files
