import React, {useState, useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import {useSelector} from 'react-redux'
import store from './redux/store.js'
import {setTenant} from './redux'

import NavBar from './components/Navbar.js'

import Landing from './views/Landing.js'
import SettingsPage from './views/SettingsPage.js'
import FacilitiesPage from './views/FacilitiesPage.js'
import BookingPage from './views/BookingPage.js'
import MyBookingsPage from './views/MyBookingsPage.js'
import BookingsPage from './views/BookingsPage.js'

import RecentlyBooked from './layouts/RecentlyBooked.js'

const Main = () =>{
  const [TenantInfo, setTenantInfo] = useState("")
  const [Facilities, setFacilities] = useState("")
  const history = useHistory()

  const x = window.location.hostname.split(".")[0]
  useEffect(() => {
    fetch(`http://${x}.${process.env.REACT_APP_HOST}/`)
    .then(response => response.json())
    .then(json => {
      store.dispatch(setTenant(json))
      setTenantInfo(json)
    }).catch(error => history.push('/404'));

    fetch(`http://${x}.${process.env.REACT_APP_HOST}/facility`)
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
      <NavBar tenantInfo={TenantInfo} token={token}/>
      <Switch>
        <Route exact path="/">
          <Landing tenantInfo={TenantInfo} facilities={Facilities}/>
        </Route>
        {token &&
          <>
          <Route exact path="/settings">
            {<SettingsPage permissions={token}/>}
          </Route>
          <Route exact path={["/book", "/book/:id"]}>
            <RecentlyBooked facilities={Facilities}>
              <Route exact path="/book">
                <FacilitiesPage facilities={Facilities}/>
              </Route>
              <Route exact path="/book/:id">
                <BookingPage/>
              </Route>
            </RecentlyBooked>
          </Route>
          <Route exact path="/history">
            <MyBookingsPage facilities={Facilities}/>
          </Route>
          {token.is_admin && 
            <Route exact path="/bookings">
              <BookingsPage facilities={Facilities}/>
            </Route>
          }
          </>
        }
        

        <Route path="/404" render={() => <h1>404</h1>}/>
      </Switch>
    </div>
  )
}
export default Main