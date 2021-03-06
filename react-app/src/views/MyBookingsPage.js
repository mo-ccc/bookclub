import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import getWithToken from '../api/getWithToken.js'
import Booking from '../components/Booking.js'


const MyBookingsPage = ({facilities}) => {
  const token = useSelector(state => state.token)
  const [bookings, setBookings] = useState("")

  useEffect(() => {
    getWithToken('booking-history', token)
    .then(
      response => (response.json())
    ).then(
      data => {
        setBookings(data)
        return data
  })}, [])

  const locateFacility = (id) => {
    for (let x of facilities) {
      if (x.id == id) {
        return x.name
      }
    }
    return "unknown"
  }

  return (
    <div className="container">
      <div className="row">
        {bookings && bookings.map((item, i)=>{
          return (<div className="col-4"><Booking key={i} name={locateFacility(item.facility_id)} date={item.date} timeslot={item.timeslot} checkDates={true}/></div>)
        })}
      </div>
    </div>
  )
}

export default MyBookingsPage