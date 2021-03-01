import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import ModalTabbed from './ModalTabbed.js'
import LoginForm from './LoginForm.js'
import RegisterForm from './RegisterForm.js'

const NavBar = ({tenantInfo}) => {
  let styles = {
    backgroundColor: tenantInfo.secondary_color ? tenantInfo.secondary_color : "#FFFFFF",
  }

  return (
    <Navbar style={styles} expand="lg">
      <Navbar.Brand href="#home">{tenantInfo.domain_name}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#link">Contact</Nav.Link>
          {tenantInfo.open_registration ? 
            <ModalTabbed name="register/login" children={[["Login", <LoginForm/>], ["Register",<RegisterForm/>]]}/>
            :
            <ModalTabbed name="login" children={[["Login", <LoginForm/>]]}/>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavBar;