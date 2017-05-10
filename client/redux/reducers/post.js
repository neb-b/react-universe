// a post that is in active editing will live here
// when 'closing', state will be cleared, and
// added to the 'posts' arrray, in ./dashboard.js

import { handleActions } from 'redux-actions'
import {
	CREATE_POST_REQUEST,
	CREATE_POST_SUCCESS,
	CREATE_POST_ERROR,
	START_EDIT,
	STOP_EDIT
} from '../constants'

const initialState = {
	title: '',
	text: '',
	dateCreated: '',
	datePublished: '',
	isPublished: null,
	lastEdited: null
}
