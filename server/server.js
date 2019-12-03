const express = require('express');
const app = express();
const io = require('socket.io')();
const bodyParser = require('body-parser');
const cors = require("cors");
const Chat = require("./service/conversation");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

const chatPort = 3002;
io.listen(chatPort);
app.use(express.json());
app.use(`${process.env.TWITTER_API_PATH}`, require('./routes'));

io.on('connection', function (socket) {
    console.log('a user connected');
    // channel id -> abc|abcd
    // abc|abcd -> 2 user
    socket.on('channel id', (channel) => {
        socket.on(channel, (message) => {
            console.log('coming msg == ', message);
            Chat.saveMessage(channel, JSON.parse(message));
            io.emit(channel, message);
        })
    });

    // socket.on('message', function (data) {
    //     io.in("myroom").emit('message', data);
    // });

    // socket.on('join', function (name, device, room) {
    //     console.log("new client has joinning a room");
    //     socket.join("myroom");
    // });

    // socket.on('subscribe', function (room) {
    //     console.log('joining room', room);
    //     socket.join(room);
    // })

    // socket.on('unsubscribe', function (room) {
    //     console.log('leaving room', room);
    //     socket.leave(room);
    // })

    // socket.on('send', function (data) {
    //     console.log(socket.rooms);
    //     console.log('sending message to room', data.room);
    //     io.to(data.room).emit('message', data);
    // });



});
app.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT}!`));