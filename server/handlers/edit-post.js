import { updatePost } from '../firebase'

export default (socket, newPost) => {
	updatePost(newPost)
		.then(() => socket.emit('autosave_success'))
		.catch(err => socket.emit('autosave_fail', { err }))
}
