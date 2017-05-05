import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './routes'
import reducers from './redux/reducers'

// Not sure about this
// styles will be fetched after first render
// I think my styles will be small enough to send with html
// import css from './style/async.css'

const preloadedState = window.__PRELOADED_STATE__
console.log('preloadedState', preloadedState)
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const store = createStore(reducers, preloadedState)
render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
)
