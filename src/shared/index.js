import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import Profile from './pages/profile'

const App = ({test}) => {
  return (
    <Switch>
      <Route path='/profile' component={Profile} />
      <Route component={Home} />
    </Switch>
  )
}

export default App
