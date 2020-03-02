const express = require('express');
const PORT = process.env.PORT || 3000;
const path = require('path');

const app = express();
const server = require('http').Server(app)


const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log(socket.id, "conected");

    socket.on('join room', data => {
        socket.join(data.room_name);
        const room = io.sockets.adapter.rooms[data.room_name];
        const users = Object.keys(room.sockets);

        let newUsername = Math.floor(Math.random() * 10);
        while ( newUsername in users ){
            newUserName = Math.floor(Math.random() * 10);
        }

        socket.emit('new username', {
            username: newUsername
        })

        console.log(socket.id, 'joined room:', data.room_name)
    });

    socket.on('time', data => {
        const {room_name, username, timestamp} = data;
        // console.log('received time', data);
        socket.broadcast.to(room_name).emit('time', {
            timestamp
        })
        // io.to(data.room).emit('time_sync', {
        //     time: data.timestamp
        // })
    })
    socket.on('pause', data => {
        const {room_name, username} = data;
        
        socket.broadcast.to(room_name).emit('pause', {
            username
        })
    })

    socket.on('play', data => {
        const {room_name, username} = data;
        socket.broadcast.to(room_name).emit('play', {
            username
        })
    })
    

})

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
    'Server is listening to PORT:', PORT
});