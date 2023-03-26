const express = require("express");
const router = express.Router();

//middleware will only run for this user service endpoint
// router.use(logger);

router
  .route("/")
  .get((req, res) => {
    //http://localhost:9000/users?lastName=mike
    //we can get the query from url param "lastName" by req.query.lastName
    const { lastName } = req.query; //users?lastName=mike
    console.log("lastName", lastName);
    req.customObject = "customValue";
    console.log("req.customObject", req.customObject);
    res.send(`Users List ${lastName}`);
  })
  .post((req, res) => {
    //This http POST request will be called once the form is submitted
    const { firstName } = req.body;
    const isValid = true;
    if (isValid) {
      users.push({ firstName: firstName });
      res.redirect(`/users/${users.length - 1}`);
      //if isValid then redirect users to /users/user.length as an id. To dynamic route below users/:userId
      //example /users/1
    } else {
      console.log(`error`);
      //{ firstName: firstName } this will populate that information back to the user
      //firstName value on the input even if the form is submitted
      //this good for UX because user can see their error and try to fix it.
      res.render("users/new", { firstName: firstName });
    }

    //below will not work because the if isValid condition is re-directing users back to the dynamic route below users/:userId
    res.send(`New user created ${firstName}`);
  });

router.get("/new", (req, res) => {
  res.render("users/new"); //, { firstName: "hassan" }
  //we are making a http POST request inside the form, once the form is submitted
  //we can add this as a second param { firstName: "hassan" } it will pre-defined hassan and display it in the input field
});

//dynamic route name could be id, userName, email, number ... etc pretty much anything
router
  .route("/:userId")
  .get(logger, (req, res) => {
    //req.params will find the url param "name" definition example id, userName, email, number
    const { userId } = req.params;
    // //console.log("requested user from GET", req.userObject); // doesn't work error by Kyle youtube
    console.log("dynamic route", userId);
    res.send(`Get user with ID ${userId}`);
  })
  .put((req, res) => {
    const { userId } = req.params;
    res.send(`Update user with ID ${userId}`);
  })
  .delete((req, res) => {
    const { userId } = req.params;
    res.send(`Delete user with ID ${userId}`);
  });

const users = [{ firstName: "Kyle" }, { firstName: "Sally" }];
console.log("users", users);

router.param("userId", (res, req, next, userId) => {
  req.userObject = users[userId];
  //req.user only works in the router.param, if we make a req.user from the above HTTP request it will not work - wrong by Kyle youtube
  console.log("requested user object", req.userObject);
  console.log("Hello user id", userId);
  next();
});

//middleware function
function logger(req, res, next) {
  console.log("logger url", req.originalUrl);
  next();
}

module.exports = router;
