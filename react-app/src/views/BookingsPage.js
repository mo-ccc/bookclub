import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import {useSelector} from 'react-redux'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import Select from 'react-select'
import getWithToken from '../api/getWithToken.js'
import placeholder from '../statics/images/placeholder.jpg'


const BookingsPage = ({facilities}) => {
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [members, setMembers] = useState()
  const token = useSelector(state => state.token)
  const parsedFacilities = Array.from(facilities.map((f, i) => ({value:f, label:f.name})))

  const handleDayChange = (day) => {
    setSelectedDay(day)
    //const iso = day.toISOString()
    //const requestParam = iso.substring(0, iso.indexOf("T"))
  }

  const resetClicked = () => {}

  useEffect(() => {
    getWithToken('user', token)
      .then(response => response.json())
      .then(data => {setMembers(Array.from(data.map((u, i) => ({value: u, label: u.name}))))})
  }, [])


  return (
    <div className="container">
      <h1>bookings</h1>
      <div className="row m-5">
        <div className="col">
          <DayPickerInput inputProps={{style: {"padding": "6px 32px", "display": "block", "border": "1px solid grey"}}} showOverlay={false} hideOnDayClick={true} onDayChange={handleDayChange} />
        </div>
        <div className="col">
          <Select options={parsedFacilities}/>
        </div>
        <div className="col">
          <Select options={members}/>
        </div>
        <div className="col">
          <Button>reset</Button>
          <Button className="ml-2">submit</Button>
        </div>
      </div>
      <div className="row">
        <table className="table table-bordered table-sm table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Booking id</th>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">Facility</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default BookingsPage