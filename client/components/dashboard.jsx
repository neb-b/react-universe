// @flow

import React from 'react'
import Navigation from './dashboard/navigation'

const Dashboard = (props: { posts: Array<Object> }) => {
  const { posts, viewingPosts, currentlyEditing, viewPosts, viewingAnalytics, viewAnalytics } = props
  return (
    <div>
      <h1>Dashboard</h1>
      <Navigation viewPosts={viewPosts} viewAnalytics={viewAnalytics} />
      <div>
        {viewingPosts && (
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
        )}
        {currentlyEditing && (
          <div>editing a post</div>
        )}
        {!viewingPosts && !currentlyEditing && (
          <div>Home view in dashboard. Not sure what analytics I'll have yet...</div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
