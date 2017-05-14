import { createPost } from '../firebase'

export default (socket, data) => {
	console.log('DATATATATA', data)
	console.log('socket', socket)
	socket.emit('testMessage', { hello: 'hi' })
}
