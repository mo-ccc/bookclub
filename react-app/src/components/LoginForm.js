import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {setAuth} from '../redux'
import store from '../redux/store.js'

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmailChange = (event) => {
    event.preventDefault()
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(JSON.stringify({email,password}))

    fetch('http://tenant1.localhost:5000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        email, password
      })
    }).then(response => response.text()).then(data => store.dispatch(setAuth(data)))
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formLoginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formLoginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default LoginForm