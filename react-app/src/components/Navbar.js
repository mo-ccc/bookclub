import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap'
import ModalTabbed from './ModalTabbed.js'
import LoginForm from './LoginForm.js'
import RegisterForm from './RegisterForm.js'
import {Link} from 'react-router-dom'
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
          <Nav.Link href="#link">Contact</Nav.Link>
          {!token && modal}
          {token &&
          <>
            <Link to="/bookings"><a class="nav-link">My Bookings</a></Link>
            <Link to="/new"><a class="nav-link">New booking</a></Link>
            <Link to="/settings"><a class="nav-link">Settings</a></Link>
            <Button variant="outline-dark" onClick={handleLogout}>Logout</Button>
          </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavBar;