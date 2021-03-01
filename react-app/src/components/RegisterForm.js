import React from 'react'
import {Form, Button} from 'react-bootstrap'

const RegisterForm = () => {
  return(
    <Form>
      <Form.Group controlId="formRegisterName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
        <Form.Text className="text-muted">
          Use your full name.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formRegisterEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formRegisterPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
export default RegisterForm