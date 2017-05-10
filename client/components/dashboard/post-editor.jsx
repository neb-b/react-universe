import React, { Component } from 'react'
import Button from '../common/button'
import moment from 'moment'

class NewPostEditor extends Component {
	render() {
		const { stopEditing, publish, activeEditPost = {} } = this.props
		const { dateCreated, title, body, id } = activeEditPost
		return (
			<div>
				<div>
					<Button onClick={() => publish(id)}>Publish</Button>
					<Button onClick={stopEditing}>Back to posts</Button>
				</div>
				<div>
					<h1>{title || 'untitled'}</h1>
					<h2>Created on {moment(dateCreated).format() || ''}</h2>

				</div>
				<div>
					{body || 'start typing here...'}
				</div>
			</div>
		)
	}
}

export default NewPostEditor
