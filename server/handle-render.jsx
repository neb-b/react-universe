import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, redirect } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../lib/app'
import reducers from '../lib/redux/reducers'
import css from '../lib/style/main.css'
import { getPosts } from './firebase'

export default (req, res) => {
	const url = req.url
	const pieces = url.split('/')
	const endpoint = pieces[pieces.length - 1]
	const isBlogEndpoint = endpoint === 'blog'

	// not doing anything with this right now
	// may need if using <Redirect />
	const context = {}

	const renderHtml = preloadedState => {
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
		getPosts()
			.then(posts => {
				const preloadedState = { blog: { posts } }
				return renderHtml(preloadedState)
			})
			.catch(err => {
				return res.send(err.message)
			})
	} else {
		renderHtml()
	}
}
