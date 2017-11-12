const path = require('path');
const express = require('express');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');
//const http = require('http');
//const socketIO = require('socket.io');
//var app = express();
//var server = http.createServer(app);
//var io = socketIO(server);
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname,'../public');
var users = new Users();

app.use(express.static(publicPath));
console.log(publicPath);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params,callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chatapp'));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    //message.createdAt = new Date();
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name,message.text));
    }
  //  console.log('message data', message);
    callback();
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocateMessage', (coords) => {
    //console.log(coords);
    var user = users.getUser(socket.id);
    if(user) {
          io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }

  });

  socket.on('disconnect', ()=> {
    console.log('user disconnected');
    var user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }

  });
});


http.listen(port, () => {
  console.log('server up on port 3000');
});
