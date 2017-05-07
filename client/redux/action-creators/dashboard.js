import {
  ROOT_URL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  VIEW_POSTS,
  VIEW_ANALYTICS
} from '../constants'
import { createAction } from 'redux-actions'
import axios from 'axios'

const onLoginRequest = createAction(LOGIN_REQUEST)
const onLoginSuccess = createAction(LOGIN_SUCCESS)
const onLoginError = createAction(LOGIN_ERROR)
const onViewPosts = createAction(VIEW_POSTS)
const onViewAnalytics = createAction(VIEW_ANALYTICS)

// called from redux-form so a little different than react-redux bindings
export function login(userLoginObj, dispatch) {
  dispatch(onLoginRequest())
  return axios.post(`${ROOT_URL}/login`, { ...userLoginObj })
    .then(({ data: { posts } }) => {
      dispatch(onLoginSuccess({ posts }))
    })
    .catch((err) => dispatch(onLoginError(err)))
}

export function viewPosts() {
  return dispatch => dispatch(onViewPosts())
}

export function viewAnalytics() {
  return dispatch => dispatch(onViewAnalytics())
}
