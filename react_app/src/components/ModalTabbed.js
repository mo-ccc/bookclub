import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import Tabbed from './Tabbed.js'

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
          <Tabbed children={children}/>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalTabbed