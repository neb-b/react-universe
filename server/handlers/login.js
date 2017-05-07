import { login, getAllPosts } from '../firebase'

export default (req, res) => {
	const user = req.body
	login(user)
		.then(token => {
			// set cookie
			res.cookie('auth', token)

			// if valid credentials, getAllPosts
			getAllPosts().then(posts => {
				console.log('gotem', posts)
				return res.send({ posts })
			})
		})
		.catch(err => {
			// not logged in
			console.log('err', err)
			res.sendStatus(400)
		})
}
