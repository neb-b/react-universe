// @flow

import React from 'react'
import { connect } from 'react-redux'
import { viewPosts, createPost, stopEditing } from '../redux/action-creators/dashboard'
import Page from './page'
import AdminDashboard from '../components/dashboard'
import Login from '../components/dashboard/login.connected'

const Admin = (props: { loggedIn: boolean, loading: boolean  }) => {
	const { loggedIn, loading } = props
	return (
		<Page>
			{!loggedIn && <Login loading={loading} />}
			{loggedIn && <AdminDashboard {...props} />}
		</Page>
	)
}

const mapStateToProps = (s) => ({ ...s.dashboard })

export default connect(mapStateToProps, { viewPosts, createPost, stopEditing })(Admin)
