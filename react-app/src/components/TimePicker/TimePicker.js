import React from 'react'
import times from '../../statics/json/times.json'

const TimePicker = ({data, timeslot, setTimeSlot}) => {
  const handleOnChange = (event) => {
    setTimeSlot(event.target.value)
  }

  if (data) {
    if (data.facility.availabilities){
      let closeTime = data.facility.availabilities.close
      let openTime = data.facility.availabilities.open
      let yesterdayTime = data.facility.availabilities.yesterday_close - 48
      let tomorrowTime = data.facility.availabilities.tomorrow_open + 48
      let d = new Date()
      let n = d.getTimezoneOffset()
      closeTime -= n/30
      openTime -= n/30
      yesterdayTime -= n/30
      tomorrowTime -= n/30

      return (
        <div>
          <select name="timepicker" onChange={handleOnChange} value={timeslot}>
            {times.map((v, i) => {
              return <option key={i} value={i} disabled={(i<openTime && i>yesterdayTime) || (i>closeTime && i<tomorrowTime)}>{v}----{data.counts[i] ? data.facility.max_capacity - data.counts[i]: data.facility.max_capacity} availabilities</option>
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