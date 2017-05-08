import express from 'express'
import { login, getPublicPosts, createPost } from './handlers'
const Router = express.Router()

Router.post('/login', login)
Router.get('/posts', getPublicPosts)
Router.post('/posts/create', createPost)

export default Router
