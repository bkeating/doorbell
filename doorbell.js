var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(5050);

app.use('/img',__dirname+'/img');

app.get('/', function (req, res) { 
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('ring', function (data) {
    console.log(data);
    socket.emit('noise', {hello: 'world' });
  });
});
