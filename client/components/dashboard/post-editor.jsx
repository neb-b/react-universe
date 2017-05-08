import React, { Component } from 'react'
import Button from '../common/button'

class NewPostEditor extends Component {
  constructor() {
    super()

    this.state = {
      title: "",
      body: ""
    }
  }

  render() {
    const { title, body} = this.state
    const { stopEditing } = this.props
    return (
      <div>
        <div>
          <Button>Publish</Button>
          <Button onClick={stopEditing}>Back to posts</Button>
        </div>
        {title || 'Enter a title'}
        {body || 'start typing'}
      </div>
    )
  }
}

export default NewPostEditor
