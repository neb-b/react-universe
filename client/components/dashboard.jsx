import React from 'react'
import moment from 'moment'
import PostEditor from './dashboard/post-editor'
import Button from './common/button'

const Dashboard = (props: { posts: Array<Object> }) => {
	const {
		posts,
		viewingPosts,
		viewPosts,
		createPost,
		isEditing,
		stopEditing,
		editPost,
		activeEditPost,
		updatePost
	} = props
	return (
		<div className="dashboard-wrapper">
			{!isEditing && <Button onClick={createPost}>Create new post</Button>}
			<div className="dashboard-content">
				{!isEditing &&
					<div>
						{posts.map(
							(post: { title: string, dateCreated: string }, index) => {
								const { title, dateCreated } = post
								return (
									<div key={index} onClick={() => editPost(post)}>
										<h2>{title || 'untitled'}</h2>
										<span>{moment(dateCreated).format()}</span>
									</div>
								)
							}
						)}
					</div>}
				{isEditing &&
					<PostEditor
						stopEditing={stopEditing}
						activeEditPost={activeEditPost}
						update={updatePost}
					/>}
			</div>
		</div>
	)
}

export default Dashboard
