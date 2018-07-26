var socket = io();

$('form').submit(function() {
  var text = $('#message').val();
  var initials = $('#initials').val();
  socket.emit('message', text, initials);
  $('#message').val('');
  $('#initials').val('');
  return false;
});

socket.on('message', function (msg, initials) {
  $('<li>').text(initials + " : " + msg).appendTo('#history');
});