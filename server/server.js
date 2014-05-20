"use strict";

/*
 *
 * Entry file into the server
 * @app -
 *    our express app. Exported for testing and flexibility.
 *
*/

var app   = require('./main/app.js'),
    port  = app.get('port'),
    log   = 'Listening on ' + app.get('base url') + ':' + port, 
    server = require('http').createServer(app),
    io    = require('socket.io').listen(server);

server.listen(port);
console.log(log);


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('sounds', function (data) {
    console.log(data, "data!!!!!!!!!");
    socket.broadcast.emit('broadcast', data);
  });
});


// var jam = io.of('/jam');
// jam.on('connection', function (socket) {
//       jam.emit('news', { hello: 'world' });
// jam.on('sounds', function (data) {
//     console.log('sounds!')
//       jam.emit('broadcast', data);
//     });
//   });
