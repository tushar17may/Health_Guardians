const express = require ("express")
const app = express()
const server= require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/',(req,res)=>{
    res.redirect(`/${uuidV4()}`)

})

app.get('/:room', (req,res)=>{
    res.render('room', { roomid: req.params.room})
})

// jab mera join-room event trigger hoga to mujhe roomid aur user id milegi front end se
// isliye mujhe front end(room.ejs) ko meri roomid bhejni padegi jo main app.get('/: room) function se render kar rha hun/ bhej rha hun
 
io.on('connection', socket =>{
    socket.on('join-room', (roomid,userid)=>{
            socket.join(roomid)
            socket.to(roomid).broadcast.emit('user-connected', userid)

            socket.on('disconnect',()=>{
                socket.to(roomid).broadcast.emit('user-disconnected',userid)
            })
    })
})

//socket.join(roomid) says when my join-room event is emmitted from front-end(script.js) then
// 1. switch on the socketsocket 
// 2. join roomid to socket

//socket.to(roomid) is used to send a message to roomid

server.listen(3000)

