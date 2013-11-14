var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs');

port = process.env.PORT || 2000;
app.listen(port);

function handler(req, res)
{
	fs.readFile(__dirname + '/index.html', function(err, data)
	{
		if(err)
		{
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		else
		{
			res.writeHead(200);
			res.end(data);
		}
	});
}

io.sockets.on('connection', function(socket)
{
	socket.on('addme', function(username)
	{
		socket.username = username;
		socket.emit('chat', 'SERVER', 'You have connected');
		socket.broadcast.emit('chat', 'SERVER', username + ' is on deck');
	});

	socket.on('sendchat', function(data)
	{
		io.sockets.emit('chat', socket.username, data);
	});

	socket.on('disconnect', function()
	{
		io.sockets.emit('chat', 'SERVER', socket.username + ' has left the chat room.');
	});
});

