import { handleActions } from 'redux-actions'
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	VIEW_POSTS,
	CREATE_POST_REQUEST,
	CREATE_POST_SUCCESS,
	CREATE_POST_ERROR,
	STOP_EDIT,
	START_EDIT
} from '../constants'

const initialState = {
	loading: false,
	error: null,
	loggedIn: false,
	posts: [],
	isEditing: false,
	activeEditPost: {}
}

export default handleActions({
	[LOGIN_REQUEST]: (state) => ({ ...state, loading: true }),
	[LOGIN_SUCCESS]: (state, { payload: { posts } }) => ({
		...state,
		loading: false,
		loggedIn: true,
		posts
	}),
	[LOGIN_ERROR]: (state, { payload }) => ({
		...state,
		loading: false,
		error: payload
	}),
	[CREATE_POST_REQUEST]: (state, { payload }) => ({
		...state,
		// will be like a fullscreen modal, so don't have to reset other props
		isEditing: true
	}),
	[CREATE_POST_SUCCESS]: (state, { payload: { posts } }) => ({
		...state,
		posts
	}),
	[START_EDIT]: (state, { payload: { post }}) => ({
		...state,
		isEditing: true,
		activeEditPost: post
	}),
	[STOP_EDIT]: (state, { payload }) => ({
		...state,
		isEditing: false,
		activeEditPost: {}
	})
}, initialState)
