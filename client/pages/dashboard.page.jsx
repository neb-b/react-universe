// @flow

import React from 'react'
import { connect } from 'react-redux'
import Page from './page'
import AdminDashboard from '../components/dashboard'
import Login from '../components/dashboard/login.connected'

const Admin = (props: { loggedIn: boolean, posts: Array<Object>, loading: boolean  }) => {
	const { loggedIn, posts, loading } = props
	return (
		<Page>
			{loading && <div>Loading...</div>}
			{!loggedIn && <Login />}
			{loggedIn && <AdminDashboard posts={posts} />}
		</Page>
	)
}

const mapStateToProps = (s) => ({ ...s.dashboard })

export default connect(mapStateToProps, null)(Admin)
