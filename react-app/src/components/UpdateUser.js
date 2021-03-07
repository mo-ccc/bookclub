import React, {useState} from 'react'

const UpdateUser = ({defaultData, onSubmit, useForm}) => {
  const {register, handleSubmit, errors} = useForm

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="form-group">
        <label>Name</label>
        <input className="form-control" name="name" placeholder="Enter Name" defaultValue={defaultData && defaultData.name} ref={register({ required: true })} />
        {errors.email && <small className="form-text text-muted">Name is required</small>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input className="form-control" name="email" type="email" placeholder="Enter Email" defaultValue={defaultData && defaultData.email} ref={register({ required: true })} />
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
export default UpdateUser