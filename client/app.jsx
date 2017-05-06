// @flow

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/home.page'
import Blog from './pages/blog.page'
import Dashboard from './pages/dashboard.page'

const App = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/blog" component={Blog} />
			<Route path="/admin" component={Dashboard} />
			<Redirect to="/" />
		</Switch>
	)
}

export default App
