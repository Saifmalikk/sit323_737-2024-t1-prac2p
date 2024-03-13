var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').createServer(app); // Corrected this line
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var messages = [
    { name: 'Saif', message: 'hey' },
    { name: 'Aiman', message: 'Good' },
];

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body); // Emit the message to all Socket.IO clients
    res.sendStatus(200);
});
io.on('connection', (socket)=> {
    console.log('A User Connected')
})
// Use the HTTP server to listen on the port, not the Express app
http.listen(3000, () => {
    console.log('Server is listening on port', http.address().port);
});
