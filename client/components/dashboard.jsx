// @flow

import React from 'react'
import Login from './dashboard/login.connected'

const Dashboard = (props: { loggedIn: boolean }) => {
  const { loggedIn } = props
  return (
    <div>
      {!loggedIn && <Login />}
      {loggedIn && <h1>Dashboard</h1>}
    </div>
  )
}

export default Dashboard
