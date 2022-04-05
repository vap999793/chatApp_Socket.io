let express = require('express');
let path = require('path');

let app = express();

var http = require('http').createServer(app);

http.listen(3000, ()=>{
    console.log(`Server is running at PORT : 3000`);
})

app.use(express.static(path.join(__dirname, '/public')));

app.get('/vapChat', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

let io = require('socket.io')(http);

io.on('connection', (socket)=>{
    console.log("Socket io is connected...");
    socket.on("msgSend", (msg)=>{
        socket.broadcast.emit("sendToAll", msg);
    })
})