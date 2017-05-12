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
	START_EDIT,
	UPDATE_POST_SUCCESS,
	DELETE_POST_REQUEST,
	DELETE_POST_SUCCESS,
	DELETE_POST_ERROR
} from '../constants'

const initialState = {
	loading: false,
	error: null,
	loggedIn: false,
	posts: [],
	isEditing: false,
	activeEditPost: {},
	justDeleted: false
}

export default handleActions(
	{
		[LOGIN_REQUEST]: state => ({ ...state, loading: true }),
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
		[START_EDIT]: (state, { payload: { post } }) => ({
			...state,
			isEditing: true,
			activeEditPost: post
		}),
		[STOP_EDIT]: (state, { payload }) => ({
			...state,
			isEditing: false,
			activeEditPost: {}
		}),
		[UPDATE_POST_SUCCESS]: (state, { payload }) => ({
			...state,
			activeEditPost: payload.newPost,
			posts: state.posts.map(
				post => (post.id === payload.newPost.id ? payload.newPost : post)
			)
		}),
		[DELETE_POST_REQUEST]: state => ({ ...state, loading: true }),
		[DELETE_POST_SUCCESS]: (state, { payload: { id } }) => ({
			...state,
			loading: false,
			isEditing: false,
			justDeleted: true,
			posts: state.posts.filter(post => post.id !== id)
		}),
		[DELETE_POST_ERROR]: (state, { payload }) => ({
			...state,
			loading: false,
			error: payload
		})
	},
	initialState
)
