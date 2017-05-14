import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import _ from 'lodash'
import moment from 'moment'
import Button from '../common/button'
import Title from './post-editor/title'
import Body from './post-editor/body'

class PostEditor extends Component {
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
		this.socket = null
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
			post,
			post: { dateCreated, title, body, id, published }
		} = this.props
		console.log('initial values', post)
		return (
			<div>
				<div>
					<Button
						onClick={() =>
							// TODO:
							// move this logic out of component
							updatePost(
								Object.assign({}, post, {
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
				<form className="post-form">
					<Field name="title" component={Title} />
					<p>Created on {moment(dateCreated).format() || ''}</p>
					<Field name="body" component={Body} />
				</form>
			</div>
		)
	}
}

const mapStateToProps = s => ({
	post: s.post,
	initialValues: { ...s.post }
})

// Using redux form just to handle the input actions
// I won't have a submit button, autosave will take care of that
const PostEditorForm = reduxForm({
	form: 'postEditor',
	enableReinitialize: true
})(PostEditor)

export default connect(mapStateToProps, null)(PostEditorForm)
