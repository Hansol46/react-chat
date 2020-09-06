// server на NodeJS

// далее подключаем сокеты, сокеты позволяют видеть что-то в реальном времени
// в случае с socket нам не нужно постоянно посылать условные get запросы 
// мы все время связаны с сервером

// устанавливаем express - фреймворк 
const express = require('express')

// создаем express приложение
const app = express() // перемещаем всю серверную логику в app 

const rooms = {
    room: [],
    messages: ['hello']
}

// по запросу если получили users, запускаем фунцию
app.get('/rooms', (request, response) =>{
    response.json(rooms)
})

app.listen(9999, () => {
    console.log('Сервер запущен!')
})
