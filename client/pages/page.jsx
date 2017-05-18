// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { css, StyleSheet } from 'aphrodite'

const Page = (props: { children?: React$Element<any> }) => {
	const { children } = props
	const { page, header } = pageStyles
	return (
		<div className={css(page)}>
			<div className={css(header)}>
				<Link to="/">Home</Link>
				<Link to="/blog">Blog</Link>
			</div>

			{children}
		</div>
	)
}

const pageStyles = StyleSheet.create({
	page: {
		margin: 10
	},
	medium: {
		margin: 20
	}
})

export default Page
