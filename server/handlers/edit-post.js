import { updatePost } from '../firebase'

export default (socket, post) => {
	updatePost(post)
		.then(savedPost => socket.emit('autosave_success', savedPost))
		.catch(err => socket.emit('autosave_fail', { err }))
}
