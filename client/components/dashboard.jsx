import React from 'react'
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
	return (
		<div className="dashboard-wrapper">
			{justDeleted && <div>Post deleted</div>}
			{!isEditing && <Button onClick={createPost}>Create new post</Button>}
			<div className="dashboard-content">
				{!isEditing &&
					<div>
						{posts.map(
							(post: { title: string, dateCreated: string }, index) => {
								const { title, dateCreated, lastEdited } = post
								return (
									<div key={index} onClick={() => editPost(post)}>
										<h2>{title || 'untitled'}</h2>
										{lastEdited &&
											<div>{`Last edited ${formatDate(lastEdited)}`}</div>}
										<div>{`Created on ${formatDate(dateCreated)}`}</div>
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

export default Dashboard
