// @flow

import React from 'react'
import Page from './page'
import AdminDashboard from '../components/dashboard'

const Admin = (props: { loggedIn: boolean }) => {
	const { loggedIn } = props
	return (
		<Page>
			<AdminDashboard loggedIn={loggedIn} />
		</Page>
	)
}

export default Admin
