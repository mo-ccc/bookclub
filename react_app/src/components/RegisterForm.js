import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import postNoToken from '../api/postWithToken'
import store from '../redux/store.js'
import {setNotification} from '../redux'

const RegisterForm = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => {
    postNoToken('register', data)
    .then(response => response.ok ? store.dispatch(setNotification("registered", "primary")):store.dispatch(setNotification("registration failed, account may already exist", "danger")))
    .catch(error => store.dispatch(setNotification(String(error), "danger")))
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="form-group">
        <label>Name</label>
        <input className="form-control" name="name" placeholder="Enter Name" ref={register({ required: true, pattern: /^[a-zA-Z ]*$/ })} />
        {errors.name && <small className="form-text text-muted">Name is required and must only contain letters</small>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input className="form-control" name="email" type="email" placeholder="Enter Email" ref={register({ required: true })} />
        {errors.email && <small className="form-text text-muted">Email is required and must be a valid email</small>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input className="form-control" name="password" type="password" placeholder="Enter Password" ref={register({ required: true, minLength: 6 })} />
        {errors.password && <small className="form-text text-muted">Password is required and must be at least 6 characters long</small>}
      </div>
      <input type="submit" className="btn btn-primary"/>
    </form>
  )
}
export default RegisterForm