import { authorize, createPost } from '../firebase'

export default (req, res) => {
	const { cookies: { auth: authToken } } = req
	if (!authToken) {
		return res.redirect('http://localhost:3000')
	}

	authorize(authToken)
		.then(createPost)
		.then(newPost => {
			console.log('response', newPost)
			res.send({ newPost })
		})
		.catch(err => {
			console.log('err', err)
			res.send(err)
		})
}
