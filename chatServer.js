var express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app);
	io = require('socket.io').listen(server),
	fs = require('fs');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res)
{
	res.render('index', {title: "Chat room", header: "Lee's 聊天室"});
})

port = process.env.PORT || 2000;
server.listen(port);



io.sockets.on('connection', function(socket)
{
	socket.on('addUser', function(username)
	{
		socket.username = username;
		socket.emit('chat', 'SERVER', 'You have connected');
		socket.broadcast.emit('chat', 'SERVER', username + ' is on deck');
	});

	socket.on('sendChat', function(data)
	{
		io.sockets.emit('chat', socket.username, data);
	});

	socket.on('disconnect', function()
	{
		io.sockets.emit('chat', 'SERVER', socket.username + ' has left the chat room.');
	});
});

