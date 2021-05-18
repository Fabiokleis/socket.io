const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const path = require('path');
const socketIO = require('socket.io');

app.use('/', express.static(path.join(__dirname, 'public')));

const io = socketIO(httpServer);
io.on('connection', (socket) => {
    console.log('a user connected');

    // (event_name, obj_to_send);

    socket.emit('hello',{msg: "ola mundo"});

    // mapping envent from front-end
    // (obj_returned)
    socket.on('hello_client_response', (obj) => {
        console.log(obj.msg);
    });


    // send obj to all users sessions except for emitting socket

    socket.broadcast.emit('hi', {msg: 'first message'});

    // send obj to all users sessions

    io.emit('hi2', {msg: 'seccond message'});

    socket.on('client_response_to_hi', (obj) => {
        console.log(obj.msg);
    });

    socket.on('client_response_to_hi2', (obj) => {
        console.log(obj.msg);
    });

    // event trigged when user close window
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

httpServer.listen(3000, (err) => {
    if(err) throw err;
    console.log('listening on *:3000');

});
