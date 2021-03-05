import React, {useState} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TimePicker from './TimePicker.js'
import Button from 'react-bootstrap/Button'
import getNoToken from '../../api/getNoToken.js'
import postWithToken from '../../api/postWithToken.js'
import {useSelector} from 'react-redux'

const DayPicker = ({fid}) => {
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [fetchData, setFetchData] = useState("")
  const [timeslot, setTimeslot] = useState("")
  const [success, setSuccess] = useState("")
  const token = useSelector(state => state.token)

  const handleSetTimeslot = (selected) => {
      setTimeslot(selected)
  }

  const handleDayChange = (day) =>{
    setSelectedDay(day)
    const iso = day.toISOString()
    const requestParam = iso.substring(0, iso.indexOf("T"))
    getNoToken(`facility/${fid}/${requestParam}`)
    .then(request => request.json())
    .then(data => {
      console.log(data)
      setFetchData(data)
      return data
    })
  }

  const handleSubmit = () => {
    setSuccess("")
    console.log(selectedDay)
    let new_date = new Date(selectedDay.valueOf())
    console.log(timeslot)
    let d = new Date()
    let n = d.getTimezoneOffset()/30
    console.log(n)
    new_date.setMinutes(new_date.getMinutes() + n)
    const iso = new_date.toISOString()
    const requestParam = iso.substring(0, iso.indexOf("T"))
    console.log(requestParam)
    if (timeslot < 0){
      timeslot = 48 + timeslot
    }
    postWithToken(
      `facility/${fid}`, 
      {"date": requestParam, "timeslot": timeslot}, token
      ).then(response => {
      response.ok ? setSuccess("Booked"):setSuccess("Booking failed")
    }).catch(error => console.log(error))
  }

  return (
    <div className="row">
      <div className="col">
        {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
        {!selectedDay && <p>Choose a day</p>}
        <DayPickerInput onDayChange={handleDayChange} />
      </div>
      <div className="col">
        <TimePicker data={fetchData} timeslot={timeslot} setTimeSlot={handleSetTimeslot}/>
        <Button onClick={handleSubmit}>Book</Button>
        <h4>{success}</h4>
      </div>
    </div>
  )
}

export default DayPicker