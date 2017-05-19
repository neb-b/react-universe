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
	PUBLISH_POST_ERROR,
	DELETE_POST_REQUEST,
	DELETE_POST_SUCCESS,
	DELETE_POST_ERROR,
	UPDATE_STORE_AFTER_AUTOSAVE
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
const onDeletePostRequest = createAction(DELETE_POST_REQUEST)
const onDeletePostSuccess = createAction(DELETE_POST_SUCCESS)
const onDeletePostError = createAction(DELETE_POST_ERROR)
const onUpdateStoreAfterAutoSave = createAction(UPDATE_STORE_AFTER_AUTOSAVE)

// called from redux-form so a little different than react-redux bindings
export function login(userLoginObj, dispatch) {
	dispatch(onLoginRequest())
	return axios
		.post(`${ROOT_URL}/login`, { ...userLoginObj })
		.then(({ data: { dashboard: { posts } } }) => {
			dispatch(onLoginSuccess({ posts }))
		})
		.catch(err => dispatch(onLoginError(err)))
}

export function createPost() {
	return (dispatch, getState) => {
		const date = new Date().toISOString()

		dispatch(onCreatePostRequest({ date }))
		return axios
			.post(`${ROOT_URL}/posts/create`, { date })
			.then(({ data: { newPost } }) => {
				const state = getState()
				let newPosts = state.dashboard.posts || []
				newPosts.push(newPost)
				dispatch(onCreatePostSuccess({ posts: newPosts, newPost }))
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

export function publishPost(post) {
	return dispatch => {
		dispatch(onPublishPostRequest())
		return axios
			.put(`${ROOT_URL}/posts/${post.id}/publish`, { post })
			.then(({ data: { newPost } }) => {
				console.log('')
				dispatch(onPublishPostSuccess({ newPost }))
			})
			.catch(err => {
				dispatch(onPublishPostError(err))
			})
	}
}

export function deletePost(id) {
	return dispatch => {
		dispatch(onDeletePostRequest())
		return axios
			.delete(`${ROOT_URL}/posts/${id}`)
			.then(() => {
				dispatch(onDeletePostSuccess({ id }))
				window.location = '/admin?deleted=true'
			})
			.catch(err => {
				dispatch(onDeletePostError(err))
			})
	}
}

export function updateStoreAfterAutoSave(newPost) {
	return dispatch => dispatch(onUpdateStoreAfterAutoSave({ newPost }))
}

export function loadPosts() {
	return dispatch => {
		dispatch()
	}
}
