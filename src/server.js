import express from 'express'
import morgan from 'morgan'
import React from 'react'
import { StaticRouter, matchPath } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './shared/redux/reducers'
import App from './shared'
const app = express()
const PORT = process.env.port || 3000

app.use(morgan('dev'))
app.use('/client', express.static('client'));
app.get('*', handleRender)

const routes = [
  '/',
  '/profile'
]

function handleRender(req, res) {
  const store = createStore(reducer)
  let context = {}

  const match = routes.reduce((acc, route) => {
    // console.log('acc', acc);
    // console.log('route', route);
    matchPath(req.url, route, { exact: true }) || acc, null;
  })

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const preloadedState = store.getState()

  if (context.url) {
    console.log('redirect');
  // Somewhere a `<Redirect>` was rendered
  res.redirect(301, context.url)
} else {
  // we're good, send the response
  res.send(renderFullPage(html, preloadedState))
}
}

function renderFullPage(html, preloadedState) {
  return `
  <!doctype html>
  <html>
    <head>
      <title>Universal React</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="/client/bundle.js"></script>
    </body>
  </html>
  `
}

app.listen(PORT, () => console.log(`\nRunning on port ${PORT}`))
