import { handleActions } from 'redux-actions'
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	VIEW_POSTS,
	VIEW_ANALYTICS
} from '../constants'

const initialState = {
	loading: false,
	error: null,
	loggedIn: false,
	viewingAnalytics: true,
	viewingPosts: false,
	posts: []
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
	[VIEW_POSTS]: (state, { payload }) => ({
		...state,
		viewingPosts: true,
		currentlyEditing: false
	}),
	[VIEW_ANALYTICS]: (state, { payload }) => ({
		...state,
		viewingPosts: false,
		viewingAnalytics: true
	})
}, initialState)
