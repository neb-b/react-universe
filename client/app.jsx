// @flow

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { css } from 'aphrodite'
import Home from './pages/home.page'
import Blog from './pages/blog.page'
import Dashboard from './pages/dashboard.page'

// base style
import baseStyle from './styles/app.style.js'

const App = () => {
	return (
		<div className={css(baseStyle.app)}>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/blog" component={Blog} />
				<Route path="/admin" component={Dashboard} />
				<Redirect to="/" />
			</Switch>
		</div>
	)
}

export default App
