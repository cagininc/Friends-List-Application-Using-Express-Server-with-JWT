const express = require("express");

const router = express.Router();

let friends = {
  "johnsmith@gamil.com": {
    firstName: "John",
    lastName: "Doe",
    DOB: "22-12-1990",
  },
  "annasmith@gamil.com": {
    firstName: "Anna",
    lastName: "smith",
    DOB: "02-07-1983",
  },
  "peterjones@gamil.com": {
    firstName: "Peter",
    lastName: "Jones",
    DOB: "21-03-1989",
  },
};

// GET request: Retrieve all friends
router.get("/", (req, res) => {
  res.send(JSON.stringify(friends, null, 4));
});

// GET by specific ID request by email : Retrieve a single friend with email ID
router.get("/:email", (req, res) => {
  const email = req.params.email;
  res.send(friends[email]);
});

// POST request: Add a new friend
router.post("/", (req, res) => {
  //if email is provided
  if (req.body.email) {
    // Create or update friend's details based on provided email
    friends[req.body.email] = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      DOB: req.body.DOB,
    };
    // Send response indicating user addition
    res.send("The  User" + "" + req.body.firstname + "is added");
  }
});
//İmplementing modifying friends functions

router.put("/:email",(req,res)=>{
    // Extract email parameter from request URL
const email=req.params.email
let friend=friends[email]// Retrieve friend object associated with email
if(friend) {
    // Check if friend exists and update the content
    let firstName=req.body.firstName;
let lastName=req.body.lastName;

let DOB=req.body.DOB;

if(DOB){friend["DOB"]=DOB};
if(firstName){friend["firstName"]=firstName};
if(lastName){friend["lastName"]=lastName};

// Update friend details in 'friends' object
friends[email]=friend;
res.send(`Friend with the email ${email} is updated`)
}
return res.send('Unable to find friend!')

})
//Deleting friend endpoint
router.delete('/:email',(req,res)=>{
        // Extract email parameter from request URL

let email=req.params.email;
if(email){
            // Delete friend from 'friends' object based on provided email

    
            delete friends[email]
    res.send(`Friend with email:${email} deleted `)
}
else
res.send(`Friend with email:${email} not found `)


})






module.exports = router; 
