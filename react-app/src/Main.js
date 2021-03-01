import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/Navbar.js'
import Landing from './views/Landing.js'
import {useSelector} from 'react-redux'
import store from './redux/store.js'
import {setTenant} from './redux'

const Main = () =>{
  const [TenantInfo, setTenantInfo] = useState("")

  const x = window.location.hostname.split(".")[0]
  useEffect(() => {
    fetch(`http://${x}.localhost:5000/`)
    .then(response => response.json())
    .then(json => {
      store.dispatch(setTenant(json))
      setTenantInfo(json)
    });
  }, [])

  const token = useSelector(state => state.token)

  return (
    <div>
      <NavBar tenantInfo={TenantInfo}/>
      <div>
        <h1>toek:{token}</h1>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <div>hello</div>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  )
}
export default Main