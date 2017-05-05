// @flow

import React from 'react'

const Blog = (props: { posts: Array<Object>  }) => {
  const { posts } = props

  return (
    <div>
      {posts.map((post: { title: string, dateCreated: string }, index) => {
        const { title, dateCreated } = post
        return (
          <div key={index}>
            <h2>{title}</h2>
            <span>{dateCreated}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Blog
