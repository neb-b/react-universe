import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import _ from 'lodash'
import moment from 'moment'
import { updateStoreAfterAutoSave } from '../../redux/action-creators/dashboard'
import Button from '../common/button'
import Title from './post-editor/title'
import Body from './post-editor/body'

class PostEditor extends Component {
	constructor() {
		super()

		this.state = {
			socketConnected: false,
			saving: false,
			justSaved: false
		}

		this.socket = io('http://localhost:3000')
		this.throttledAutoSave = _.debounce(this.autoSave, 2000)
		this.justSavedTimeout = null
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

	autoSave() {
		// will run if user stops typing for 2 seconds or form onBlur
		// socket.emit with new post data
		const {
			postEditorForm: { values, values: { title, body, id } }
		} = this.props

		// if state hasn't changed, don't need to save
		if (_.isEqual(this.state.lastSaved, values)) return

		// title and body are the only values a user could edit to cause autosave to run
		const newValues = { title, body, id }
		this.socket.emit('editPost', newValues)
		this.setState({ saving: true, lastSaved: values })
	}

	_handleAutoSaveSucces() {
		const { updateStoreAfterAutoSave, postEditorForm: { values } } = this.props

		// don't want to just call updatePost
		// the backend is saved, just update store with form values
		updateStoreAfterAutoSave(values)

		this.setState({ saving: false, justSaved: true })
		this.justSavedTimeout = setTimeout(() => {
			this.setState({ justSaved: false })
		}, 2000)
	}

	_handleAutoSaveError(err) {
		console.log('autosave error!', err)
	}

	render() {
		const {
			stopEditing,
			updatePost,
			deletePost,
			post,
			post: { dateCreated, title, body, id, published, lastEdited }
		} = this.props

		return (
			<div>
				<div>
					<Button
						onClick={() =>
							// TODO:
							// move this logic out of component
							updatePost({
								published: !published,
								datePublished: new Date().toISOString()
							})}
					>
						{published ? 'un publish' : 'publish'}
					</Button>
					<Button onClick={() => deletePost(id)}>Delete</Button>
					<Button onClick={stopEditing}>Back to posts</Button>
				</div>
				<div>
					{this.state.justSaved && <p>Saved</p>}
					<p>Created on {moment(dateCreated).format() || ''}</p>
					{lastEdited && <p>Last edited: {moment(lastEdited).format()}</p>}
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

const mapStateToProps = s => ({
	post: s.post,
	// so redux form can pull values automatically
	initialValues: { ...s.post },
	postEditorForm: s.form.postEditor
})

// Using redux form just to handle the input actions
// Submit won't submit the form, but emit a socket message
const PostEditorForm = reduxForm({
	form: 'postEditor',
	enableReinitialize: true
})(PostEditor)

export default connect(mapStateToProps, { updateStoreAfterAutoSave })(
	PostEditorForm
)
