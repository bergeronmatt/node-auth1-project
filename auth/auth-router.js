//set up express object for router
const router = require('express').Router();

//set up the crypto object
const bcrypt = require('bcryptjs');

//utilize the user helper methods
const Users = require('../users/users-model.js');

//set up endpoint for registration
router.post('/register', (req, res) => {
    //we can use let here instead of const to allow for updating
    //user credentials later
    let user = req.body //user name and password

    //set up the amount of hashes based on the server power you have
    //rounds are 2 to the N power
    const rounds = process.env.HASH_ROUNDS || 8;

    //hash the cred.password
    //pass string from the credentials to the password with bcrypt
    const hash = bcrypt.hashSync(user.password, rounds)

    //update the creds to use the hash
    user.password = hash;

    
    //add the user to the database
    Users.add(user)
        .then(saved => {
            req.session.loggedIn = true;
            res.status(201).json({message: 'User saved.', saved})
        })
        .catch(err =>{
            res.status(500).json({errorMessage: 'Could not save user to database.', err})
        })
})

//set up the login endpoint for registered users
router.post('/login', (req, res) => {
    let {username, password} = req.body

    // search for the user by the username
    Users.findBy({ username })
        //begin search for the user
        // .then(user => { //this is used for the initial .then() way
        .then(([user]) => { //used to parse through the array of user objects without the user[] identifier
            // console.log('user:', user); debuggin 500 error
            // if the user is found check to see if the passwords match
            // if(user && bcrypt.compareSync(password, user[0].password)){ //initial way to search for user
            if(user && bcrypt.compareSync(password, user.password)){
                //if they are the same
                req.session.user = {
                    id: user.id,
                    username: user.username
                };
                res.status(200).json({message: 'You have successfully logged in.'})
            } else {
                //if they are not
                res.status(401).json({message: 'Incorrect password.'})
            }
        })
        //if there is an error before the comparison can begin
        .catch(err =>{
            res.status(500).json({errorMessage: 'Could not login.', err})
        })
})


module.exports = router;