import express from 'express'
import { login, getPublicPosts, createPost, updatePost } from './handlers'
import auth from './middleware/auth'
const Router = express.Router()

Router.post('/login', login)
Router.get('/posts', getPublicPosts)
Router.post('/posts/create', auth, createPost)
Router.put('/posts/:id/update', auth, updatePost)

export default Router
