// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	updateStoreAfterAutoSave,
	stopEditing
} from '../redux/action-creators/dashboard'
import Page from './page'
import PostEditor from '../components/post-editor'

class PostEditorPage extends Component {
	render() {
		const { match } = this.props
		return (
			<Page match={match}>
				<PostEditor {...this.props} />
			</Page>
		)
	}
}

const mapStateToProps = s => ({
	post: s.post,
	// so redux form can pull values automatically
	initialValues: { ...s.post },
	postEditorForm: s.form.postEditor
})

export default connect(mapStateToProps, {
	updateStoreAfterAutoSave,
	stopEditing
})(PostEditorPage)
