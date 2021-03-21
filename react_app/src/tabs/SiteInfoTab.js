import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import getWithToken from '../api/getWithToken.js'
import FormBase from '../components/FormBase.js'
import deleteWithToken from '../api/deleteWithToken.js'
import patchWithToken from '../api/patchWithToken.js'
import {useForm} from 'react-hook-form'
import ModalCustom from '../components/ModalCustom.js'
import Button from 'react-bootstrap/Button'
import store from '../redux/store.js'
import {setNotification} from '../redux'

const SiteInfoTab = ({data}) => {
  const useform = useForm()

  const token = useSelector(state => state.auth.token)

  const onSubmit = (data) => {
    data.open_registration = data.open_registration.value
    patchWithToken('', data, token)
    .then(response => response.json()
    .then(new_data => {
      useform.reset()
      if (response.ok) {
        window.location.replace(`http://${new_data.domain_name}.${process.env.REACT_APP_DOMAIN}`)
      }else{
        store.dispatch(setNotification("an error occurred", "danger"))
      }
  }))}

  const handleDelete = () => {
    deleteWithToken('', token)
    .then(response => {
      if (response.status === 200) {
        window.location.replace(`http://${process.env.REACT_APP_DOMAIN}`)
      }
    })
  }
  return (
    <div className="w-100">
      <h2>Edit site info</h2>
      <hr/>
      <FormBase fields={["domain_name", "description", "statement", "location", "open_registration", "phone", ["default_account_expiry_time", 2]]} useForm={useform} defaultData={data} onSubmit={onSubmit}/>
      <hr/>
      <ModalCustom label="delete domain" title="are you sure you want to delete?">
        <Button variant="danger" onClick={handleDelete}>Yes</Button>
      </ModalCustom>
    </div>
  )
}
export default SiteInfoTab