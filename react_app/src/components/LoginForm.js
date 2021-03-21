import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {setAuth, setNotification} from '../redux'
import store from '../redux/store.js'
import postNoToken from '../api/postWithToken'

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => {
    postNoToken('login', data)
    .then(response => {
      response.ok ? store.dispatch(setNotification("logged in", "primary")):store.dispatch(setNotification("invalid credentials", "danger"))
      return response.json()
    }).then(data => {
      store.dispatch(setAuth(data))
      console.log(store.getState())
    })
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="form-group">
        <label>Email</label>
        <input className="form-control" name="email" type="email" placeholder="Enter Email" ref={register({ required: true })} />
        {errors.email && <small className="form-text text-muted">Email is required</small>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input className="form-control" name="password" type="password" placeholder="Enter Password" ref={register({ required: true })} />
        {errors.password && <small className="form-text text-muted">Password is required</small>}
      </div>
      <input type="submit" className="btn btn-primary"/>
    </form>
  )
}

export default LoginForm