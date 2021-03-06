
const express = require('express')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)           // наш server теперь знает, что такое socket

app.use(express.json())
// app.use(express.urlencoded({extended: true}))
const rooms = new Map()

app.get('/rooms/:id', (request, response) =>{
    const {id: roomId} = request.params
    const loggerData = rooms.has(roomId)
    ?
    {
        users: [...rooms.get(roomId).get('users').value()],
        messages: [...rooms.get(roomId).get('messages').value()],
    } : {
        users: [], messages: []
    }
    response.json(loggerData)
})


app.post('/rooms', (request, response) => {
    // console.log(request.body)
    const { roomId, userName } = request.body
    if(!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []],
        ])
        )
    }
    response.send()
})

io.on('connection', socket => {                 // нужно понять подключился ли человек 
    socket.on('ROOM: JOIN', (data) => {
        socket.join(data.roomId)                // подключаемся в определенную комнату
        rooms.get(data.roomId).get('users').set(socket.id, data.userName) // сохранили пользователя
        const users = [...rooms.get(data.roomId).get('users').values()]           
        socket.to(data.roomId).broadcast.emit('ROOM: SET_USERS', users)        // всем надо отправить сокет запрос 
    })
 console.log('user connected', socket.id)
});

io.on('disconnect', ()=> {
    rooms.forEach((value, roomId)=> {
        if(value.get('users').delete(socket.id)) {
            const users = [...value.get('users').values()]
            socket.to(roomId).broadcast.emit('ROOM: SET_USERS', users)
        }
    })
})

server.listen(9999, (err) => {
    if (err) {
        throw Error('Oppps... error', err)
    } 
        console.log('Сервер запущен!')
})
