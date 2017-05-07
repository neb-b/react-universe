import { handleActions } from 'redux-actions'
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR
} from '../constants'

const initialState = {
	loading: false,
	error: null,
	loggedIn: false,
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
	})
}, initialState)
