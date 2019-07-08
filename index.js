var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function(req, res){
    res.sendFile(__dirname + '/admin.html');
});

io.on('connection', function(socket){
    socket.on('up', function() {
        io.emit('up');
    })

    socket.on('down', function() {
        io.emit('down');
    })        

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
