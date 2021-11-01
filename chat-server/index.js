const App = require('express')()
const server = require('http').createServer(App)
require('dotenv').config()
const BodyParser = require("body-parser");
const { Pool } = require("pg");
const client = require('pg/lib/native/client');
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect()
.catch(error => console.log('error:', error))

const io = require('socket.io')(server,{
  cors:{
    origin:'*',
  }
})

App.use(BodyParser.urlencoded({ extended: true }));
App.use(BodyParser.json());

io.on('connection', socket =>{
  socket.on('message', data => {
    db.query(`INSERT INTO chat(messages, username) VALUES ($1, $2)
              RETURNING messages, username, created_at`, [data.messages, data.username])
    console.log('Message received on server: ', data)
    io.emit('message', data)
  })

   socket.on('Disconnect', () => {
        console.log('User Disconnected')
    })
})

server.listen(3001,()=>{
    console.log('I am listening at port: 3001');
})
