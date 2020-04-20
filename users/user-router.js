//set up router object with express
const router = require("express").Router();

//import the helper functions
const Users = require("./users-model.js");



//render the list of the users
router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
