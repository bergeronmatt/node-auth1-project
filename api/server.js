// set up express and security objects
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

//set up middleware
const usersRouter = require('../users/user-router.js');
const authRouter = require('../auth/auth-router.js');

//setting up the middleware to protect user information at the server level
const authenticator = require('../auth/authenticator.js');

const server = express();

const sessionConfig = {
    name: "monster",
    secret: process.env.SESSION_SECRET || 'super strong secret',
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: process.env.USE_SECURE_COOKIES || false,
        httpOnly: true,
    },
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

// set up api paths to the routers
server.use('/api/users', authenticator, usersRouter);
server.use('/api/auth', authRouter);

//sanity test
server.get('/', (req, res) => {
    res.json({api: 'Green light is go.'});
});

module.exports = server;