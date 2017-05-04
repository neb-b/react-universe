// @flow

import React from 'react'
import Page from './page'
import { AdminDashboard, AdminLogin } from '../admin'

const Admin = (props: { loggedIn: boolean }) => {
	const { loggedIn } = props
	return (
		<Page>
			<h1>Admin</h1>
			{loggedIn && <AdminDashboard />}
			{!loggedIn && <AdminLogin />}
		</Page>
	)
}

export default Admin
