import { updatePost } from '../firebase'

export default (req, res) => {
	const id = req.params.id
	const post = req.body.post
	updatePost(post)
		.then(newPost => {
			console.log('response', newPost)
			res.send({ newPost })
		})
		.catch(err => {
			console.log('err', err)
			res.send(err)
		})
}
