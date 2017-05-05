import { handleActions } from 'redux-actions'
import { LOAD_POSTS } from '../constants'

const initialState = {
	posts: []
}

export default handleActions(
	{
		[LOAD_POSTS]: (state, { payload: { posts } }) => {
			return {
				...state,
				posts
			}
		}
	},
	initialState
)
