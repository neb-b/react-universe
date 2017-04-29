import { handleActions } from 'redux-actions'
import {
  USER_LOGIN
} from '../constants'

const initialState = {
  email: null
}

export default handleActions({
  [USER_LOGIN]: (state, {payload: { email }}) => {
    return ({
      ...state,
      email
    })
  }
}, initialState)
