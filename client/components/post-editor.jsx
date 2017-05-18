import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import _ from 'lodash'
import moment from 'moment'
import Button from './common/button'
import Title from './post-editor/title'
import Body from './post-editor/body'
import formatDate from '../helpers/date'

class PostEditor extends Component {
	constructor() {
		super()

		this.state = {
			socketConnected: false,
			saving: false,
			justSaved: false
		}

		this.throttledAutoSave = _.debounce(this.autoSave, 2000)
		this.justSavedTimeout = null
		this.socket = io('http://localhost:3000')
	}

	componentDidMount() {
		// setup socket connection with server
		// listen for keystrokes and autosave when user starts typing
		this.socket.on('connected', () => {
			this.setState({ socketConnected: true })
		})

		this.socket.on('autosave_success', this._handleAutoSaveSucces.bind(this))
		this.socket.on('autosave_error', this._handleAutoSaveError.bind(this))

		const inputs = document.querySelectorAll('.post--input')
		inputs.forEach(node =>
			node.addEventListener('keyup', this._handleKeyUp.bind(this))
		)
	}

	componentWillUnmount() {
		// destroy socket connection
		this.socket = null
		clearTimeout(this.justSavedTimeout)
	}

	_handleKeyUp() {
		this.throttledAutoSave()
	}

	editPost(newPostValues) {
		this.setState({ saving: true, lastSaved: newPostValues })
		this.socket.emit('editPost', newPostValues)
	}

	autoSave() {
		// will run if user stops typing for 2 seconds or form onBlur
		// socket.emit with new post data
		const {
			postEditorForm: { values, values: { title, body, id } }
		} = this.props

		// if state hasn't changed, don't need to save
		if (this.state.lastSaved) {
			const sameTitle = _.isEqual(this.state.lastSaved.title, title)
			const sameBody = _.isEqual(this.state.lastSaved.body, body)
			if (sameTitle && sameBody) return
		}

		// title and body are the only values a user could edit to cause autosave to run
		// also need id
		const newValues = { title, body, id }
		this.editPost(newValues)
	}

	// the backend is saved, just update store with new post
	_handleAutoSaveSucces(savedPost) {
		const { updateStoreAfterAutoSave } = this.props
		updateStoreAfterAutoSave(savedPost)

		this.setState({ saving: false, justSaved: true })
		this.justSavedTimeout = setTimeout(() => {
			this.setState({ justSaved: false })
		}, 1500)
	}

	_handleAutoSaveError(err) {
		console.log('autosave error!', err)
	}

	_handlePublish() {
		const { post: { id, published } } = this.props
		const newPostVals = { id, published: !published }
		if (!published) {
			newPostVals.datePublished = new Date().toISOString()
		}
		this.editPost(newPostVals)
	}

	render() {
		const {
			stopEditing,
			publishPost,
			deletePost,
			post,
			post: { dateCreated, title, body, id, published, lastEdited },
			history
		} = this.props

		return (
			<div>
				<div>
					<Button onClick={this._handlePublish.bind(this)}>
						{published ? 'un publish' : 'publish'}
					</Button>
					<Button onClick={() => deletePost(id)}>Delete</Button>
					<Button
						onClick={() => {
							stopEditing()
							history.push('/admin')
						}}
					>
						Back to posts
					</Button>
				</div>
				<div>
					{this.state.justSaved && <p>Saved</p>}
					<p>Created on {formatDate(dateCreated)}</p>
					{lastEdited && <p>Last edited: {formatDate(lastEdited)}</p>}
				</div>
				<form className="post-form" onSubmit={e => e.preventDefault()}>
					<Field
						name="title"
						component={Title}
						save={this.autoSave.bind(this)}
					/>
					<Field name="body" component={Body} save={this.autoSave.bind(this)} />
				</form>
			</div>
		)
	}
}

// Using redux form just to handle the input actions
// Submit won't submit the form, but emit a socket message
const PostEditorForm = reduxForm({
	form: 'postEditor',
	enableReinitialize: true
})(PostEditor)

export default PostEditorForm
