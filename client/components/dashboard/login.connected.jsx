// @flow

import { reduxForm } from 'redux-form'
import Login from './login'
import { login } from '../../redux/action-creators/dashboard'

export default reduxForm({
  form: 'login',
  onSubmit: login
})(Login)
