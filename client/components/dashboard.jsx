import React from 'react'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import moment from 'moment'
import Button from './common/button'
import formatDate from '../helpers/date'

const Dashboard = (props: { posts: Array<Object> }) => {
	const {
		posts,
		viewingPosts,
		viewPosts,
		createPost,
		isEditing,
		stopEditing,
		editPost,
		publishPost,
		deletePost,
		justDeleted,
		history
	} = props

	return (
		<div className="dashboard-wrapper">
			{justDeleted && <div>Post deleted</div>}
			{!isEditing && <Button onClick={createPost}>Create new post</Button>}
			<div className="dashboard-content">
				{!isEditing &&
					<div>
						{posts.map(
							(post: { title: string, dateCreated: string }, index) => {
								const { title, dateCreated, lastEdited, published, id } = post
								return (
									<div
										key={index}
										className={css(styles.post)}
										onClick={() => {
											editPost(post)
											history.push(`/admin/edit/${id}`)
										}}
									>
										<div style={{ width: 100, paddingTop: 5 }}>
											{published ? 'published' : 'draft'}
										</div>
										<div>
											<h2 style={{ margin: 0 }}>{title || 'untitled'}</h2>
											{lastEdited &&
												<div>{`Last edited ${formatDate(lastEdited)}`}</div>}
											<div>{`Created on ${formatDate(dateCreated)}`}</div>
										</div>
									</div>
								)
							}
						)}
					</div>}
			</div>
		</div>
	)
}

const styles = StyleSheet.create({
	post: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: 20,
		cursor: 'pointer'
	}
})

export default Dashboard
