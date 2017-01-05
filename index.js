/* This is the setup file for my 'learning' application.
*  I'm just saying this so I can learn shit. 
*  Following a tutorial found on socket.io.
*  Kamil Krawczyk - Jan. 3, 2017 */


// setup
var app = require('express'),
	millerChat = app(),
	http = require('http').Server(millerChat),
	connectMessage = 'A user has connected.',
	disconnectMessage = 'A user has left.',
	port = 3000,
	sockIO = require('socket.io')(http);

// routing
millerChat.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// set up sockets (listen to connect/disconnect/receive messages)
sockIO.on('connection', function (socket) {
	// on connect log to server
	console.log(connectMessage);

	// on message sent, send message to client
	socket.on('chat message', function (msg) {
		sockIO.emit('chat message', msg);
	});

	// on disconnect log to server
	socket.on('disconnect', function () {
		console.log('A user has disconnected.');
		sockIO.emit('chat message', disconnectMessage);
	});
});

// set up listener
http.listen(port, function () {
	console.log('Listening on port ' + port);
});