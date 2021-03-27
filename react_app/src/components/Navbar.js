import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap'
import ModalTabbed from './ModalTabbed.js'
import {Link, NavLink} from 'react-router-dom'
import store from '../redux/store.js'
import {setAuth, setNotification} from '../redux'

import {useForm} from 'react-hook-form'
import FormBase2 from './FormBase2.js'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { postNoToken } from '../api/api_utils.js'


const NavBar = ({tenantInfo, permissions}) => {

  const loginSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
  })
  const loginFields = [
    {name: "email", label: "email", placeholder: "login email", inputType: "email"},
    {name: "password", label: "password", placeholder: "enter password", inputType: "password"}
  ]
  const submitLogin = (data) => {
    postNoToken('login', data)
    .then(response => {
      response.ok ? store.dispatch(setNotification("logged in", "primary")):store.dispatch(setNotification("invalid credentials", "danger"))
      return response.json()
    }).then(data => {
      store.dispatch(setAuth(data))
      console.log(store.getState())
    })
  }
  const useLogin = useForm({resolver: yupResolver(loginSchema), })

  const registerSchema = yup.object().shape({
    name: yup.string().required().max(30).matches(/^[a-zA-Z ]*$/, "name must only contain letters and white spaces"),
    email: yup.string().required().max(30),
    password: yup.string().required().min(6)
  })
  const registerFields = [
    {name: "name", label: "name", placeholder: "name to register with", inputType: "text"}
  ].concat(loginFields) // registerfields adds name to loginfields
  const submitRegister = (data) => {
    postNoToken('register', data)
    .then(response => response.ok ? store.dispatch(setNotification("registered", "primary")):store.dispatch(setNotification("registration failed, account may already exist", "danger")))
    .catch(error => store.dispatch(setNotification(String(error), "danger")))
  }
  const useRegister = useForm({resolver: yupResolver(registerSchema), })

  

  let childs = [["Login", <FormBase2 fields={loginFields} useForm={useLogin} onSubmit={submitLogin}/>], ]
  let isRegister = false
  if (tenantInfo.open_registration) {
    childs.push(["Register", <FormBase2 fields={registerFields} useForm={useRegister} onSubmit={submitRegister}/>])
    isRegister = true
  }

  const handleLogout = () => {
    store.dispatch(setAuth(""))
  }

  return (
    <Navbar bg="light" expand="lg">
      <Link to="/"><Navbar.Brand>{tenantInfo.domain_name}</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!permissions &&
            <ModalTabbed name={isRegister ? "login/register" : "login"} children={childs}/>
          }
          {permissions?.is_admin &&
            <NavLink to="/bookings"><a className="nav-link">Bookings</a></NavLink>
          }
          {permissions &&
          <>
            <NavLink to="/history"><a className="nav-link">My Bookings</a></NavLink>
            <NavLink to="/book"><a className="nav-link">New booking</a></NavLink>
            <NavLink to="/settings"><a className="nav-link">Settings</a></NavLink>
            <Button variant="outline-dark" onClick={handleLogout}>Logout</Button>
          </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavBar;