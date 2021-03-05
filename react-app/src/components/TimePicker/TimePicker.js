import React from 'react'
import times from './times.json'

const TimePicker = ({data, timeslot, setTimeSlot}) => {
  const handleOnChange = (event) => {
    setTimeSlot(event.target.value)
  }

  if (data) {
    if (data.facility.availabilities){
      return (
        <div>
          <select name="timepicker" onChange={handleOnChange} value={timeslot}>
            {times.map((v, i) => {
              return <option key={i} value={i} disabled={(i<data.facility.availabilities.open) || (i>data.facility.availabilities.close)}>{v}----{data.counts[i] ? data.facility.max_capacity - data.counts[i]: data.facility.max_capacity} availabilities</option>
            })}
          </select>
        </div>
      )
    }
  }
  return (<h1>select a date</h1>)

}
export default TimePicker