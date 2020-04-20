//gatekeeper function
module.exports = (req, res, next) => {

    console.log('session', req.session);
    console.log('loggedIn', req.loggedIn);
    if(req.loggedIn){
        next();
    } else{
        res.status(401).json({message: 'Incorrect password'});
    }

};