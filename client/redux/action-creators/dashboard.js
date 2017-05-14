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
	UPDATE_POST_REQUEST,
	UPDATE_POST_SUCCESS,
	UPDATE_POST_ERROR,
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
const onUpdatePostRequest = createAction(UPDATE_POST_REQUEST)
const onUpdatePostSuccess = createAction(UPDATE_POST_SUCCESS)
const onUpdatePostError = createAction(UPDATE_POST_ERROR)
const onDeletePostRequest = createAction(DELETE_POST_REQUEST)
const onDeletePostSuccess = createAction(DELETE_POST_SUCCESS)
const onDeletePostError = createAction(DELETE_POST_ERROR)
const onUpdateStoreAfterAutoSave = createAction(UPDATE_STORE_AFTER_AUTOSAVE)

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

export function updatePost(post) {
	return dispatch => {
		dispatch(onUpdatePostRequest())
		return axios
			.put(`${ROOT_URL}/posts/${post.id}/update`, { post })
			.then(({ data: { newPost } }) => {
				console.log('')
				dispatch(onUpdatePostSuccess({ newPost }))
			})
			.catch(err => {
				dispatch(onUpdatePostError(err))
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
			})
			.catch(err => {
				dispatch(onDeletePostError(err))
			})
	}
}

export function updateStoreAfterAutoSave(newPost) {
	console.log('updating store....', newPost)
	return dispatch => dispatch(onUpdateStoreAfterAutoSave({ newPost }))
}
