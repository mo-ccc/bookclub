import React from 'react'
import ModalCustom from './ModalCustom.js'
import {useForm} from 'react-hook-form'
import FormBase from './FormBase.js'
import patchWithToken from '../api/patchWithToken.js'
import {useSelector} from 'react-redux'
import Button from 'react-bootstrap/Button'
import deleteWithToken from '../api/deleteWithToken.js'

const UsersTable = ({users, setUsers, setSuccess}) => {

    const useform = useForm()
    const token = useSelector(state => state.token)
    const permissions = JSON.parse(atob(token.split('.')[1]))

    const onSubmit = (data, idOfUser) => {
      data.expires_in = parseInt(data.expires_in)
      data.is_admin = data.is_admin.value
      patchWithToken(`user/${idOfUser}`, data ,token)
      .then(response => {
        setSuccess(response.status)
        if (response.status === 200) {
          setUsers() // refreshes table with latest get data
        }
        return response
    })}

    const handleDelete = (e, idOfUser) => {
      deleteWithToken(`user/${idOfUser}`, token)
        .then(response => {
          if (response.status === 200) {
            setUsers()
          }
          return response
        })
    }


    const processExpireOn = (date) => {
      return Math.round((new Date(date) - new Date())/(24 * 60 * 60 * 1000))
    }

    return (
      <table className="table table-bordered table-sm table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">is_admin</th>
            <th scope="col">is_owner</th>
            <th scope="col">created on</th>
            <th scope="col">expires on</th>
            <th scope="col">edit</th>
          </tr>
        </thead>
        <tbody>
          { users &&
            users.map((user, i) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.is_admin.toString()}</td>
                <td>{user.is_owner.toString()}</td>
                <td>{user.created_at.substring(0, user.created_at.indexOf("T"))}</td>
                <td>{user.expires_on.substring(0, user.expires_on.indexOf("T"))}</td>
                <td className="text-center">
                  <ModalCustom label="edit" title={user.email}>
                    <FormBase fields={permissions.is_owner ? ["name", ["is_admin",1], ["expires_in",2]] : ["name", "expires_in"]} useForm={useform} defaultData={{"name":user.name, "is_admin": user.is_admin, "expires_in": processExpireOn(user.expires_on)}} onSubmit={d => onSubmit(d, user.id)}/>
                    <hr />
                    <ModalCustom label="delete" title={`are you sure you want to delete ${user.email}?`}>
                      <Button variant="danger" onClick={e => handleDelete(e, user.id)}>Yes. Delete!</Button>
                    </ModalCustom>
                  </ModalCustom>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
}
export default UsersTable