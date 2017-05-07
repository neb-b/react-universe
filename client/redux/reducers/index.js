import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import blog from './blog'
import dashboard from './dashboard'

export default combineReducers({
	blog,
	dashboard,
	form
})
