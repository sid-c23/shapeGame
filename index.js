// specific to mysql
let mysql = require('mysql')
// app
let app = require('express')()
let http = require('http').Server(app)
let io = require('socket.io')(http)

// mysql configuration
let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'shapeGame'
})
// done

con.connect((err) => {
  if (err) {
    console.log(`Mysql error: ${err}`)
  }
})

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/index.html')
})
app.get('/api/rooms', (req, res) => {
  // collect room rows from database and return them to html
  con.query("SELECT * FROM channels", (err, results, fields) => {
    if (err) { throw err }
    return res.json(results)
  })
})

io.on('connection', (socket) => {
  socket.on("joinedRoom", (room) => {
    socket.join(room.id)
    // collect color for this room id and send it through socket
    con.query(`SELECT * FROM channels WHERE id=${room.id}`, (err, results, fields) => {
      let color = results[0].color
      socket.emit("colorChanged", color)
    })
  })
  socket.on('leaveRoom', ({id, color}) => {
    socket.leave(id)
  })
  socket.on('colorChanged', ({id, color}) => {
    con.query(`UPDATE channels SET color = '${color}' WHERE id = ${id}`, (err, results, fields) => {
      if (err) throw err

    })
    io.to(id).emit('colorChanged', color)
  })
})

http.listen(3000, () => {
  console.log('listening on localhost:3000')
})
