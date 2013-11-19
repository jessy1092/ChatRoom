var socket = io.connect('/');
socket.on('connect', function()
{
	socket.emit('addUser', prompt('who are you?', 'annoymous'));
});

socket.on('chat', function(username, data)
{
	var p = username + ':' + data + '<br />';
	//document.getElementById('output').innerHTML += p;
	$('#output').append(p);
});

window.addEventListener('load', function()
{
	document.getElementById('sendText').addEventListener('click', function()
	{
		var text = document.getElementById('data').value;
		socket.emit('sendChat', text);
	}, false);
}, false);	

/*$('#sendText').click(function()
{
	socket.emit('sendChat', $('#data').text());
});*/