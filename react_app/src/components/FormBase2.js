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
        const errorMessages = {
          "maxLength": `length must be less than ${item.validation?.maxLength}`,
          "minLength": `length must be greater than ${item.validation?.minLength}`,
          "required": "field is required"
        }
        console.log(errors)
      

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
              <input className="form-control" name={item.name} placeholder={item.placeholder} type={item.inputType} defaultValue={defaultData?.[item.name]} ref={register(item.validation)} />
              {_.get(errors, item.name) &&
                <small className="form-text text-muted">{_.get(errors, item.name).message || errorMessages[_.get(errors, item.name).type]}</small>
              }
            </div>
          )
        }
      })}
      <input type="submit" className="btn btn-primary"/>
    </form>
  )
}
export default FormBase