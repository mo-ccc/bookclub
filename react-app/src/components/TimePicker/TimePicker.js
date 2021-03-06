import React from 'react'
import times from '../../statics/json/times.json'

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
  return (
  <div>
    <select>
      <option>Choose a date first</option>
    </select>
  </div>
  )

}
export default TimePicker