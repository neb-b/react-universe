import {
	ROOT_URL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	VIEW_POSTS,
	CREATE_POST_REQUEST,
	CREATE_POST_SUCCESS,
	CREATE_POST_ERROR,
	STOP_EDIT,
	START_EDIT,
	PUBLISH_POST_REQUEST,
	PUBLISH_POST_SUCCESS,
	PUBLISH_POST_ERROR
} from '../constants'
import { createAction } from 'redux-actions'
import axios from 'axios'

const onLoginRequest = createAction(LOGIN_REQUEST)
const onLoginSuccess = createAction(LOGIN_SUCCESS)
const onLoginError = createAction(LOGIN_ERROR)
const onCreatePostRequest = createAction(CREATE_POST_REQUEST)
const onCreatePostSuccess = createAction(CREATE_POST_SUCCESS)
const onCreatePostError = createAction(CREATE_POST_ERROR)
const onViewPosts = createAction(VIEW_POSTS)
const onBeginEdit = createAction(START_EDIT)
const onStopEdit = createAction(STOP_EDIT)
const onPublishPostRequest = createAction(PUBLISH_POST_REQUEST)
const onPublishPostSuccess = createAction(PUBLISH_POST_SUCCESS)
const onPublishPostError = createAction(PUBLISH_POST_ERROR)

// called from redux-form so a little different than react-redux bindings
export function login(userLoginObj, dispatch) {
	dispatch(onLoginRequest())
	return axios
		.post(`${ROOT_URL}/login`, { ...userLoginObj })
		.then(({ data: { posts } }) => {
			dispatch(onLoginSuccess({ posts }))
		})
		.catch(err => dispatch(onLoginError(err)))
}

export function createPost() {
	return (dispatch, getState) => {
		dispatch(onCreatePostRequest())
		return axios
			.post(`${ROOT_URL}/posts/create`)
			.then(({ data: { newPost } }) => {
				const state = getState()
				let newPosts = state.dashboard.posts || []
				newPosts.push(newPost)
				dispatch(onCreatePostSuccess({ posts: newPosts }))
			})
			.catch(err => {
				dispatch(onCreatePostError())
			})
	}
}

export function editPost(post) {
	return dispatch => {
		dispatch(onBeginEdit({ post }))
	}
}

export function stopEditing() {
	return dispatch => dispatch(onStopEdit())
}

export function publishPost(id) {
	return (dispatch, getState) => {
		dispatch(onPublishPostRequest())
		return axios
			.put(`${ROOT_URL}/posts/${id}/publish`)
			.then(({ newPost }) => {
				const state = getState()
				const newPosts = state.dashboard.posts.map(
					post => (post.id === id ? newPost : post)
				)
				dispatch(onPublishPostSuccess({ posts: newPosts }))
			})
			.catch(err => {
				dispatch(onPublishPostError(err))
			})
	}
}

export function unPublishPost() {}
