import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/home'
import Blog from './pages/blog'

const App = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/blog" component={Blog} />
			<Redirect to="/" />
		</Switch>
	)
}

export default App
