import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import getWithToken from '../api/getWithToken.js'
import FormBase from '../components/FormBase.js'
import patchWithToken from '../api/patchWithToken.js'
import {useForm} from 'react-hook-form'
import store from '../redux/store.js'
import {setNotification} from '../redux'

const UserInfoTab = () => {
  const [ data, setData ] = useState()
  const useform = useForm()

  const token = useSelector(state => state.auth.token)
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
      response.ok ? store.dispatch(setNotification("updated succesfully", "primary")) : store.dispatch(setNotification("an issue occurred", "danger"))
      useform.reset()
      if (response.status === 200) {
        response.json().then(jsond => setData(jsond))
      }
      return response
    })}

  return (
    <div className="w-100">
      <h2>Edit account info</h2>
      <hr/>
      <FormBase fields={["name", "email", "password"]} useForm={useform} defaultData={data} onSubmit={onSubmit}/>
      <div className="card p-2 m-4 mt-5">
        <h6>Your membership expires: {data && data.expires_on.substring(0, data.expires_on.indexOf("T"))}</h6>
      </div>
    </div>
  )
}

export default UserInfoTab