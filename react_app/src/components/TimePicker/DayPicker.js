import React, {useState} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TimePicker from './TimePicker.js'
import Button from 'react-bootstrap/Button'
import getNoToken from '../../api/getNoToken.js'
import postWithToken from '../../api/postWithToken.js'
import {useSelector} from 'react-redux'

const DayPicker = ({fid, getLastThree}) => {
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [fetchData, setFetchData] = useState("")
  const [timeslot, setTimeslot] = useState("")
  const [success, setSuccess] = useState("")
  const token = useSelector(state => state.auth.token)

  const handleSetTimeslot = (selected) => {
    setTimeslot(selected)
  }

  const updateTimePicker = (rquest, setT) => {
    getNoToken(rquest)
    .then(request => request.json())
    .then(data => {
      setFetchData(data)

      setT && setTimeslot(data.facility.availabilities.open)

      return data
    })
  }

  const handleDayChange = (day) =>{
    setSelectedDay(day)
    const iso = day.toISOString()
    const requestParam = iso.substring(0, iso.indexOf("T"))
    updateTimePicker(`facility/${fid}/${requestParam}`, true)
  }

  const handleSubmit = () => {
    setSuccess("")

    const iso = selectedDay.toISOString()
    const requestParam = iso.substring(0, iso.indexOf("T"))

    postWithToken(
      `facility/${fid}`, 
      {"date": requestParam, "timeslot": timeslot}, token
      ).then(response => {
      if (response.ok) {
        setSuccess("Booking succeeded")
        getLastThree()
        updateTimePicker(`facility/${fid}/${requestParam}`, false)
      }else {
        setSuccess("Booking failed")
      }
    })
  }


  return (
    <div className="row">
      <div className="col-10 col-md-5 mb-3">
        {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
        {!selectedDay && <p>Choose a day</p>}
        <DayPickerInput showOverlay={true} hideOnDayClick={false} onDayChange={handleDayChange} dayPickerProps={{disabledDays:{before: new Date()}}}/>
      </div>
      <div className="col-10 col-md-5 mb-2">
        <TimePicker data={fetchData} timeslot={timeslot} setTimeSlot={handleSetTimeslot} selectedDay={selectedDay}/>
        <Button className="mt-3" onClick={handleSubmit}>Book</Button>
        <h4>{success}</h4>
      </div>
    </div>
  )
}

export default DayPicker