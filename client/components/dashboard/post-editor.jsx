import React, { Component } from 'react'
import Button from '../common/button'
import moment from 'moment'

class NewPostEditor extends Component {
	//TODO
	// move datePublished logic out of component

	render() {
		const {
			stopEditing,
			updatePost,
			deletePost,
			activeEditPost = {}
		} = this.props
		const { dateCreated, title, body, id, published } = activeEditPost
		return (
			<div>
				<div>
					<Button
						onClick={() =>
							updatePost(
								Object.assign({}, activeEditPost, {
									published: !published,
									datePublished: new Date().toISOString()
								})
							)}
					>
						{published ? 'un publish' : 'publish'}
					</Button>
					<Button onClick={() => deletePost(id)}>Delete</Button>
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
