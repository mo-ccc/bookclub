import React from 'react'
import _ from 'lodash';

const FormBase = ({defaultData, onSubmit, useForm, fields}) => {
  const {register, handleSubmit, control, errors} = useForm

  const renderInput = {
    "select": (item) => (
      <div>
        <select className="form-control" name={item.name} ref={register(item.validation)} defaultValue={defaultData?.[item.name]}>
          {item.options.map((option, i) => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
    ),
    "bool": (item) => (
      <div>
        <select className="form-control" name={item.name} ref={register(item.validation)} defaultValue={defaultData?.[item.name]}>
          <option key="true" value="true">true</option>
          <option key="false" value="false">false</option>
        </select>
      </div>
    ),
    "flex": (item) => (
      <div>
        {item.fields.map((item, i) => {
          return renderer(item, i)
        })}
      </div>
    )
  }
  
  const renderer = (item, i) => (
    <div className="form-group" key={item.name}>
      <label>{item.label}</label>
      {_.has(errors, item.name) &&
        <small className="form-text text-muted">{_.get(errors, item.name).message}</small>
      }
      {item.inputType in renderInput ?
        renderInput[item.inputType](item)
          :
        <input className="form-control" name={item.name} placeholder={item.placeholder} type={item.inputType} defaultValue={defaultData?.[item.name]} ref={register(item.validation)} />
      }
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      {fields.map((item, i) => {
        return renderer(item, i)
      })}
      <input type="submit" className="btn btn-primary"/>
    </form>
  )
}
export default FormBase