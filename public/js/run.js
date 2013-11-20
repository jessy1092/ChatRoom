$(function()
{
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

	$('#sendText').click(function()
	{
		//var text = $('#data').value;
		socket.emit('sendChat', $('#data').val());
	});
});