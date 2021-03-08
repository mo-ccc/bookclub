import React from 'react'
import Select from 'react-select'
import {Controller} from 'react-hook-form'

const PatchFormBase = ({defaultData, nestedData, onSubmit, useForm, fields}) => {
  const {register, handleSubmit, control} = useForm
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
          <div className="form-group" key={i}>
            <label>{item}</label>
            <input className="form-control" name={item} type={item} defaultValue={defaultData && defaultData[item]} ref={register()} />
          </div>
        )
      })}
      {nestedData &&
        nestedData.map((item, i) => {
          item[2].map((item2, i2) => {
            <div className="row" key={`i2${i2}`}>
              {item.map((item3, i3) => (
                <div className="col" key={`i3${i3}`}>
                  <input className="form-control" name={`${nestedData[0]}.${item3}`} defaultValue={nestedData[1][item3]} ref={register()} />
                </div>
              ))}
            </div>
            
          }
        })
        Object.keys(nestedData[1]).map((item, i) => (
          <div className="form-group" key={i}>
            <label>{item}</label>
            <input className="form-control" name={`${nestedData[0]}.${item}`} type={item} defaultValue={nestedData && nestedData[1][item]} ref={register()} />
            <label>{item}</label>
            <input className="form-control" name={`${nestedData[0]}.${item}`} type={item} defaultValue={nestedData && nestedData[1][item]} ref={register()} />
          </div>
        ))
      }
      <input type="submit" className="btn btn-primary"/>
    </form>
  )
}
export default PatchFormBase