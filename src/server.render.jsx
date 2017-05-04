import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, redirect } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/routes'
import reducer from './redux/reducers'
import css from './style/main.css'
console.log('css', css)
const isDev = process.env.NODE_ENV === 'deva'
const routes = ['/', '/profile']

export default (req, res) => {
	const store = createStore(reducer)
	const preloadedState = store.getState()
	const context = {}
	const match = routes.reduce(
		(acc, route) => matchPath(req.url, route, { exact: true }) || acc
	)

	const html = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={context}>
				<App />
			</StaticRouter>
		</Provider>
	)

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
        ${isDev ? `
					<script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>` : ''}
        <script src="/public/bundle.js"></script>
      </body>
    </html>
		`
	)
}
