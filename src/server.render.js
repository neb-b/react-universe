import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, redirect } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './shared/app'
import reducer from './shared/redux/reducers'

const isDev = process.env.NODE_ENV === 'dev'
const routes = [
  '/',
  '/profile'
]

export default (req, res) => {
  const store = createStore(reducer)
  const context = {}
  const match = routes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null)

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const preloadedState = store.getState()
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Universal React</title>
      </head>
      <body>
        <div id="root">${html}</div>
        ${
          isDev
          ? `<script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>`
          : ''
        }
        <script src="/public/bundle.js"></script>
      </body>
    </html>`
  )
}
