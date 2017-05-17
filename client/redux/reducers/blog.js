import { handleActions } from 'redux-actions'
import {
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	LOAD_POSTS_ERROR
} from '../constants'

const initialState = {
	posts: [],
	loading: false,
	error: null
}

export default handleActions(
	{
		[LOAD_POSTS_REQUEST]: state => ({ ...state, loading: true }),
		[LOAD_POSTS_SUCCESS]: (state, { payload: { posts } }) => ({
			...state,
			loading: false,
			posts
		}),
		[LOAD_POSTS_ERROR]: (state, { payload }) => ({
			...state,
			loading: false,
			error: payload
		})

		// PUBLISH_POST_SUCCESS
		// check if published/unpublished and add/filter to list of posts
	},
	initialState
)
