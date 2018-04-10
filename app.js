var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

// Port
const port = 3000;

//adding middleware - cors
app.use(cors());

//body-parser
app.use(bodyParser.json());

// Testing server
app.get('/', function(req, res)
{
    res.send("socket io sample");
})

io.on("connection", (socket) => 
{
    console.log("Total connection : ", io.engine.clientsCount);
    socket.on('new message', (chatMessage) =>
    {
        socket.broadcast.emit('new message received', chatMessage);
    });
    socket.on("disconnect", (res) => 
    {
        // totalConnection--;
        console.log("Total connection : ", io.engine.clientsCount);
    });
});

http.listen( port, ()=>{
    console.log("Server started at port " + port);
});
