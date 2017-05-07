import express from 'express'
import { login, getPublicPosts } from './handlers'
const Router = express.Router()

Router.post('/login', login)
Router.get('/posts', getPublicPosts)

export default Router
