const express = require("express");
const jwt = require("jasonwebtoken");
const session = require("session");
const routes = require("router/friends.js");

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
if(validUsers.length>0){return true}
else{return false}
};
const app=express
app.use(session({secret:"fingerprint"}))

const PORT = 8080;
app.use;
