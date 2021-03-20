import React, {useState, useEffect} from 'react'
import getWithToken from '../api/getWithToken.js'
import {useSelector} from 'react-redux'
import UsersTable from '../components/tables/UsersTable.js'
import ModalCustom from '../components/ModalCustom.js'
import FormBase from '../components/FormBase.js'
import postWithToken from '../api/postWithToken.js'
import {useForm} from 'react-hook-form'

import store from '../redux/store.js'
import {setNotification} from '../redux'


const UserManagementTab = () => {
  const [users, setUsers] = useState()
  const token = useSelector(state => state.auth.token)
  const [success, setSuccess] = useState()
  const useform = useForm()

  const fetchUsers = () => {
    getWithToken('user', token)
      .then(response => response.json())
      .then(data => {data.sort((a,b) => a.id > b.id ? 1:-1); setUsers(data)})
  }

  const onSubmit = (data) => {
    data.expires_in = parseInt(data.expires_in)
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
          <FormBase fields={["name", "email", "password", ["expires_in",2]]} useForm={useform} onSubmit={onSubmit} is_post={true}/>
        </ModalCustom>
      </div>
      <div className="table-responsive">
        <UsersTable users={users} setUsers={fetchUsers} setSuccess={setSuccess} />
      </div>
    </div>
  )
}
export default UserManagementTab