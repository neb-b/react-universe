import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, redirect } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../client/app'
import reducers from '../client/redux/reducers'
import css from '../client/style/main.css'
import { getPublicPosts, getAllPosts, authorize } from './firebase'

export default (req, res) => {
	const url = req.url
	const pieces = url.split('/')
	const endpoint = pieces[pieces.length - 1]
	const isBlogEndpoint = endpoint === 'blog'
	const isAdminEndpoint = endpoint === 'admin'
	const { cookies: { auth: authToken } } = req

	// not doing anything with this right now
	// may need if using <Redirect />
	const context = {}

	const renderHtml = preloadedState => {
		console.log('\n renderhtml', preloadedState)
		const store = createStore(reducers, preloadedState)
		const html = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={context}>
					<App />
				</StaticRouter>
			</Provider>
		)

		const finalState = store.getState()
		res.send(
			`
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
		)
	}

	if (isBlogEndpoint) {
		getPublicPosts()
			.then(posts => {
				const preloadedState = { blog: { posts } }
				return renderHtml(preloadedState)
			})
			.catch(err => {
				return res.send(err.message)
			})
	} else if (isAdminEndpoint && authToken) {
		// get all posts, published and drafts
		// get auth cookie, will be authorized before fetch
		authorize(authToken)
			.then(res => {
				// user is authorized
				getAllPosts()
					.then(posts => {
						const preloadedState = { dashboard: { posts, loggedIn: true } }
						renderHtml(preloadedState)
					})
					.catch(err => {
						// not signed in
						// don't preload state, show login on /admin
						renderHtml()
					})
			})
			.catch(() => {
				// problem with users auth token
				res.cookie('auth', null)
				renderHtml()
			})
	} else {
		renderHtml()
	}
}
