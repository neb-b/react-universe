import {
  ROOT_URL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  VIEW_POSTS,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  STOP_EDITING
} from '../constants'
import { createAction } from 'redux-actions'
import axios from 'axios'

const onLoginRequest = createAction(LOGIN_REQUEST)
const onLoginSuccess = createAction(LOGIN_SUCCESS)
const onLoginError = createAction(LOGIN_ERROR)
const onCreatePostRequest = createAction(CREATE_POST_REQUEST)
const onCreatePostSuccess = createAction(CREATE_POST_SUCCESS)
const onCreatePostError = createAction(CREATE_POST_ERROR)
const onViewPosts = createAction(VIEW_POSTS)
const onStopEditing = createAction(STOP_EDITING)

// called from redux-form so a little different than react-redux bindings
export function login(userLoginObj, dispatch) {
  dispatch(onLoginRequest())
  return axios.post(`${ROOT_URL}/login`, { ...userLoginObj })
    .then(({ data: { posts } }) => {
      dispatch(onLoginSuccess({ posts }))
    })
    .catch((err) => dispatch(onLoginError(err)))
}

export function createPost() {
  return (dispatch, getState) => {
    dispatch(onCreatePostRequest())
    return axios.post(`${ROOT_URL}/posts/create`)
      .then(({ data: { newPost } }) => {
        const state = getState()
        let newPosts = state.dashboard.posts || []
        newPosts.push(newPost)
        dispatch(onCreatePostSuccess({ posts: newPosts }))
      })
      .catch((err) => {
        dispatch(onCreatePostError())
      })
  }
}

export function stopEditing() {
  return dispatch => dispatch(onStopEditing())
}
