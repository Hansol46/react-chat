// server на NodeJS

// далее подключаем сокеты, сокеты позволяют видеть что-то в реальном времени
// в случае с socket нам не нужно постоянно посылать условные get запросы 
// мы все время связаны с сервером

// устанавливаем express - фреймворк 
const express = require('express')

// создаем express приложение
const app = express() // перемещаем всю серверную логику в app 

const rooms = {
    room: [10, 11, 12, 13],
    messages: ['hello', 'hi', 'bye']
}

// по запросу если получили users, запускаем фунцию
app.get('/rooms', (request, response) =>{
    response.json(rooms)
})

app.listen(9999, () => {
    if (err) {
        throw Error('Oppps... error', err);
    }
    console.log('Сервер запущен!')
})
