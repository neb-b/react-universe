import React from 'react'
import Button from '../common/button'

const Navigation = ({ viewPosts, createPost }) => {
  return (
    <div>
      <Button onClick={createPost}>Create new post</Button>
    </div>
  )
}

export default Navigation
