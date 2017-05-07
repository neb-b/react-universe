import { login, getDashboard } from '../firebase'

export default (req, res) => {
	const user = req.body
	login(user)
		.then(token => {
			// set cookie
			res.cookie('auth', token)

			// if valid credentials, getDashboard
			getDashboard().then(posts => {
				return res.send({ posts })
			})
		})
		.catch(err => {
			// not logged in
			res.send({ err }).status(400)
		})
}
