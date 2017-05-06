import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import blog from './blog'

export default combineReducers({
	blog,
	form
})
