import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import ModalForm from './ModalForm.js'


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
          <ModalForm tenantInfo={tenantInfo}/>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavBar;