

import React from 'react'
import Navigation from './dashboard/navigation'
import PostEditor from './dashboard/post-editor'

const Dashboard = (props: { posts: Array<Object> }) => {
  const {
    posts,
    viewingPosts,
    viewPosts,
    createPost,
    isEditing,
    stopEditing
  } = props
  return (
    <div className="dashboard-wrapper">
      <Navigation viewPosts={viewPosts} createPost={createPost} />
      <div className="dashboard-content">
        {!isEditing && (
          <div>
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
        {isEditing && (
          <PostEditor stopEditing={stopEditing} />
        )}
      </div>
    </div>

  )
}

export default Dashboard
