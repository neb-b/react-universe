// @flow

import React from 'react'

const Blog = (props: { posts: Array<Object> }) => {
	const { posts } = props
	return (
		<div>
			{posts.map((post: { title: string, datePublished: string }, index) => {
				const { title, datePublished } = post
				return (
					<div key={index}>
						<h2>{title || 'untitiled'}</h2>
						<span>Published: {datePublished}</span>
					</div>
				)
			})}
		</div>
	)
}

export default Blog
