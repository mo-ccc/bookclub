import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import getWithToken from '../api/getWithToken.js'
import FormBase from '../components/FormBase.js'
import deleteWithToken from '../api/deleteWithToken.js'
import patchWithToken from '../api/patchWithToken.js'
import Alert from 'react-bootstrap/Alert'
import {useForm} from 'react-hook-form'
import ModalCustom from '../components/ModalCustom.js'
import Button from 'react-bootstrap/Button'

const SiteInfoTab = () => {
  const [ data, setData ] = useState()
  const [ success, setSuccess ] = useState()
  const useform = useForm()

  const token = useSelector(state => state.token)
  const fetchData = () => {
    getWithToken('', token)
    .then(response => response.json())
    .then(data => {setData(data); return data})
    .catch(error => console.log(error))
  }

  useEffect(() =>{
    fetchData()
  }, [])

  const onSubmit = (data) => {
    data.open_registration = data.open_registration.value
    patchWithToken('', data, token)
    .then(response => response.json()
    .then(data => {
      setSuccess(response.status)
      useform.reset()
      if (response.status === 200) {
        setData(data)
      }
      return response
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
    <div className="w-50 p-3 ml-5">
      <h2>Edit site info</h2>
      <hr/>
      <FormBase fields={["domain_name", "description", "statement", "location", ["open_registration", 1], "phone", "default_account_expiry_time"]} useForm={useform} defaultData={data} onSubmit={onSubmit}/>
      {success &&
        <Alert variant="primary" onClose={() => setSuccess("")} dismissible>
          <p>
            {success}
          </p>
        </Alert>
      }
      <hr/>
      <ModalCustom label="delete domain" title="are you sure you want to delete?">
        <Button variant="danger" onClick={handleDelete}>Yes</Button>
      </ModalCustom>
    </div>
  )
}
export default SiteInfoTab