// @flow

import React from 'react'

const Blog = (props: { posts: Array<Object>  }) => {
  const { posts } = props
  return (
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
  )
}

export default Blog
