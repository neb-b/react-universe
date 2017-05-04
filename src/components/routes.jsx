// @flow

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/home'
import Blog from './pages/blog'
import Admin from './pages/admin'

const App = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/blog" component={Blog} />
			<Route path="/admin" component={Admin} />
			<Redirect to="/" />
		</Switch>
	)
}

export default App
