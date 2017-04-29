var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { handleActions } from 'redux-actions';
import { USER_LOGIN } from '../constants';

const initialState = {
  user: {
    email: null
  }
};

export default handleActions({
  [USER_LOGIN]: (state, { payload: { email } }) => {
    return _extends({}, state, {
      user: {
        email
      }
    });
  }
}, initialState);