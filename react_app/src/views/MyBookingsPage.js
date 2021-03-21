import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import getWithToken from '../api/getWithToken.js'
import Booking from '../components/Booking.js'
import SortSelector from '../components/SortSelector.js'


const MyBookingsPage = ({facilities}) => {
  const token = useSelector(state => state.auth.token)
  const [activeBookings, setActiveBookings] = useState("")
  const [inActiveBookings, setInActiveBookings] = useState("")

  const getData = () => {
    getWithToken('booking-history', token)
    .then(
      response => (response.json())
    ).then(
      data => {
        let activeList = []
        let inactiveList = []
        for (let x of data) {
          if (new Date(x.date) < new Date()) {
            inactiveList.push(x)
          }else {
            activeList.push(x)
          }
        }
        setActiveBookings(activeList)
        setInActiveBookings(inactiveList)
        return data
      })
  }

  useEffect(() => {
    getData()
  }, [])

  const locateFacility = (id) => {
    for (let x of facilities) {
      if (x.id == id) {
        return x.name
      }
    }
    return "unknown"
  }
  const sortBookings = (event, state, stateSetter) => {
    let method = Number(event.target.value)
    let list = [...state]
    switch (method) {
      case 0:
        list.sort((a, b) => (a.id < b.id) ? 1 : -1)
        stateSetter(list)
        break

      case 1:
        list.sort((a, b) => (a.id > b.id) ? 1 : -1)
        stateSetter(list)
        break
      
      case 2:
        list.sort((a, b) => (new Date(a.date) < new Date(b.date))? 1: -1)
        stateSetter(list)
        break

      case 3:
        list.sort((a, b) => (new Date(a.date) > new Date(b.date))? 1: -1)
        stateSetter(list)
        break
    
      default: 
        console.log("not found")
    }
  }

  return (
    <div className="container">
      <div className="row m-4">
        <h2 className="mr-5">active bookings</h2>
        <SortSelector onChangeFunc={(event) => sortBookings(event, activeBookings, setActiveBookings)}/>
      </div>
      <div className="row">
        {activeBookings && activeBookings.map((item, i)=>{
          return (<div className="col-12 col-md-4"><Booking key={i} name={locateFacility(item.facility_id)} data={item} showCancelButton={true} getData={getData} /></div>)
        })}
      </div>
      <hr/>
      <div className="row m-4">
        <h2 className="mr-5">inactive bookings</h2>
        <SortSelector onChangeFunc={(event) => sortBookings(event, inActiveBookings, setInActiveBookings)}/>
      </div>
      <div className="row">
        {inActiveBookings && inActiveBookings.map((item, i)=>{
          return (<div className="col-12 col-md-4"><Booking key={i} name={locateFacility(item.facility_id)} data={item} getData={getData} /></div>)
        })}
      </div>
    </div>
  )
}

export default MyBookingsPage