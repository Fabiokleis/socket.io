const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io');


app.use('/', express.static(path.join(__dirname, 'public')));

const server = app.listen(3000, (err) => {
    if(err) throw err;
    console.log('listening on *:3000');

});

const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('hello',{msg: "ola mundo"});
    socket.on('hello_client_response', (msg) => {
        console.log(msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
