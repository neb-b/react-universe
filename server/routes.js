import express from 'express'
import { login, getPublicPosts, createPost, publishPost } from './handlers'
const Router = express.Router()

Router.post('/login', login)
Router.get('/posts', getPublicPosts)
Router.post('/posts/create', createPost)
Router.put('/posts/:id/publish', publishPost)

export default Router
