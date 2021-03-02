import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {createDispatchHook, useSelector} from 'react-redux'
import store from './redux/store.js'
import {setTenant} from './redux'

import NavBar from './components/Navbar.js'

import Landing from './views/Landing.js'
import AdminPage from './views/AdminPage.js'
import UserPage from './views/UserPage.js'
import FacilitiesPage from './views/FacilitiesPage.js'

const Main = () =>{
  const [TenantInfo, setTenantInfo] = useState("")
  const [Facilities, setFacilities] = useState("")

  const x = window.location.hostname.split(".")[0]
  useEffect(() => {
    fetch(`http://${x}.localhost:5000/`)
    .then(response => response.json())
    .then(json => {
      store.dispatch(setTenant(json))
      setTenantInfo(json)
    });

    fetch(`http://${x}.localhost:5000/facility`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      setFacilities(json)
    })
  }, [])

  const token = useSelector(state => {
    try {
      return JSON.parse(atob(state.token.split('.')[1]))
    }catch(e) {
      return ""
    }
  })


  return (
    <div>
      <BrowserRouter>
        <NavBar tenantInfo={TenantInfo} token={token}/>
        <Switch>
          <Route exact path="/">
            <Landing tenantInfo={TenantInfo} facilities={Facilities}/>
          </Route>
          {token &&
          <Route exact path="/settings">
            {token.is_admin ? <AdminPage/>:<UserPage/>}
          </Route>
          }
          <Route exact path="/book">
            <FacilitiesPage/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
export default Main