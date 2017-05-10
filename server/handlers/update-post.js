import { authorize, updatePost } from '../firebase'

export default (req, res) => {
	const id = req.params.id
	const post = req.body.post
	const { cookies: { auth: authToken } } = req
	if (!authToken) {
		return res.redirect('http://localhost:3000')
	}

	authorize(authToken)
		.then(() => updatePost(post))
		.then(newPost => {
			console.log('response', newPost)
			res.send({ newPost })
		})
		.catch(err => {
			console.log('err', err)
			res.send(err)
		})
}
