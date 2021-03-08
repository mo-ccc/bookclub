import React from 'react'
import Select from 'react-select'
import {Controller} from 'react-hook-form'

const PatchFormBase = ({defaultData, onSubmit, useForm, fields}) => {
  const {register, handleSubmit, control} = useForm
  const boolOptions = [
    {value:true,label:"true" }, {value:"false",label:"false" }
  ]

  // function to render a true or false select
  const renderSelect = (item) => {
    if (defaultData) {
      const def = defaultData && {value: defaultData[item[0]].toString(),label: defaultData[item[0]].toString()}
      if (item[1] === 1) {
        return(
          <div className="form-group">
            <label>{item[0]}</label>
            <Controller as={Select} name={item[0]} type={item[0]} options={boolOptions} defaultValue={def} control={control} ref={register()} />
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
          <div className="form-group">
            <label>{item}</label>
            <input className="form-control" name={item} type={item} defaultValue={defaultData && defaultData[item]} ref={register()} />
          </div>
        )
      })}
      <input type="submit" className="btn btn-primary"/>
    </form>
  )
}
export default PatchFormBase