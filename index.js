//set up server object
const server = require('./api/server.js');

//set up listener
const PORT = process.env.PORT || 4000;

server.listen(PORT, () =>{
    console.log(`\n===Server is running on localhost:${PORT}`);
});