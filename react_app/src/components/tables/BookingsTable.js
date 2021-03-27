import React, {useState} from 'react'
import ModalCustom from '../ModalCustom.js'
import {useSelector} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { deleteWithToken } from '../../api/api_utils.js'
import times from '../../statics/json/times.json'

const BookingsTable = ({facilities, tableData, resetData}) => {
  const token = useSelector(state => state.auth.token)
  const [success, setSuccess] = useState()
  const getFacilityNameFromId = (id) => {
    for (let facility of facilities) {
      if (facility.id == id) {
        return facility.name
      }
    }
  }
  const handleDelete = (e, id) => {
    deleteWithToken(`bookings-control/${id}`, token)
      .then(response => {
        if (response.status === 200) {
          setSuccess("success! refresh the table before making any further modifications")
        }
        return response
      })
  }

  return(
    <table className="table table-bordered table-sm table-hover">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Email</th>
          <th scope="col">Name</th>
          <th scope="col">Facility</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        {tableData &&
          tableData.map((item, i) => (
            <tr>
              <th scope="row" key={i}>{item.id}</th>
              <td>{item.user.email}</td>
              <td>{item.user.name}</td>
              <td>{facilities && getFacilityNameFromId(item.facility_id)}</td>
              <td>{item.date}</td>
              <td>{times[item.timeslot]}</td>
              <td>
                <ModalCustom label="delete" title={`are you sure you want to delete booking for ${item.user.name} on date: ${item.date}?`}>
                  <Button variant="danger" onClick={e => handleDelete(e, item.id)}>Yes. Delete!</Button>
                  {success &&
                    <Alert variant="primary" onClose={() => setSuccess("")} dismissible>
                      <p>
                        {success}
                      </p>
                    </Alert>
                  }
                </ModalCustom>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default BookingsTable