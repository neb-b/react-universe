import { createPost } from '../firebase'

export default (req, res) => {
	createPost()
		.then(newPost => {
			res.send({ newPost })
		})
		.catch(err => {
			console.log('err', err)
			res.send(err)
		})
}
