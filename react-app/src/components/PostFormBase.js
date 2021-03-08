import React from 'react'
import Select from 'react-select'
import {Controller} from 'react-hook-form'

const PostFormBase = ({onSubmit, useForm, fields}) => {
  const {register, handleSubmit, control, errors} = useForm
  const boolOptions = [
    {value:true,label:"true" }, {value:"false",label:"false" }
  ]

  const renderSelect = (item) => {
    if (item[1] === 1) {
      return(
        <div className="form-group">
          <label>{item[0]}</label>
          <Controller as={Select} name={item[0]} type={item[0]} options={boolOptions} control={control} ref={register({required: true})} />
          {errors[item[0]] && <small className="form-text text-muted">{item[0]} is required</small>}
        </div>
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      {fields.map((item, i) => {
        if (Array.isArray(item)) {
          return renderSelect(item)
        }
        return (
          <div className="form-group" key={i}> 
            <label>{item}</label>
            <input className="form-control" name={item} type={item} ref={register({required: true})} />
            {errors[item] && <small className="form-text text-muted">{item} is required</small>}
          </div>
        )
      })}
      <input type="submit" className="btn btn-primary"/>
    </form>
  )
}
export default PostFormBase