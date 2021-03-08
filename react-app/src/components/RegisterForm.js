import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import Alert from 'react-bootstrap/Alert'
import postNoToken from '../api/postWithToken'

const RegisterForm = () => {
  const { register, handleSubmit, errors } = useForm()
  const [ success, setSuccess ] = useState("")

  const domain = window.location.hostname.split(".")[0]
  const onSubmit = (data) => {
    postNoToken('register', data)
    .then(response => response.ok ? setSuccess("registered"):setSuccess("registration failed"))
    .catch(() => setSuccess("error"))
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="form-group">
        <label>Name</label>
        <input className="form-control" name="name" placeholder="Enter Name" ref={register({ required: true })} />
        {errors.email && <small className="form-text text-muted">Name is required</small>}
      </div>
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
export default RegisterForm