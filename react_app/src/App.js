import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux'
import store from './redux/store.js'
import Main from './Main.js'
import {BrowserRouter} from 'react-router-dom'
import FormBase from './components/FormBase'
import {useForm} from 'react-hook-form'

const App = () => {
  const useform = useForm()
  const handleSubmit = (data) => {
    const body = {
      tenant: {"domain_name": data.domain_name}, 
      user: {"name": data.name, "password": data.password, "email": data.email}
    }
    return fetch(`http://${process.env.REACT_APP_HOST}/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
      if (response.ok) {
        window.location.replace(`http://${data.domain_name}.${process.env.REACT_APP_DOMAIN}/`)
      }else{
        alert("Could not successfully create subdomain. Please limit domain_name length to 10 characters. password must be at least 6 characters. use a valid email. and make sure subdomain does not already exist")
      }
    }).catch(error => alert(error))
  }
  console.log(window.location.hostname, process.env.REACT_APP_DOMAIN)
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
              
              <FormBase fields={["domain_name", "name", "email", "password"]} is_post={true} useForm={useform} onSubmit={handleSubmit}/>

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