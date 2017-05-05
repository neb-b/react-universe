import express from 'express'
import { getPosts } from './firebase'
const Router = express.Router()

const fetchBlogPosts = (req, res) => {
	getPosts()
		.then(posts => {
			return res.send(JSON.stringify({ posts }))
		})
		.catch(err => {
			return res.send(err.message)
		})
}

Router.get('/posts', fetchBlogPosts)

export default Router
