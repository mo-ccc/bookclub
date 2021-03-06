import React from 'react'
import {useSelector} from 'react-redux'
import FormBase2 from '../components/FormBase2.js'
import { deleteWithToken, patchWithToken } from '../api/api_utils.js'
import {useForm} from 'react-hook-form'
import ModalCustom from '../components/ModalCustom.js'
import Button from 'react-bootstrap/Button'
import store from '../redux/store.js'
import {setNotification} from '../redux'

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

const SiteInfoTab = ({tabData}) => {
  const fields = [
    {name: "domain_name", label: "domain name", placeholder: "a domain name is needed for users to visit this site", inputType: "text"},
    {name: "description", label: "description", placeholder: "a description helps introduce users to this site", inputType: "text"},
    {name: "statement", label: "statement", placeholder: "craft a short statement that fits under the description on the homepage", inputType: "text"},
    {name: "location", label: "location", placeholder: "help members find your physical premises", inputType: "text"},
    {name: "phone", label: "phone", placeholder: "a phone for visitors to contact", inputType: "text"},
    {name: "open_registration", label: "allow visitors to register?", inputType: "bool"},
    {name: "default_account_expiry_time", label: "how many days should a registered users account be active for?", placeholder: "days", inputType: "number"}
  ]

  const schema = yup.object().shape({
    domain_name: yup.string().max(10).required().matches(/^[a-zA-z0-9 ]*$/, "domain name must not contain any special characters").label("domain name"),
    description: yup.string().max(1000),
    statement: yup.string().max(1000),
    location: yup.string().max(500),
    default_account_expiry_time: yup.number().integer().positive().label("default account expiry time")
  })
  const useform = useForm({resolver: yupResolver(schema)})

  const token = useSelector(state => state.auth.token)

  const onSubmit = (data) => {
    data.open_registration = data.open_registration.value
    patchWithToken('', data, token)
    .then(response => response.json()
    .then(new_data => {
      useform.reset()
      if (response.ok) {
        window.location.replace(`${process.env.REACT_APP_PROTOCOL}://${new_data.domain_name}.${process.env.REACT_APP_DOMAIN}`)
      }else{
        store.dispatch(setNotification("an error occurred", "danger"))
      }
  }))}

  const handleDelete = () => {
    deleteWithToken('', token)
    .then(response => {
      if (response.ok) {
        window.location.replace(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}`)
      }
    })
  }

  const uploadForm = useForm()
  const handleUpload = (data) => {
    console.log(data)
    let formData = new FormData()
    formData.append('image', data.image[0])
    const domain = window.location.hostname.split(".")[0]
    fetch(`${process.env.REACT_APP_PROTOCOL}://${domain}.${process.env.REACT_APP_HOST}/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
    }).then(response => {
      if (response.ok) {
        store.dispatch(setNotification("successfully updated image", "primary"))
      }else {
        store.dispatch(setNotification("an error occurred", "danger"))
      }
    })
  }
  return (
    <div className="container">
      <h2>Edit site info</h2>
      <hr/>
      <div className="container" style={{maxWidth: 800}}>
        <FormBase2 fields={fields} useForm={useform} defaultData={tabData} onSubmit={onSubmit}/>
      </div>
      <br/>
      <h2>Update Homepage Image</h2>
      <hr/>
      <div className="container" style={{maxWidth: 800}}>
        <form onSubmit={uploadForm.handleSubmit(handleUpload)}>
          <input type="file" ref={uploadForm.register} name="image" accept="image/*"/>
          <input type="submit" className="btn btn-primary"/>
        </form>
      </div>
      <hr/>
      <ModalCustom label="delete domain" title="are you sure you want to delete?">
        <Button variant="danger" onClick={handleDelete}>Yes</Button>
      </ModalCustom>
    </div>
  )
}
export default SiteInfoTab