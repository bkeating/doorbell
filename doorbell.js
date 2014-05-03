var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(5050);

io.configure(function (){
  io.set('authorization', function(handshakeData, callback){
    console.log(handshakeData.query);
    var auth = false;
    if (handshakeData.query.userpw == "letmein")
      auth = true;
    callback(null,auth); //null for error, true for authorize
  })
})

app.get('/', function (req, res) { 
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('play', function (data) {
    console.log(data);
    //socket.emit('noise', {hello: 'world' });
    socket.broadcast.emit('play', 'ben');
    //io.sockets.emit('noise', "tet");
    //io.sockets.send("te2it");
  });
  socket.on('stop', function (data) {
    socket.broadcast.emit('stop', 'broadcastStop');
  });
});
