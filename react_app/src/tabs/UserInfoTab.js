import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { getWithToken, patchWithToken } from '../api/api_utils.js'
import FormBase2 from '../components/FormBase2.js'

import {useForm} from 'react-hook-form'
import store from '../redux/store.js'
import {setNotification} from '../redux'

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

const UserInfoTab = () => {
  const [ userData, setUserData ] = useState()
  const token = useSelector(state => state.auth.token)
  const fetchData = () => {
    getWithToken('myuser', token)
    .then(response => response.json())
    .then(data => {setUserData(data); return data})
  }

  useEffect(() =>{
    fetchData()
  }, [])

  const fields = [
    {name: "name", label: "change name", placeholder: "new name", inputType:"text"},
    {name: "email", label: "change email", placeholder: "new email", inputType:"email"},
    {name: "password", label: "change password", placeholder: "enter a new password or leave me blank", inputType:"password"}
  ]
  const schema = yup.object().shape({
    name: yup.string().required().max(30).matches(/^[a-zA-z ]*$/, "new name must contain only letters and whitespaces").label("new name"),
    email: yup.string().required().max(30).label("new email"),
    password: yup.string().test("six or empty", "${path} must be at least 6 characters in length or left blank", (value) => value.length > 6 || !value)
  })
  const useform = useForm({resolver: yupResolver(schema)})
  

  const onSubmit = (data) => {
    if (!data.password) {
      delete data.password
    }
    patchWithToken('myuser', data, token)
    .then(response => {
      response.ok ? store.dispatch(setNotification("updated succesfully", "primary")) : store.dispatch(setNotification("an issue occurred", "danger"))
      useform.reset()
      if (response.ok) {
        response.json().then(jsond => setUserData(jsond))
      }
      return response
    })}

  return (
    <div className="container">
      <h2>Edit account info</h2>
      <hr/>
      <div className="container" style={{maxWidth: 800}}>
        <FormBase2 fields={fields} useForm={useform} defaultData={userData} onSubmit={onSubmit}/>
      </div>
      <div className="card p-2 m-4 mt-5">
        <h6>Your membership expires: {userData?.expires_on.substring(0, userData?.expires_on.indexOf("T"))}</h6>
      </div>
    </div>
  )
}

export default UserInfoTab