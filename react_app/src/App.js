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
    return fetch(`http://${process.env.REACT_APP_HOST}/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        window.location.replace(`http://${data.domain_name}.${process.env.REACT_APP_DOMAIN}/`)
      }else{
        alert("Could not successfully create subdomain")
      }
    }).catch(error => alert(error))
  }

  const former = [
    {"name": "domain_name", "label": "domain name", "placeholder": "enter a name for a new domain", "inputType": "text", "validation": {"maxLength": 10} },
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
              
              <FormBase fields={former} useForm={useform} onSubmit={handleSubmit}/>

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