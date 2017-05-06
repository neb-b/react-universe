import {
  ROOT_URL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '../constants'
import { createAction } from 'redux-actions'
import axios from 'axios'

const onLoginRequest = createAction(LOGIN_REQUEST)
const onLoginSuccess = createAction(LOGIN_SUCCESS)
const onLoginError = createAction(LOGIN_ERROR)

// called from redux-form so a little different than react-redux bindings
export function login({email, password}, dispatch) {
  dispatch(onLoginRequest())
  return axios.post(`${ROOT_URL}/login`)
    .then((res) => {
      console.log('res', res);
      dispatch(onLoginSuccess())
    })
    .catch((err) => dispatch(onLoginError(err)))
}
