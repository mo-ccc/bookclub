import React, {useState} from 'react'
import {Button, Modal, Tab, Nav, Row, Col} from 'react-bootstrap'

const ModalTabbed = ({children, name}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="outline-dark" onClick={handleShow}>
          {name}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container defaultActiveKey="Login">
            <Col>
              <Row>
                <Nav variant="tabs" className="flex-row" style={{width: "100%"}}>
                  {children.map(i => (
                    <Nav.Item key={i[0]}>
                      <Nav.Link eventKey={i[0]} style={{padding: "10px 20px"}}>{i[0]}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Row>
              <Row>
                  <Tab.Content style={{padding: "10px"}}>
                    {children.map(i => (
                      <Tab.Pane key={i[0]} eventKey={i[0]}>
                        {i[1]}
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
              </Row>
            </Col>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalTabbed