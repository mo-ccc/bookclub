import React from 'react'
import Select from 'react-select'
import {Controller} from 'react-hook-form'
import times from '../statics/json/times.json'

const FormBase = ({defaultData, nestedData, onSubmit, useForm, fields, is_post}) => {
  const {register, handleSubmit, control, errors} = useForm
  const boolOptions = [
    {value:true, label:"true" }, {value:"false", label:"false" }
  ]

  // function to render a true or false select
  const renderSelect = (item) => {
    if (defaultData) {
      const def = defaultData && {value: defaultData[item[0]].toString(),label: defaultData[item[0]].toString()}
      if (item[1] === 1) {
        return(
          <div className="form-group">
            <label>{item[0]}</label>
            <Controller as={Select} name={item[0]} options={boolOptions} defaultValue={def} control={control} ref={register(is_post && {required: true})} />
            {errors[item[0]] && <small className="form-text text-muted">{item[0]} is required</small>}
          </div>
        )
      }
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
            <input className="form-control" name={item} type={item} defaultValue={defaultData && defaultData[item]} ref={register(is_post && {required: true})} />
            {errors[item] && <small className="form-text text-muted">{item} is required</small>}
          </div>
        )
      })}
      {nestedData &&
        nestedData.map((item, i) => (
          item[2].map((item2, i2) => (
            <div className="row" key={`i2${i2}`}>
              {item2.map((item3, i3) => (
                <div className="col" key={`i3${i3}`}>
                  <div className="p-3">
                    <label>{item3}</label>
                    <Controller as={Select} name={`${item[0]}.${item3}`} defaultValue={{value: item[1][item3], label: times[item[1][item3]]}} options={Array.from(times.map((time, index) => ({value: index, label: time})))} ref={register(is_post && {required: true})} control={control} />
                  </div>
                </div>
              ))}
            </div>
          ))
        ))
      }
      <input type="submit" className="btn btn-primary"/>
    </form>
  )
}
export default FormBase