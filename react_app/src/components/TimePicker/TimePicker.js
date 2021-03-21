import React from 'react'
import times from '../../statics/json/times.json'

const TimePicker = ({data, timeslot, setTimeSlot, selectedDay}) => {
  const handleOnChange = (event) => {
    setTimeSlot(event.target.value)
  }

  const compareCurrentTime = (i) => {
    let clone = new Date(selectedDay.valueOf())
    clone.setHours(0)
    clone.setMinutes(i*30)
    return clone < new Date()
  }


  if (data?.facility?.availabilities){
    return (
      <div>
        <select name="timepicker" onChange={handleOnChange} value={timeslot}>
          {times.map((v, i) => {
            return <option key={i} value={i} disabled={(i<data.facility.availabilities.open) || (i>data.facility.availabilities.close) || compareCurrentTime(i)}>{v}----{data.counts[i] ? data.facility.max_capacity - data.counts[i]: data.facility.max_capacity} availabilities</option>
          })}
        </select>
      </div>
    )
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