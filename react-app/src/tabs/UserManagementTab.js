import React, {useState, useEffect} from 'react'
import getWithToken from '../api/getWithToken.js'
import {useSelector} from 'react-redux'
import UsersTable from '../components/UsersTable.js'
import Alert from 'react-bootstrap/Alert'


const UserManagementTab = () => {
  const [users, setUsers] = useState()
  const token = useSelector(state => state.token)
  const [success, setSuccess] = useState()

  const fetchUsers = () => {
    getWithToken('user', token)
      .then(response => response.json())
      .then(data => {data.sort((a,b) => a.id > b.id ? 1:-1); setUsers(data)})
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <UsersTable users={users} setUsers={fetchUsers} setSuccess={setSuccess} />
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