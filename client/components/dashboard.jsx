// @flow

import React from 'react'

const Dashboard = (props: { posts: Array<Object> }) => {
  const { posts } = props
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Posts</h2>
          {posts.map((post: { title: string, text: string }, index) => {
            const { title, text } = post
            return (
              <div key={index}>
                <h2>{title}</h2>
                <span>{text}</span>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Dashboard
