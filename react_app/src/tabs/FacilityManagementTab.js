import React from 'react'
import Button from 'react-bootstrap/Button'
import Facility from '../components/Facility.js'
import ModalCustom from '../components/ModalCustom.js'
import FormBase2 from '../components/FormBase2.js'
import { patchWithToken } from '../api/api_utils.js'
import { postWithToken } from '../api/api_utils.js'
import { deleteWithToken } from '../api/api_utils.js'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import store from '../redux/store.js'
import {setNotification} from '../redux'
import times from '../statics/json/times.json'

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import * as flatten from 'flat'

const FacilityManagementTab = ({triggerFetchFacility, facilities}) => {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  const fields = [
    {name: "name", label: "facility name", placeholder: "enter a name for the facility", inputType: "text"},
    {name: "description", label: "facility description", placeholder: "enter a nice description for the facility", inputType: "text"},
    {name: "disabled", label: "is disabled (no bookings allowed)", inputType: "bool"},
  ]
  const availabilitiesSchema = {}
  for (let day of days) { // adds the day opening/closing select fields
    fields.push({inputType: "flex", fields:[
        {name: `availabilities.${day}Start`, label: `${day} opening time`, inputType: "select", options: times.concat(["11:59 PM"]).map(time => ({label: time}))},
        {name: `availabilities.${day}End`, label: `${day} closing time`, inputType: "select", options: times.concat(["11:59 PM"]).map(time => ({label: time}))}
      ]
    })
    availabilitiesSchema[`${day}Start`] = yup.number().min(0).max(48)
    availabilitiesSchema[`${day}End`] = yup.number().min(0).max(48)
  }

  const schema = yup.object().shape({
    availabilities: yup.object().shape(
      availabilitiesSchema // lazy way to generate the schema
    ),
    name: yup.string().max(20),
    description: yup.string().max(20)
  })

  const patchForm = useForm()
  const postForm = useForm({resolver: yupResolver(schema), })
  const token = useSelector(state => state.auth.token)
  
  const patchSubmit = (data, id) => {
    Object.keys(data.availabilities).forEach(item => data.availabilities[item] = data.availabilities[item].value)

    patchWithToken(`facility/${id}`, data, token)
      .then(response => {
        if (response.ok) {
          triggerFetchFacility()
          store.dispatch(setNotification("updated facility", "primary"))
        }else {
          patchForm.reset()
          store.dispatch(setNotification("an error occured", "danger"))
        }
        return response
      })
  }
  const postSubmit = (data) => {
    console.log(data)

    postWithToken("facility", data, token)
      .then(response => {
        if (response.ok) {
          triggerFetchFacility()
          store.dispatch(setNotification("created facility", "primary"))
        }else {
          patchForm.reset()
          store.dispatch(setNotification("an error occured", "danger"))
        }
        return response
      })
  }
  const handleDelete = (e, id) => {
    deleteWithToken(`facility/${id}`, token)
      .then(response => {
        if (response.ok) {
          triggerFetchFacility()
          store.dispatch(setNotification("deleted facility", "primary"))
        }else {
          store.dispatch(setNotification("an error occured", "danger"))
        }
      })
  }


  return(
    <div>
      <div className="container">
        <h1>Facility Management</h1>
        <hr/>
        <div className="row">
          {facilities && facilities.map((item, i) => (
            <div className="col-12 col-md-3" key={item.name}>
              <Facility  data={item} edit={true}>
                <ModalCustom label="edit" title={item.name} size="lg">
                  <FormBase2 fields={fields} useForm={patchForm} defaultData={flatten(item)} onSubmit={d => patchSubmit(d, item.id)}/>
                  <hr />
                  <ModalCustom label="delete facility" title={`Are you sure you want to delete ${item.name}?`}>
                    <Button variant="danger" onClick={e => handleDelete(e, item.id)}>Yes. Delete!</Button>
                  </ModalCustom>
                </ModalCustom>
              </Facility>
            </div>
          ))}
          <div className="col-12 col-md-3">
            <ModalCustom label="+" title="adding new facility" variant="outline-dark" size="lg" >
              <FormBase2 fields={fields} useForm={postForm} onSubmit={postSubmit} defaultData={{"availabilities.mondayEnd": 48, "availabilities.tuesdayEnd": 48, "availabilities.wednesdayEnd": 48, "availabilities.thursdayEnd": 48, "availabilities.fridayEnd": 48, "disabled": "false"}}/>
            </ModalCustom>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default FacilityManagementTab