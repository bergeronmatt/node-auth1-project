// set up express and security objects
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
// const session = require('express-session');

//set up middleware
const usersRouter = require('../users/user-router.js');
const authRouter = require('../auth/auth-router.js');
// const authenticator = require('../auth/authenticator.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
// server.use(session(sessionConfig));

// set up api paths to the routers
server.use('/api/users', /**authenticator,*/ usersRouter);
server.use('/api/auth', authRouter);

//sanity test
server.get('/', (req, res) => {
    res.json({api: 'Green light is go.'});
});

module.exports = server;