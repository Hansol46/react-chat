// server на NodeJS

// далее подключаем сокеты, сокеты позволяют видеть что-то в реальном времени
// в случае с socket нам не нужно постоянно посылать условные get запросы 
// мы все время связаны с сервером

// устанавливаем express - фреймворк 
const express = require('express')

const app = express() 
const server = require('http').Server(app)
const io = require('socket.io')(server)                // наш server теперь знает, что такое socket

// const rooms = {
//     room: [10, 11, 12, 13],
//     messages: ['hello', 'hi', 'byee'],
//     'testRoom': {
//         'messages': [],
//         'users': []
//     }
// }
app.use(express.json())

const rooms = new Map();

app.get('/rooms', (request, response) =>{
    response.json(rooms)
})
app.post('/rooms', (request, response) => {
    // console.log(request.body)
    const { roomId, userName } = request.body
    if(!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []],
        ]))
    }
    response.send()
})

io.on('connection', socket => {                 // нужно понять подключился ли человек 
    socket.on('ROOM: JOIN', (data) => {
        socket.join(data.roomId)                // подключаемся в определенную комнату
        rooms.get(data.roomId).get('users').set(socket.id, data.userName) // сохранили пользователя
        const users = [...rooms.get(data.roomId).get('users').values()]           
        socket.to(data.roomId).broadcast.emit('ROOM: JOINED', users)        // всем надо отправить сокет запрос 
    })
 console.log('user connected', socket.id)
})
server.listen(9999, (err) => {
    if (err) {
        throw Error('Oppps... error', err)
    } 
        console.log('Сервер запущен!')
})
