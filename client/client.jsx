import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app'
import reducers from './redux/reducers'

// Not sure about adding async css
// I think my styles will be small enough to send with html
// import css from './style/async.css'

const loggerMiddleware = createLogger()
const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

console.log('preloadedState', preloadedState)

const reduxMiddleware = __DEV__
	? applyMiddleware(thunkMiddleware, loggerMiddleware)
	: applyMiddleware(thunkMiddleware)

const store = createStore(
	reducers,
	preloadedState,
	reduxMiddleware
)

render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
)
