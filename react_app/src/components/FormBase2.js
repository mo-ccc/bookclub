import React from 'react'
import Select from 'react-select'
import {Controller} from 'react-hook-form'
import times from '../statics/json/times.json'

const FormBase = ({defaultData, onSubmit, useForm, fields}) => {
  const {register, handleSubmit, control, errors} = useForm
  const boolOptions = [
    {value:"true", label:"true" }, {value:"false", label:"false" }
  ]
  // {label, name, inputType, validation, newline, options}

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
              <input className="form-control" name={item.name} type={item.inputType} defaultValue={defaultData?.[item.name]} ref={register(item.validation)} />
              {errors[item] &&
                <small className="form-text text-muted">{errors[item]}</small>
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