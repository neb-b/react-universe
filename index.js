import express from 'express'
import http from 'http'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import socketIO from 'socket.io'
import handleRender from './server/handle-render'
import api from './server/routes'
import editPost from './server/handlers/edit-post'

const app = express()
const server = http.Server(app)
const io = socketIO(server)
const PORT = process.env.port || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use('/public', express.static('public'))
app.use('/api', api)

app.get('*', handleRender)

server.listen(PORT, () => console.log(`\nRunning on port ${PORT}\n`))

io.on('connection', (socket) => {
  socket.emit('connected')
  socket.on('editPost', editPost.bind(null, socket))
})
