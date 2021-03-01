import React, {useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import {useForm} from 'react-hook-form'
import {setAuth} from '../redux'
import store from '../redux/store.js'

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm()
  const [ success, setSuccess ] = useState("")

  const domain = window.location.hostname.split(".")[0]
  const onSubmit = (data) => {
    fetch(`http://${domain}.localhost:5000/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(data)
    }).then(response => {
      response.ok ? setSuccess("logged in"):setSuccess("invalid credentials")
      return response.json()
    }).then(data => store.dispatch(setAuth(data)))
    .catch(error => console.log('invalid credentials'))
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
      {success &&
      <Alert variant="primary" onClose={() => setSuccess("")} dismissible>
        <p>
          {success}
        </p>
      </Alert>
      }
    </form>
  )
}

export default LoginForm