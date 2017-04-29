import express from 'express'
import colors from 'colors'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './app/redux/reducers'
import App from './app'
const app = express()
const PORT = process.env.port || 3000

app.use('/static', express.static('static'));
app.use('/', handleRender)

function handleRender(req, res) {
  const store = createStore(reducer)
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState))
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
      ${
        process.env.NODE_ENV === 'dev' ? `
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        ` : ''
      }
    </body>
  </html>
  `
}

app.listen(PORT, () => console.log(`\nRunning on port ${PORT}`.magenta))
