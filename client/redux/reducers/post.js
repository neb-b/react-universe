// a post that is in active editing will live here
// when 'closing', state will be cleared, and
// added to the 'posts' arrray, in ./dashboard.js

import { handleActions } from 'redux-actions'
import {
	CREATE_POST_REQUEST,
	CREATE_POST_SUCCESS,
	STOP_EDIT,
	START_EDIT,
	UPDATE_POST_SUCCESS,
	DELETE_POST_REQUEST,
	DELETE_POST_SUCCESS,
	DELETE_POST_ERROR
} from '../constants'

const initialState = {
	initializing: false,
	title: '',
	body: '',
	dateCreated: '',
	datePublished: '',
	isPublished: null,
	lastEdited: null
}

export default handleActions(
	{
		[CREATE_POST_REQUEST]: (state, { payload }) => ({
			...state,
			// will be like a fullscreen modal, so don't have to reset other props
			initializing: true
		}),
		[CREATE_POST_SUCCESS]: (state, { payload: { newPost } }) => ({
			...state,
			initializing: false,
			...newPost
		}),
		[START_EDIT]: (state, { payload: { post } }) => ({
			...state,
			...post
		}),
		[STOP_EDIT]: (state, { payload }) => ({
			...state,
			post: {}
		}),
		[UPDATE_POST_SUCCESS]: (state, { payload: { newPost } }) => ({
			...state,
			...newPost
		}),
		[DELETE_POST_REQUEST]: state => ({ ...state, loading: true }),
		[DELETE_POST_SUCCESS]: (state, { payload: { id } }) => ({
			...state,
			post: {}
		}),
		[DELETE_POST_ERROR]: (state, { payload }) => ({
			...state,
			loading: false,
			error: payload,
			post: {}
		})
	},
	initialState
)
