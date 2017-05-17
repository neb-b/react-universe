import express from 'express'
import {
	login,
	getPublicPosts,
	createPost,
	publishPost,
	deletePost
} from './handlers'
import auth from './middleware/auth'
const Router = express.Router()

Router.post('/login', login)
Router.get('/posts', getPublicPosts)
Router.post('/posts/create', auth, createPost)
Router.put('/posts/:id/publish', auth, publishPost)
Router.delete('/posts/:id', auth, deletePost)

export default Router
