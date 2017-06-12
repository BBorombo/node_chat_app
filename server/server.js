const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var rooms = new Rooms();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');
        }else if(users.existUser(params.name)){
            return callback('Name already taken');
        }
        var room = rooms.addRoom(params.room);
        socket.join(room.idName);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, room.idName);

        // io.emit -> io.to('Name').emit
        // socket.broadcasr.emit -> socket.broadcast.to('Name').emit
        // socket.emit
        io.to(room.idName).emit('updateUserList', users.getUserList(room.idName));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(room.idName).emit('newMessage', generateMessage('Admin', `${params.name} has joigned`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
       console.log('User was disconnected');
       if (user){
           io.to(user.room).emit('updateUserList', users.getUserList(user.room));
           io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
       }
    });
});

server.listen(port, () => {
    console.log(`Starting app on port ${port}`);
});
