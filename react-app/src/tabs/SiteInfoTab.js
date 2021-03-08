import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import getWithToken from '../api/getWithToken.js'
import PatchFormBase from '../components/PatchFormBase.js'
import patchWithToken from '../api/patchWithToken.js'
import Alert from 'react-bootstrap/Alert'
import {useForm} from 'react-hook-form'

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
    .then(response => {
      setSuccess(response.status)
      useform.reset()
      if (response.status === 200) {
        setData(response.json())
      }
      return response
  })}
  return (
    <div className="w-50 p-3 ml-5">
      <h2>Edit account info</h2>
      <hr/>
      <PatchFormBase fields={["domain_name", "description", "statement", "location", ["open_registration", 1], "phone", "default_account_expiry_time"]} useForm={useform} defaultData={data} onSubmit={onSubmit}/>
      {success &&
        <Alert variant="primary" onClose={() => setSuccess("")} dismissible>
          <p>
            {success}
          </p>
        </Alert>
      }
    </div>
  )
}
export default SiteInfoTab