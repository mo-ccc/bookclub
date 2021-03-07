import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import getWithToken from '../api/getWithToken.js'
import UpdateUser from '../components/UpdateUser.js'
import patchWithToken from '../api/patchWithToken.js'
import Alert from 'react-bootstrap/Alert'
import {useForm} from 'react-hook-form'

const UserInfoTab = () => {
  const [ data, setData ] = useState()
  const [ success, setSuccess ] = useState()
  const useform = useForm()

  const token = useSelector(state => state.token)
  const fetchData = () => {
    
    getWithToken('myuser', token)
    .then(response => response.json())
    .then(data => {setData(data); return data})
    .catch(error => console.log(error))
  }

  useEffect(() =>{
    fetchData()
  }, [])

  const onSubmit = (data) => {
    patchWithToken('myuser', data,token)
    .then(response => {
      setSuccess(response.status)
      useform.reset()
      fetchData()
      return response
    })}

  return (
    <div className="w-50 p-3 ml-5">
      <h2>Edit account info</h2>
      <hr/>
      <UpdateUser useForm={useform} defaultData={data} onSubmit={onSubmit}/>
      <div className="card p-2 m-4 mt-5">
        <h6>Your membership expires: {data && data.expires_on.substring(0, data.expires_on.indexOf("T"))}</h6>
      </div>
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

export default UserInfoTab