var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use('/assets', express.static('assets'))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function(req, res){
    res.sendFile(__dirname + '/admin.html');
});


var clients = [];

io.on('connection', function(socket){
    clients.push(socket.id);

    socket.on('disconnect', function(){
        clients.pop(socket.id);
    });

    socket.on('up', function() {
        io.emit('up');
    })

    socket.on('down', function() {
        io.emit('down');
    })

    socket.on('sound', function() {
        io.emit('sound');
    })

    socket.on('getClients', function() {
        io.emit('clients', clients)
    })

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
