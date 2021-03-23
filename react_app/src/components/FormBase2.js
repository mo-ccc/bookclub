import React from 'react'
import {Controller} from 'react-hook-form'
import times from '../statics/json/times.json'
import _ from 'lodash';

const FormBase = ({defaultData, onSubmit, useForm, fields}) => {
  const {register, handleSubmit, control, errors} = useForm
  const boolOptions = [
    {value:"true", label:"true" }, {value:"false", label:"false" }
  ]

  const renderInput = {
    "select": (item) => (
      <div>
        <select className="form-control" name={item.name} ref={register(item.validation)} defaultValue={defaultData?.[item.name]}>
          <option key="true" value="true">true</option>
          <option key="false" value="false">false</option>
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
    )
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      {fields.map((item, i) => {
        
        switch (item.inputType) {
          case "select": return (
            <div>
              <select className="form-control" name={item.name} ref={register(item.validation)} defaultValue={defaultData?.[item.name]}>
                <option key="true" value="true">true</option>
                <option key="false" value="false">false</option>
              </select>
            </div>
          )
        
          case "bool": return (
            <div className="form-group">
              <label>{item.label}</label>
              {_.has(errors, item.name) &&
                <small className="form-text text-muted">{_.get(errors, item.name).message}</small>
              }
              <select className="form-control" name={item.name} ref={register(item.validation)} defaultValue={defaultData?.[item.name]}>
                <option key="true" value="true">true</option>
                <option key="false" value="false">false</option>
              </select>
            </div>
          )

          default: return (
            <div className="form-group" key={i}>
              <label>{item.label}</label>
              {_.has(errors, item.name) &&
                <small className="form-text text-muted">{_.get(errors, item.name).message}</small>
              }
              <input className="form-control" name={item.name} placeholder={item.placeholder} type={item.inputType} defaultValue={defaultData?.[item.name]} ref={register(item.validation)} />
              
            </div>
          )
        }
      })}
      <input type="submit" className="btn btn-primary"/>
    </form>
  )
}
export default FormBase