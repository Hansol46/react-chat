
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
    socket.on('ROOM: JOIN', ({roomId, userName}) => {
        socket.join(roomId)                // подключаемся в определенную комнату
        rooms.get(roomId).get('users').set(socket.id, userName) // сохранили пользователя
        const users = [...rooms.get(roomId).get('users').values()]           
        socket.to(roomId).broadcast.emit('ROOM: SET_USERS', users)        // всем надо отправить сокет запрос 
    })
    socket.on('ROOM:NEW_MESSAGE', ({roomId, userName, text})) => {
        const loggerData {
            userName,
            text,
        }
        rooms.get(roomId).get('messages').push(loggerData);
        socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', loggerData);
    }
});

socket.on('disconnect', ()=> {
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
