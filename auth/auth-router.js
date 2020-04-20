//set up express object for router
const router = require('express').Router();

//set up the crypto object
const bcrypt = require('bcryptjs');

//utilize the user helper methods
const Users = require('./users-model');

//set up endpoint
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
    Users.add(creds)
        .then(saved => {
            res.status(201).json({message: 'User saved.', saved})
        })
        .catch(err =>{
            res.status(500).json({errorMessage: 'Could not save user to database.', err})
        })
})

module.exports = router;