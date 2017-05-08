import { getPublicPosts } from '../firebase'

export default (req, res) => {
	getPublicPosts()
		.then(posts => {
			return res.send(JSON.stringify({ posts }))
		})
		.catch(err => {
			console.log('err', err)
			return res.send(err.message)
		})
}
