import React from 'react'
import Select from 'react-select'
import {Controller} from 'react-hook-form'
import times from '../statics/json/times.json'
import _ from 'lodash';

const FormBase = ({defaultData, onSubmit, useForm, fields}) => {
  const {register, handleSubmit, control, errors} = useForm
  const boolOptions = [
    {value:"true", label:"true" }, {value:"false", label:"false" }
  ]
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      {fields.map((item, i) => {
        switch (item.inputType) {
          case "select": return (
            <Controller as={Select} name={item.name} options={item.options} defaultValue={defaultData?.[item.name]} control={control} ref={register(item.validation)}/>
          )
        
          case "bool": return (
            <Controller as={Select} name={item.name} options={boolOptions} defaultValue={defaultData?.[item.name]} control={control} ref={register(item.validation)}/>
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