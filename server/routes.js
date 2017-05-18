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

// routes for create/delete
// all editing will be done through web socket in index.js
Router.post('/posts/create', auth, createPost)
Router.delete('/posts/:id', auth, deletePost)

export default Router
