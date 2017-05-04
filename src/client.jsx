import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/routes'

// Not sure about this
// I think my styles will be small enough to include in initial render
// Will keep an eye on it
import css from './style/async.css'

render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
)
