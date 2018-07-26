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
  });
  for(var i = 0; i < messageArray.length; i++) {
    io.emit('message', messageArray[i][0], messageArray[i][1]);
  }
});

server.listen(process.env.PORT || 3000, function () {
  console.log('Chat server running');
});