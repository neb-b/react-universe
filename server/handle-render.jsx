import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, redirect } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheetServer } from 'aphrodite'
import App from '../client/app'
import reducers from '../client/redux/reducers'
import { getPublicPosts, getDashboard, getPost, authorize } from './firebase'

const createHtml = (url, preloadedState, res) => {
	const store = createStore(reducers, preloadedState)
	const context = {}

	const { html, css } = StyleSheetServer.renderStatic(() =>
		renderToString(
			<Provider store={store}>
				<StaticRouter location={url} context={context}>
					<App />
				</StaticRouter>
			</Provider>
		)
	)

	if (context.url) {
		res.redirect(301, context.url)
	}

	const finalState = store.getState()
	return `
		<!doctype html>
		<html>
			<head>
				<title>React Universe</title>
				<style>${css.content}</style>
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

	// pieces[0] is empty string
	// ex: /admin/edit/12345
	// ['', 'admin', 'edit', '12345']
	const endpoint = pieces[1]
	const isEditing = pieces[2] === 'edit'
	const editingId = pieces[3]
	const isBlogEndpoint = endpoint === 'blog'
	const isAdminEndpoint = endpoint === 'admin'
	const { cookies: { auth: authToken } } = req

	const sendHtml = reduxState => {
		const html = createHtml(url, reduxState, res)
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
		// if editing, find active post and set that in preloaded state
		// get auth cookie, will be authorized before fetch
		authorize(authToken)
			.then(getDashboard)
			.then(savedDashboard => {
				let activePost
				if (editingId) {
					savedDashboard.posts.some(post => {
						if (post.id === editingId) {
							activePost = post
							return true
						}

						return false
					})
				}

				const preloadedState = {
					dashboard: { ...savedDashboard, loggedIn: true },
					post: activePost
				}
				return sendHtml(preloadedState)
			})
			.catch(err => {
				// problem with users auth token
				res.cookie('auth', '')
				res.redirect('/admin')
			})
	} else {
		sendHtml()
	}
}
