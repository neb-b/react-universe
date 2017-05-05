import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, redirect } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../lib/routes'
import reducers from '../lib/redux/reducers'
import css from '../lib/style/main.css'
import { getPosts } from './firebase'
const isDev = process.env.NODE_ENV === 'dev'

export default (req, res) => {
	const url = req.url
	const urlPieces = url.split('/')
	const endpoint = urlPieces[urlPieces.length - 1]

	const renderHtml = preloadedState => {
		const context = {}
		const store = createStore(reducers, preloadedState)
		const html = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={context}>
					<App />
				</StaticRouter>
			</Provider>
		)
		const finalState = store.getState()
		return res.send(
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

	if (endpoint === 'blog') {
		getPosts().then(posts => {
			const preloadedState = { blog: { posts } }
			renderHtml(preloadedState)
		})
	} else {
		renderHtml()
	}
}
