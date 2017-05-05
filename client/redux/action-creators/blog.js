import {
  ROOT_URL,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR
} from '../constants'
import { createAction } from 'redux-actions'
import axios from 'axios'

const onLoadPostsRequest = createAction(LOAD_POSTS_REQUEST)
const onLoadPostsSuccess = createAction(LOAD_POSTS_SUCCESS)
const onLoadPostsError = createAction(LOAD_POSTS_ERROR)

export function loadPosts() {
  return (dispatch) => {
    dispatch(onLoadPostsRequest())
    return axios.get(`${ROOT_URL}/posts`)
      .then(({ data: { posts }}) => dispatch(onLoadPostsSuccess({posts})))
      .catch((err) => dispatch(onLoadPostsError(err)))
  }
}
