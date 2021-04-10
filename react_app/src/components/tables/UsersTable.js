import React from 'react'
import ModalCustom from '../ModalCustom.js'
import {useForm} from 'react-hook-form'
import FormBase2 from '../FormBase2.js'
import { patchWithToken, deleteWithToken } from '../../api/api_utils.js'
import {useSelector} from 'react-redux'
import Button from 'react-bootstrap/Button'
import store from '../../redux/store.js'
import {setNotification} from '../../redux'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const UsersTable = ({users, setUsers}) => {

  const fields = [
    {name: "name", label: "name", placeholder: "name of account", inputType: "text"},
    {name: "expires_in", label: "days until membership expiry", placeholder: "days", inputType: "number"},
  ]
  const token = useSelector(state => state.auth.token)
  const permissions = JSON.parse(atob(token.split('.')[1]))
  if (permissions.is_owner) {
    fields.push({name: "is_admin", label: "is an admin user", inputType: "bool"})
  } // if owner account is logged in allow admin status of users to be edited

  const schema = yup.object().shape({
    name: yup.string().required().max(30).matches(/^[a-zA-z ]*$/, "name must contain only letters and whitespaces"),
    expires_in: yup.number().integer().positive().label("days until expiry")
  })

  const useform = useForm({resolver: yupResolver(schema),})
  
  const onSubmit = (data, idOfUser) => {
    console.log(data)
    patchWithToken(`user/${idOfUser}`, data, token)
    .then(response => {
      if (response.ok) {
        setUsers() // refreshes table with latest get data
        store.dispatch(setNotification("successfully updated user", "primary"))
      }else{
        store.dispatch(setNotification("an error occurred", "danger"))
      }
      return response
  })}

  const handleDelete = (e, idOfUser) => {
    deleteWithToken(`user/${idOfUser}`, token)
      .then(response => {
        if (response.status === 200) {
          setUsers()
          store.dispatch(setNotification("user deleted", "primary"))
        }else {
          store.dispatch(setNotification("An error occurred"))
        }
        return response
      })
  }

    const processExpireOn = (date) => {
      return Math.round((new Date(date) - new Date())/(24 * 60 * 60 * 1000)) // used to convert a date to days from today
    }

    return (
      <table className="table table-bordered table-sm table-hover">
        <thead className="thead-dark">
          <tr>
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
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.is_admin.toString()}</td>
                <td>{user.is_owner.toString()}</td>
                <td>{user.created_at.substring(0, user.created_at.indexOf("T"))}</td>
                <td>{user.expires_on.substring(0, user.expires_on.indexOf("T"))}</td>
                <td className="text-center">
                  <ModalCustom label="edit" title={user.email}>
                    <FormBase2 fields={fields} useForm={useform} onSubmit={e => onSubmit(e, user.id)} defaultData={{"name":user.name, "is_admin": user.is_admin, "expires_in": processExpireOn(user.expires_on)}} />
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