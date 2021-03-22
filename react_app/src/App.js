import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux'
import store from './redux/store.js'
import Main from './Main.js'
import {BrowserRouter} from 'react-router-dom'
import FormBase2 from './components/FormBase2'
import {useForm} from 'react-hook-form'

const App = () => {
  const useform = useForm()
  const handleSubmit = (data) => {
    console.log(data)
  }

  const formFields = [
    {name: "domain.domain_name", label: "domain name", placeholder: "enter a name for a new domain", inputType: "text", validation: {maxLength: 10, required: true} },

    {name: "user.name", label: "name", placeholder: "enter a name for the root user", inputType: "test", validation: {required: true, pattern: {value: /^[a-zA-Z ]*$/, message: "name must only contain letters and white spaces"}}},

    {name: "user.email", label: "email", placeholder: "enter an email for the root user", inputType: "email", validation: {required: true}},

    {name: "user.password", label: "password", placeholder: "enter a password for the root user", inputType: "password", validation: {required: true, minLength: 6}}
    
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