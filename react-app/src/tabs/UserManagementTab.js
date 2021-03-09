import React, {useState, useEffect} from 'react'
import getWithToken from '../api/getWithToken.js'
import {useSelector} from 'react-redux'
import UsersTable from '../components/UsersTable.js'
import Alert from 'react-bootstrap/Alert'
import ModalCustom from '../components/ModalCustom.js'
import FormBase from '../components/FormBase.js'
import postWithToken from '../api/postWithToken.js'
import {useForm} from 'react-hook-form'


const UserManagementTab = () => {
  const [users, setUsers] = useState()
  const token = useSelector(state => state.token)
  const [success, setSuccess] = useState()
  const useform = useForm()

  const fetchUsers = () => {
    getWithToken('user', token)
      .then(response => response.json())
      .then(data => {data.sort((a,b) => a.id > b.id ? 1:-1); setUsers(data)})
  }

  const onSubmit = (data) => {
    data.expires_in = parseInt(data.expires_in)
    data.is_admin = data.is_admin.value
    postWithToken("user", data, token)
    .then(response => {
      setSuccess(response.status)
      if (response.status === 201) {
        fetchUsers() // refreshes table with latest get data
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
      <div>
        <UsersTable users={users} setUsers={fetchUsers} setSuccess={setSuccess} />
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
export default UserManagementTab