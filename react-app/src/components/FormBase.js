import React from 'react'
import Select from 'react-select'
import {Controller} from 'react-hook-form'
import times from '../statics/json/times.json'

const FormBase = ({defaultData, nestedData, onSubmit, useForm, fields, is_post}) => {
  const {register, handleSubmit, control, errors} = useForm
  const boolOptions = [
    {value:"true", label:"true" }, {value:"false", label:"false" }
  ]

  // function to render a true or false select
  const renderSelect = (item, i) => {
      const def = defaultData && {value: defaultData[item[0]].toString(),label: defaultData[item[0]].toString()}
      if (item[1] === 1) {
        return(
          <div className="form-group" key={i}>
            <label>{item[0]}</label>
            <Controller as={Select} name={item[0]} options={boolOptions} defaultValue={def} control={control} ref={is_post ? register({required: true}) : register()} />
            {errors[item[0]] && <small className="form-text text-muted">{item[0]} is required</small>}
          </div>
        )
      }
      else if (item[1] === 2) {
        return(
          <div className="form-group" key={i}>
            <label>{item[0]}</label>
            <input className="form-control" name={item[0]} type="number" defaultValue={defaultData && defaultData[item[0]]} ref={is_post ? register({required: true}) : register()} />
            {errors[item[0]] && <small className="form-text text-muted">{item[0]} is required</small>}
          </div>
        )
      }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      {fields.map((item, i) => {
        if (Array.isArray(item)) {
          return renderSelect(item, i)
        }
        return (
          <div className="form-group" key={i}>
            <label>{item}</label>
            <input className="form-control" name={item} type={item} defaultValue={defaultData && defaultData[item]} ref={is_post ? register({required: true}) : register()} />
            {errors[item] && <small className="form-text text-muted">{item} is required</small>}
          </div>
        )
      })}
      {nestedData && 
        nestedData.map((groups, groupindex) => ( // group => [name, defaultdata, fields]
          groups[2].map((set, setindex) => ( // fields.map to sets
            <div className="row" key={`si${setindex}`}>
              {set.map((setitem, itemindex) => ( // item within set ["mondayStart", "mondayEnd"]
                <div className="col" key={`ii${itemindex}`}>
                  <div className="p-3">
                    <label>{setitem}</label>
                    <Controller as={Select} name={`${groups[0]}.${setitem}`} defaultValue={groups[1] && {value: groups[1][setitem], label: times[groups[1][setitem]]}} options={Array.from(times.map((time, itemindex) => ({value: itemindex, label: time})))} ref={register()} control={control} />
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