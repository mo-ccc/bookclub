import React, {useState, useEffect} from 'react'
import {getWithToken, postWithToken} from '../api/api_utils.js'
import {useSelector} from 'react-redux'
import UsersTable from '../components/tables/UsersTable.js'
import ModalCustom from '../components/ModalCustom.js'
import FormBase2 from '../components/FormBase2.js'

import {useForm} from 'react-hook-form'

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import store from '../redux/store.js'
import {setNotification} from '../redux'


const UserManagementTab = () => {
  const [users, setUsers] = useState()
  const token = useSelector(state => state.auth.token)

  const fields = [
    {name: "name", label: "name", placeholder: "name for new user", inputType: "text"},
    {name: "email", label: "email", placeholder: "email for new user", inputType: "email"},
    {name: "password", label: "password", placeholder: "password for new user", inputType: "password"},
    {name: "expires_in", label: "days until membership expiry", placeholder: "days", inputType: "number"}
  ]
  const schema = yup.object().shape({
    name: yup.string().required().max(30).matches(/^[a-zA-z ]*$/, "name must contain only letters and whitespaces"),
    email: yup.string().required().max(30).label("email"),
    password: yup.string().required().min(6),
    expires_in: yup.number().integer().positive().label("days until expiry")
  })

  const useform = useForm({resolver: yupResolver(schema), })

  const fetchUsers = () => {
    getWithToken('user', token)
      .then(response => response.json())
      .then(data => {data.sort((a,b) => a.id > b.id ? 1:-1); setUsers(data)})
  }

  const onSubmit = (data) => {
    postWithToken("user", data, token)
    .then(response => {
      if (response.ok) {
        store.dispatch(setNotification("user added", "primary"))
        fetchUsers() // refreshes table with latest get data
      }else {
        store.dispatch(setNotification("an error occurred", "danger"))
      }
      return response
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <div className="text-center p-3">
        <ModalCustom label="add new user" title="Creating a new user">
          <FormBase2 fields={fields} useForm={useform} onSubmit={onSubmit}/>
        </ModalCustom>
      </div>
      <div className="table-responsive">
        <UsersTable users={users} setUsers={fetchUsers} />
      </div>
    </div>
  )
}
export default UserManagementTab