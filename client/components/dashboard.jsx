import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import moment from 'moment'
import PostEditor from './dashboard/post-editor.connected'
import Button from './common/button'
const formatDate = dateStr => moment(dateStr).format('ddd MM/YY')

const Dashboard = (props: { posts: Array<Object> }) => {
	const {
		posts,
		viewingPosts,
		viewPosts,
		createPost,
		isEditing,
		stopEditing,
		editPost,
		updatePost,
		deletePost,
		justDeleted
	} = props
	console.log('posts', posts)
	return (
		<div className="dashboard-wrapper">
			{justDeleted && <div>Post deleted</div>}
			{!isEditing && <Button onClick={createPost}>Create new post</Button>}
			<div className="dashboard-content">
				{!isEditing &&
					<div>
						{posts.map(
							(post: { title: string, dateCreated: string }, index) => {
								const { title, dateCreated, lastEdited, published } = post
								return (
									<div
										key={index}
										onClick={() => editPost(post)}
										className={css(styles.post)}
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
				{isEditing &&
					<PostEditor
						stopEditing={stopEditing}
						updatePost={updatePost}
						deletePost={deletePost}
					/>}
			</div>
		</div>
	)
}

const styles = StyleSheet.create({
	post: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: 20
	}
})

export default Dashboard
