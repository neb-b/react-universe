import React, { Component } from 'react'
import io from 'socket.io-client'
import _ from 'lodash'
import Button from '../common/button'
import moment from 'moment'

class NewPostEditor extends Component {
	constructor() {
		super()

		this.state = {
			socketConnected: false
		}

		this.socket = io('http://localhost:3000')
	}
	componentDidMount() {
		// setup socket connection with server
		// listen for keystrokes and autosave when user starts typing
		this.socket.on('connected', () => {
			this.setState({ socketConnected: true })
		})

		window.addEventListener('keyup', this._keyUpHanlder.bind(this))
	}

	componentWillUnmount() {
		// destroy socket connection
	}

	autoSave() {
		// will run if user stops typing for 3 seconds
		// socket.emit with new text
		// eventually will only emit last change

		// const { post: { text, title } } = this.props
		const { post } = this.props
		this.socket.emit('editPost', post)
	}

	_keyUpHanlder() {
		const debounced = _.debounce(this.autoSave.bind(this), 3000)
		debounced()
	}

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
