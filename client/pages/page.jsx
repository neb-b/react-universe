// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { css, StyleSheet } from 'aphrodite'

const Page = (props: { children?: React$Element<any>, match: Object }) => {
	const { page, header, left, link } = pageStyles
	const { children, match: { path } } = props
	const isHome = path === '/'
	const isAtBlog = path.slice(0, 5) === '/blog'

	return (
		<div>
			<div className={css(header)}>
				{!isHome && <Link to="/" className={css(link)}>Home</Link>}
				{!isAtBlog && <Link to="/blog" className={css(link, left)}>Blog</Link>}
			</div>
			<div className={css(page)}>
				{children}
			</div>
		</div>
	)
}

const pageStyles = StyleSheet.create({
	page: {
		margin: 10,
		'@media (min-width: 800px)': {
			padding: 20
		}
	},
	header: {
		textAlign: 'right',
		paddingTop: 15,
		'@media (max-width: 480px)': {
			backgroundColor: '#373737',
			height: 50
		}
	},
	link: {
		fontSize: '1.2em',
		'@media (max-width: 480px)': {
			height: 50,
			color: 'white'
		}
	},
	left: {
		padding: 10
	}
})

export default Page
