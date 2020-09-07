// server на NodeJS

// далее подключаем сокеты, сокеты позволяют видеть что-то в реальном времени
// в случае с socket нам не нужно постоянно посылать условные get запросы 
// мы все время связаны с сервером

// устанавливаем express - фреймворк 
const express = require('express')

const app = express() 
const server = require('http').Server(app)
const io = require('socket.io')(server)                // наш server теперь знает, что такое socket

const rooms = {
    room: [10, 11, 12, 13],
    messages: ['hello', 'hi', 'bye'],
    'testRoom': {
        'messages': [],
        'users': []
    }
}

// const rooms = new Map()
app.get('/rooms', (request, response) =>{
    response.json(rooms)
})
app.post('/rooms', (request, response) => {
    console.log('Hello!')
})

io.on('connection', socket => {             // нужно понять подключился ли человек 
 console.log('user connected', socket.id)
})
server.listen(9999, (err) => {
    if (err) {
        throw Error('Oppps... error', err)
    } 
        console.log('Сервер запущен!')
})
