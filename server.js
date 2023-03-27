const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 9000;

fs.writeFile();

//ejs or pug both npms can be used for views pages.
app.set("view engine", "ejs");
//OR below without creating endpoints to load the files
//express.static("public") will view any static html file from public directory
//app.use(express.static("public"));

//if we want to run middleware on every route then it should be on top of all our routes,
//it will be called even if the route/endpoint don't exist
app.use(logger);

//middleware by express - this will allow us to access information coming from forms
//we need to pass object that has extended set to true, otherwise we will get a warning
app.use(express.urlencoded({ extended: true }));

//below exoress.json works exactly like the express.urlencoded({ extended: true })
//but it works for whenever we make a JSON request, if we make a fetch from the Client to the server calling the API
//it will parse JSON info from the body
app.use(express.json());

//logger middleware can be called for a specific HTTP request by adding it as a function param
app.get("/", (req, res, next) => {
  res.render("index", { text: "I am text coming from server.js file" });
});

app.get("/about", (req, res, next) => {
  res.render("about/about", { text: "I am text on the about page" });
});

const userRouter = require("./routes/users");
// const postsRouter = require("./routes/posts");

app.use("/users", userRouter);
// app.use("/posts", postsRouter);

//below is a simple middleware
function logger(req, res, next) {
  console.log("logger url", req.originalUrl);
  next();
}

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
