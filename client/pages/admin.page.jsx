// @flow

import React from 'react'
import Page from './page'

const Admin = (props: { loggedIn: boolean }) => {
	const { loggedIn } = props
	return (
		<Page>
			<h1>Admin</h1>
		</Page>
	)
}

export default Admin
