var socket = io();
socket.on('connect', () =>{
  console.log('connected to server');


  socket.emit('createMessage', {
    to: 'anyone',
    text: 'node is awesome'
  });

});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newMessage', (data) => {
  console.log('got new message');
console.log(data);
});
