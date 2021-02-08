const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const mysql = require('mysql');
var mysqlConnection = require('./connection');
const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


io.on('connection', (socket) => {
    console.log('Connected...',socket.id)
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message', msg)
    })

})
