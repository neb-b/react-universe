import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app'
import reducers from './redux/reducers'

// Not sure about this
// styles will be fetched after first render
// I think my styles will be small enough to send with html
// import css from './style/async.css'

const loggerMiddleware = createLogger()
const preloadedState = window.__PRELOADED_STATE__
console.log('preloadedState', preloadedState)
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__



const store = createStore(
	reducers,
	preloadedState,
	applyMiddleware(
		thunkMiddleware, // lets us dispatch() functions
		loggerMiddleware // neat middleware that logs actions
	)
)

render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
)
