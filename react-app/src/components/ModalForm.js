import React, {useState} from 'react'
import {Button, Modal, Tab, Nav, Row, Col} from 'react-bootstrap'
import RegisterForm from './RegisterForm.js'
import LoginForm from './LoginForm.js'

const ModalForm = ({children}) => {
  console.log(children)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
          Register/Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register/Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container defaultActiveKey="Login">
            <Col>
              <Row>
                <Nav variant="tabs" className="flex-row" style={{width: "100%"}}>
                  <Nav.Item>
                    <Nav.Link eventKey="Login" style={{padding: "10px 20px"}}>Login</Nav.Link>
                  </Nav.Item>
                  {
                    tenantInfo.open_registration &&
                    <Nav.Item>
                      <Nav.Link eventKey="Register" style={{padding: "10px 20px"}}>Register</Nav.Link>
                    </Nav.Item>
                  }
                </Nav>
              </Row>
              <Row>
                  <Tab.Content style={{padding: "10px"}}>
                    <Tab.Pane eventKey="Login">
                      <LoginForm/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Register">
                      <RegisterForm/>
                    </Tab.Pane>
                  </Tab.Content>
              </Row>
            </Col>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalForm