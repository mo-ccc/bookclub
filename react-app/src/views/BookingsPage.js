import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import {useSelector} from 'react-redux'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import Select from 'react-select'
import getWithToken from '../api/getWithToken.js'
import BookingsTable from '../components/tables/BookingsTable.js'
import {useForm, Controller} from 'react-hook-form'


const BookingsPage = ({facilities}) => {
  const [selectedDay, setSelectedDay] = useState()
  const {register, handleSubmit, control, errors, reset} = useForm()
  const [members, setMembers] = useState()
  const [tableData, setTableData] = useState()
  const token = useSelector(state => state.token)
  const def = {value:"", label:"No filter"}
  const parsedFacilities = [def].concat(Array.from(facilities.map((f, i) => ({value:f, label:f.name})))) // first value is no filter - empty. then concat the options.

  const handleDayChange = (day) => {
    setSelectedDay(day)
    //const iso = day.toISOString()
    //const requestParam = iso.substring(0, iso.indexOf("T"))
  }

  const resetClicked = () => {
    reset(
      {
        facility: {value:"", label:"No filter"},
        user: {value:"", label:"No filter"}
      }
    )
    setSelectedDay("")
  }

  const fetchResults = (data) => {
    const date = selectedDay ? selectedDay.toISOString().substring(0, selectedDay.toISOString().indexOf("T")) : null
    const requestParams = [
      [data.facility.value.id, "facility"], [data.user.value.id, "user"], [date, "date"]
    ]
    let requestUrl = "bookings-control?"
    for (let p of requestParams) {
      if (p[0]) {
        requestUrl += `${p[1]}=${p[0]}&`
      }
    }
    getWithToken(requestUrl, token)
      .then(response => response.json())
      .then(data => setTableData(data))
  }

  useEffect(() => {
    getWithToken('user', token)
      .then(response => response.json())
      .then(data => {setMembers([def].concat(Array.from(data.map((u, i) => ({value: u, label: u.name})))))})
  }, [])


  return (
    <div className="container">
      <h1>bookings</h1>
      <div className="row my-5">
        <form onSubmit={handleSubmit(fetchResults)} style={{"display": "contents"}}>
          <div className="col-12 col-md text-center">
            <p>Date: {selectedDay ? selectedDay.toLocaleDateString() : 'select a day'}</p>
            <DayPickerInput inputProps={{style: {"padding": "6px 32px", "display": "block", "border": "1px solid grey"}}} showOverlay={false} hideOnDayClick={true} onDayChange={handleDayChange} />
          </div>
          <div className="col-12 col-md text-center">
            <p>facility filter</p>
            <Controller as={Select} name="facility" options={parsedFacilities} control={control} ref={register()} defaultValue={def}/>
          </div>
          <div className="col-12 col-md text-center">
            <p>member filter</p>
            <Controller as={Select} name="user" options={members} control={control} ref={register()} defaultValue={def} />
          </div>
          <div className="col-12 col-md">
            <Button variant="dark" onClick={resetClicked}>reset</Button>
            <input type="submit" className="btn btn-primary m-3"/>
          </div>
        </form>
      </div>
      <div className="row">
        <BookingsTable tableData={tableData} facilities={facilities} resetData={fetchResults}/>
      </div>
    </div>
  )
}
export default BookingsPage