

var path = require('path');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var WebSocketServer = require('ws').Server;
var app = express();
var server = http.createServer(app);
var wss = new WebSocketServer({ server: server });


app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var openSockets = [];



wss.on('connection', function connection(ws) {

  ws.send("connected");
  openSockets.push(ws);

  ws.on('message', function incoming(message) {
    console.log('received a message: %s', message);

    openSockets.forEach(function(socket) {
        socket.send(message);
    });
    console.log('sent a message: %s', message);
  });

});


server.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
