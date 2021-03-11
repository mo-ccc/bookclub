import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'

const ModalCustom = ({label, title, size, variant, children}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buttonStyle = {
    "padding": 50,
    "width": "100%",
    "height": "100%",
    display: "block",
  }
  return (
    <div style={{paddingTop: 10}}>
      <Button style={variant && buttonStyle} variant={variant} onClick={handleShow}>
          {label}
      </Button>

      <Modal size={size} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default ModalCustom