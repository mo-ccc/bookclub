import React from 'react';
import {Provider} from 'react-redux'
import store from './redux/store.js'
import Main from './Main.js'
import {BrowserRouter} from 'react-router-dom'
import FormBase2 from './components/FormBase2'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import rootPost from './api/rootPost'

const App = () => {
  const schema = yup.object().shape({
    tenant: yup.object({
      domain_name: yup.string().max(10).required().matches(/^[a-zA-z0-9 ]*$/, "domain name must not contain any special characters").label("domain name")
    }),
    user: yup.object({
      name: yup.string().max(30).required().matches(/^[a-zA-Z ]*$/, "name must contain only letters and whitespaces").label("name"),
      email: yup.string().max(30).required().label("email"),
      password: yup.string().min(6).required().label("password")
    })
  })

  const useform = useForm({resolver: yupResolver(schema), })

  

  const handleSubmit = (data) => {
    rootPost(data).then(response => {
      if (response.ok) {
        window.location.replace(`http://${data.tenant.domain_name}.${process.env.REACT_APP_DOMAIN}/`)
      }else{
        alert("Could not successfully create domain")
      }
    })
  }

  const formFields = [
    // domain name field
    {name: "tenant.domain_name", label: "domain name", placeholder: "enter a name for a new domain", inputType: "text"},

    // name field
    {name: "user.name", label: "name", placeholder: "enter a name for the root user", inputType: "test"},

    // email field
    {name: "user.email", label: "email", placeholder: "enter an email for the root user", inputType: "email"},

    // password field
    {name: "user.password", label: "password", placeholder: "enter a password for the root user", inputType: "password"}  
  ]

  if (window.location.hostname === process.env.REACT_APP_DOMAIN){
    return(
      <div className="bg-dark" style={{"height":"100vh"}}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <span className="navbar-text">Bookclub</span>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="http://github.com/mo-ccc/bookclub">Github</a>
            </li>
          </ul>
        </nav>
        <div className="bg-dark p-1">
          <div className="d-flex justify-content-center align-items-center">
            <div className="card text-black-50 bg-light p-4 m-4">
              <h6>Create a new subdomain</h6>
              
              <FormBase2 fields={formFields} useForm={useform} onSubmit={handleSubmit}/>

              <h6 className="mt-5">or visit the demo subdomain: <a href={`http://demo.${process.env.REACT_APP_DOMAIN}`}>http://demo.{process.env.REACT_APP_DOMAIN}</a></h6>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Main/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;