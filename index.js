const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const routes = require("./router/friends.js");
//users
let users = [];

// Checking if a user with the given username already exists
const doesExist = (username) => {
  // Filtering the users array for any user with the same username
  let usersWithSameName = users.filter((user) => {
    return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  if (usersWithSameName.length > 0) {
    return true;
  } else {
    return false;
  }
};
// Checking if the user with the given username and password exists
const authenticatedUser = (username, password) => {
  // Filtering the users array for any user with the same username and password
  let validUsers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  // Return true if any valid user is found, otherwise false
  if (validUsers.length > 0) {
    return true;
  } else {
    return false;
  }
};
const app = express();
//MİDDLEWARE
app.use(
    session({
        secret: "fingerprint",
        resave: true,
        saveUninitialized: true,
      })
    );
//MİDDLEWARE
app.use(express.json());
// Checking if user is logged in and has valid access token
//URL path "/friends"
app.use("/friends", (req, res, next) => {
  if (req.session.authorization) {
    let token = req.session.authorization["accessToken"];
    // Verify JWT token
    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        req.user = user;
        next(); // Proceed to the next middleware
      } else {
        res.status(403).json({ message: "User not authenticated" });
      }
    });
  }
});

//Login Endpoint
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Check if username or password is missing
  if (!username || !password) {
    return res.status(404).json({ message: "Error log in" });
  }
  // Authenticate user
  if (authenticatedUser(username, password)) {
    // Generate JWT access token

    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );
    // Store access token and username in session
    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User succesfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid login.Check username and password" });
  }
});

// User Register Endpoint
app.post("/register", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist

    if (!doesExist(username)) {
      // Add the new user to the users array

      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User succesfully registered.Now you can login" });
    } else {
      return res.status(404).json({ message: "Unable to register user" });
    }
  }
});

const PORT = 8080;
app.use("/friends", routes);
app.listen(PORT, () => console.log("Server is running"));
