import React, {useEffect, useState} from 'react'
import getWithToken from '../api/getWithToken.js'
import {useSelector} from 'react-redux'
import Booking from '../components/Booking.js'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

const RecentlyBooked = (props) => {
  const token = useSelector(state => state.auth.token)
  const [lastThree, setLastThree] = useState("")

  
  const locateFacility = (id) => {
    for (let x of props.facilities) {
      if (x.id == id) {
        return x.name
      }
    }
    return "unknown"
  }

  const getLastThree = () => {
    getWithToken('booking-history/3', token)
    .then(response => (response.json()))
    .then(
      data => {
        setLastThree(data)
    })
  }

  useEffect(() => {
    getLastThree()
  }, [])

  return(
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8">
          {props.render(getLastThree)}
        </div>
        <div className="col-11 col-md-4 border-left border-top mt-2">
          <h4 className="mb-3 mt-3">Recently Booked</h4>
          {lastThree && lastThree.map((item, i) =>{
            return (
              <Booking key={i} name={locateFacility(item.facility_id)} data={item}/>
            )
          })}
          <Link to="/history"><Button className="d-block mx-auto">View full history</Button></Link>
        </div>
      </div>
    </div>
  )
}

export default RecentlyBooked