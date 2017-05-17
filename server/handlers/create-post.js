import { createPost } from '../firebase'

export default (req, res) => {
	const { date } = req.body
	createPost(date)
		.then(newPost => {
			res.send({ newPost })
		})
		.catch(err => {
			console.log('err', err)
			res.send(err)
		})
}
