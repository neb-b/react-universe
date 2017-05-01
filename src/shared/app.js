import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/home'
import Profile from './pages/profile'

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/profile' component={Profile} />
      <Redirect to='/' />
    </Switch>
    
  )
}

export default App
