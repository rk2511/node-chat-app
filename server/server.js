const path = require('path');
const express = require('express');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
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

app.use(express.static(publicPath));
console.log(publicPath);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chatapp'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));

  socket.on('createMessage', (message, callback) => {
    //message.createdAt = new Date();
    console.log('message data', message);
    io.emit('newMessage', generateMessage(message.from,message.text));
    callback();
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocateMessage', (coords) => {
    //console.log(coords);
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', ()=> {
    console.log('user disconnected');
  });
});


http.listen(port, () => {
  console.log('server up on port 3000');
});
