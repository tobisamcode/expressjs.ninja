# node-crash-course
a chapter that explains the basics and the system of nodejs. 

- file system ('fs')
- operating system ('os')
- module.exports = {}
- require('')


fs.readFile("./docs/blog1.txt", (err, data))

fs.writeFile("./docs/blog2.txt", "hello again", () => {
   console.log("already written in the file");
});

fs.mkdir

fs.rmdir