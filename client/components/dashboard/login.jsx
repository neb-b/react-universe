import React from 'react'
import { Field } from 'redux-form'

const renderField = ({ input, label, type }) => (
  <div>
    <label>{label}</label>
    <input {...input} type={type}/>
  </div>
)

const Login = (props: { }) => {
  const { handleSubmit, submit } = props
  // console.log('props', props);
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field name="email" label="Email" component={renderField} />
      <Field name="password" type="password" label="Password" component={renderField} />
      <button>Login</button>
    </form>
  )
}

export default Login
