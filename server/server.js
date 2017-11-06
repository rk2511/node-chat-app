const path = require('path');
const express = require('express');
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

  socket.on('createMessage', (message) => {
    message.createdAt = new Date();
    console.log('message data', message);
  });

  socket.emit('newMessage', {
    from: 'vikki',
    text: 'andrew is awesome'
  });


  socket.on('disconnect', ()=> {
    console.log('user disconnected');
  });
});


http.listen(port, () => {
  console.log('server up on port 3000');
});
