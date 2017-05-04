// @flow

import React from 'react'
import { Link } from 'react-router-dom'

const Page = (props: { children?: React$Element<any> }) => {
	const { children } = props

	return (
		<div className="page-container">
			<div>
				<Link to="/">Home</Link>
				<Link to="/blog">Blog</Link>
			</div>

			{children}
		</div>
	)
}

export default Page
