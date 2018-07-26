var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

var io = require('socket.io')(server);
var messageArray = []; 

io.on('connection', function (socket) {
  socket.on('message', function (msg, initials) {
    io.emit('message', msg, initials);
    messageArray.push([msg, initials]);
    console.log(messageArray);
  });
  for(var i = 0; i < messageArray.length; i++) {
    io.emit('message', messageArray[i][0], messageArray[i][1]);
  }
});

console.log(messageArray);

server.listen(3000, function () {
  console.log('Chat server running');
});