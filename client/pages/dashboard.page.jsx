import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	loadPosts,
	createPost,
	stopEditing,
	editPost,
	publishPost,
	deletePost
} from '../redux/action-creators/dashboard'
import Page from './page'
import AdminDashboard from '../components/dashboard'
import Login from '../components/dashboard/login.connected'

class Admin extends Component {
	componentDidMount() {
		const { initializing } = this.props

		if (initializing) {
			loadPosts()
		}
	}

	render() {
		const { loggedIn, loading } = this.props

		return (
			<Page>
				{!loggedIn && <Login loading={loading} />}
				{loggedIn && <AdminDashboard {...this.props} />}
			</Page>
		)
	}
}

const mapStateToProps = s => ({ ...s.dashboard })

export default connect(mapStateToProps, {
	loadPosts,
	createPost,
	stopEditing,
	editPost,
	publishPost,
	deletePost
})(Admin)
