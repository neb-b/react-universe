import React from 'react'

const Navigation = ({ viewPosts, viewAnalytics }) => {
  return (
    <div>
      <button onClick={viewAnalytics}>View analytics</button>
      <button onClick={viewPosts}>View posts</button>
    </div>
  )
}

export default Navigation
