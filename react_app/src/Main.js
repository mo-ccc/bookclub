import React, {useState, useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import {useSelector} from 'react-redux'

import NavBar from './components/Navbar.js'
import Notification from './components/Notification.js'

import getNoToken from './api/getNoToken.js'

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

  const fetchTenantInfo = () => {
    getNoToken('')
    .then(response => response.json())
    .then(json => {setTenantInfo(json)})
    .catch(error => history.push('/404'))
  }

  const fetchFacilityInfo = () => {
    getNoToken('facility')
    .then(response => response.json())
    .then(json => {setFacilities(json)})
    .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchTenantInfo()
    fetchFacilityInfo()
  }, [])

  const permissions = useSelector(state => {
    try {
      return JSON.parse(atob(state.auth.token.split('.')[1]))
    }catch(e) {
      return ""
    }
  })


  return (
    <div>
      <NavBar tenantInfo={TenantInfo} permissions={permissions}/>
      <Switch>
        <Route exact path="/">
          <Landing tenantInfo={TenantInfo} facilities={Facilities}/>
        </Route>
        {permissions &&
          <>
          <Route exact path="/settings">
            {<SettingsPage permissions={permissions}/>}
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
          {permissions.is_admin && 
            <Route exact path="/bookings">
              <BookingsPage facilities={Facilities}/>
            </Route>
          }
          </>
        }
        

        <Route path="/404" render={() => <h1>404</h1>}/>
      </Switch>
      <Notification/>
    </div>
  )
}
export default Main