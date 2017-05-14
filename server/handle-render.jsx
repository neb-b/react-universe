import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, redirect } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../client/app'
import reducers from '../client/redux/reducers'
import css from '../client/style/main.css'
import { getPublicPosts, getDashboard, authorize } from './firebase'

const createHtml = (url, preloadedState) => {
	const store = createStore(reducers, preloadedState)
	const html = renderToString(
		<Provider store={store}>
			<StaticRouter location={url} context={{}}>
				<App />
			</StaticRouter>
		</Provider>
	)

	const finalState = store.getState()
	return `
		<!doctype html>
		<html>
			<head>
				<title>React Universe</title>
				<style>${css.toString()}</style>
			</head>
			<body>
				<div id="root" class="container">${html}</div>
				<script>
						window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(/</g, '\\u003c')}
				</script>
				<script src="/public/bundle.js"></script>
			</body>
		</html>
	`
}

export default function handleRender(req, res) {
	const url = req.url
	const pieces = url.split('/')
	// TODO
	// this is ugly
	const endpoint = pieces[pieces.length - 1]
	const isBlogEndpoint = endpoint === 'blog'
	const isAdminEndpoint = endpoint === 'admin'
	const { cookies: { auth: authToken } } = req

	const sendHtml = reduxState => {
		const html = createHtml(url, reduxState)
		res.send(html)
	}

	// fetch data serverside if /blog or /admin
	if (isBlogEndpoint) {
		getPublicPosts()
			.then(posts => {
				const preloadedState = { blog: { posts } }
				return sendHtml(preloadedState)
			})
			.catch(err => {
				return res.send(err.message)
			})
	} else if (isAdminEndpoint && authToken) {
		// get all posts, published and drafts
		// get auth cookie, will be authorized before fetch
		authorize(authToken)
			.then(getDashboard)
			.then(posts => {
				const preloadedState = {
					dashboard: { posts, loggedIn: true }
				}
				return sendHtml(preloadedState)
			})
			.catch(err => {
				// problem with users auth token
				res.cookie('auth', null)
				sendHtml()
			})
	} else {
		sendHtml()
	}
}
