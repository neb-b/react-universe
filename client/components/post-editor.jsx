import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import _ from 'lodash'
import moment from 'moment'
import { StyleSheet, css } from 'aphrodite'
import ContentEditable from 'react-contenteditable'
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
			justSaved: false,
			body: '',
			title: ''
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

		// const body = document.querySelector('.editable_1893mw')
		// body.addEventListener('keyup', this.throttledAutoSave)
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
		const { post: { id } } = this.props
		// console.log('post', post);
		const { body, title } = this.state

		// if state hasn't changed, don't need to save
		// if (_.isEqual(post, values)) {
		// 	return
		// }

		// title and body are the only values a user could edit to cause autosave to run
		// also need id
		const newValues = { title, body, id }
		console.log(' newvalu', newValues)
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
		this.setState({ err })
	}

	_handlePublish() {
		const { post: { id, published } } = this.props
		const newPostVals = { id, published: !published }
		if (!published) {
			newPostVals.datePublished = new Date().toISOString()
		}
		this.editPost(newPostVals)
	}

	_handleContentChange(e) {
		this.setState({ body: e.target.value })
		this.throttledAutoSave()
	}

	_handleTitleChange(e) {
		this.setState({ title: e.target.value })
		this.throttledAutoSave()
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
		// console.log('this.state', this.state);

		return (
			<div>
				{this.state.error && <div>{error}</div>}

				<div className={css(styles.postWrapper)}>
					<div className={css(styles.postActions)}>
						<Button
							fakeLink
							semiBold
							onClick={() => {
								stopEditing()
								history.push('/admin')
							}}
						>
							Back to list of posts
						</Button>
						<Button fakeLink semiBold onClick={this._handlePublish.bind(this)}>
							{published ? 'Unpublish post' : 'Publish post'}
						</Button>
						<Button fakeLink semiBold onClick={() => deletePost(id)}>
							Delete post
						</Button>
					</div>
					<div className={css(styles.postContent)}>
						<h1>Title</h1>
					</div>
				</div>
			</div>
		)
	}
}

const styles = StyleSheet.create({
	postWrapper: {
		display: 'flex',
		'@media (max-width: 480px)': {
			flexDirection: 'column'
		}
	},
	postActions: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: '0.9em',
		'@media (max-width: 480px)': {
			flexDirection: 'row'
		}
	},
	postContent: {
		maxWidth: 600,
		'@media (min-width: 480px)': {
			paddingLeft: 20
		}
	},
	saved: {
		height: 15
	},
	postInfo: {
		paddingTop: 10
	},
	editableTitle: {
		outline: 'none',
		borderBottom: '1px solid black'
	},
	editableBody: {
		outline: 'none',
		minHeight: 500,
		paddingTop: 10
	},
	'[contenteditable=true]:empty:before': {
		content: 'ENter a title'
	}
})

// Using redux form just to handle the input actions
// // Submit won't submit the form, but emit a socket message
// const PostEditorForm = reduxForm({
// 	form: 'postEditor',
// 	enableReinitialize: true
// })(PostEditor)

export default PostEditor
