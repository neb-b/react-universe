import express from 'express'
const Router = express.Router()

const getPosts = (req, res) => {
	const db = req.firebase
	const ref = db.ref('posts')

	ref.on(
		'value',
		function(snapshot) {
			const posts = snapshot.val()
			res.send({ posts })
		},
		function(errorObject) {
			console.log('The read failed: ' + errorObject.code)
			res.send(errorObject)
		}
	)
}

Router.get('/posts', getPosts)

export default Router
