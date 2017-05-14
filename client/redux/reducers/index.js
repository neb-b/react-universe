import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import blog from './blog'
import dashboard from './dashboard'
import post from './post'

export default combineReducers({
	blog,
	dashboard,
	post,
	form
})
