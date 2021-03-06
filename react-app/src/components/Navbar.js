import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap'
import ModalTabbed from './ModalTabbed.js'
import LoginForm from './LoginForm.js'
import RegisterForm from './RegisterForm.js'
import {Link, NavLink} from 'react-router-dom'
import store from '../redux/store.js'
import {setAuth} from '../redux'


const NavBar = ({tenantInfo, token}) => {
  let modal;
  if (tenantInfo.open_registration) {
    modal = <ModalTabbed name="register/login" children={[["Login", <LoginForm/>], ["Register",<RegisterForm/>]]}/>
  }else {
    modal = <ModalTabbed name="login" children={[["Login", <LoginForm/>]]}/>
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
          {!token && modal}
          {token &&
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