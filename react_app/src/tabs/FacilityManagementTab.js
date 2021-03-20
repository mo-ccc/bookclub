import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import getNoToken from '../api/getNoToken.js'
import Facility from '../components/Facility.js'
import ModalCustom from '../components/ModalCustom.js'
import FormBase from '../components/FormBase.js'
import patchWithToken from '../api/patchWithToken.js'
import postWithToken from '../api/postWithToken.js'
import deleteWithToken from '../api/deleteWithToken.js'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import availabilitiesJson from '../statics/json/availabilities.json'
import store from '../redux/store.js'
import {setNotification} from '../redux'

const FacilityManagementTab = ({triggerFetchFacility, facilities}) => {
  const patchForm = useForm()
  const postForm = useForm()
  const token = useSelector(state => state.auth.token)
  
  const patchSubmit = (data, id) => {
    data.disabled = data.disabled.value
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
    data.disabled = data.disabled.value
    Object.keys(data.availabilities).forEach(item => data.availabilities[item] = data.availabilities[item].value)
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
        if (response.status === 200) {
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
            <div className="col-12 col-md-3">
            <Facility key={i} data={item} edit={true}>
              <ModalCustom label="edit" title={item.name} size="lg">
                <FormBase fields={["name", "description", ["disabled", 1], ["max_capacity", 2]]} useForm={patchForm} defaultData={item} nestedData={[["availabilities", item.availabilities, availabilitiesJson]]} onSubmit={d => patchSubmit(d, item.id)}/>
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
              <FormBase fields={["name", "description", ["disabled", 1], ["max_capacity", 2]]} useForm={postForm} nestedData={[["availabilities", false, availabilitiesJson]]} is_post={true} onSubmit={postSubmit}/>
            </ModalCustom>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default FacilityManagementTab