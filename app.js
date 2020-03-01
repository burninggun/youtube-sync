const express = require('express');
const PORT = process.env.PORT || 3000;
const path = require('path');

const app = express();
const server = require('http').Server(app)


const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log(socket.id, "conected");
    socket.on('time', data => {
        console.log(data);
    })
})

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
    'Server is listening to PORT:', PORT
});