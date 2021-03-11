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

      setTimeslot(data.facility.availabilities.open)

      return data
    })
  }

  const handleSubmit = () => {
    setSuccess("")

    const iso = selectedDay.toISOString()
    const requestParam = iso.substring(0, iso.indexOf("T"))

    postWithToken(
      `facility/${fid}`, 
      {"date": requestParam, "timeslot": timeslot}, token
      ).then(response => {
      response.ok ? setSuccess("Booking succeeded"):setSuccess("Booking failed")
    }).catch(error => console.log(error))
  }


  return (
    <div className="row">
      <div className="col-10 col-md-5 mb-3">
        {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
        {!selectedDay && <p>Choose a day</p>}
        <DayPickerInput showOverlay={true} hideOnDayClick={false} onDayChange={handleDayChange} dayPickerProps={{disabledDays:{before: new Date()}}}/>
      </div>
      <div className="col-10 col-md-5 mb-2">
        <TimePicker data={fetchData} timeslot={timeslot} setTimeSlot={handleSetTimeslot}/>
        <Button className="mt-3" onClick={handleSubmit}>Book</Button>
        <h4>{success}</h4>
      </div>
    </div>
  )
}

export default DayPicker