import React, {useState, useEffect} from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';

import {useSelector} from 'react-redux'

import NavBar from './components/Navbar.js'
import Notification from './components/Notification.js'

import { getNoToken } from './api/api_utils.js'

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
  const location = useLocation()

  const fetchTenantInfo = () => {
    getNoToken('')
    .then(response => {
        if (response.ok) {
          if (location.pathname === "/404") {
            history.push('/')
          }
          response.json().then(json => {setTenantInfo(json)})
        }
        else{history.push('/404')}
    })
  }

  const fetchFacilityInfo = () => {
    getNoToken('facility')
    .then(response => response.json())
    .then(json => {setFacilities(json)})
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
            {<SettingsPage permissions={permissions} triggerFetchFacility={fetchFacilityInfo} tenantInfo={TenantInfo} facilities={Facilities}/>}
          </Route>
          <Route exact path={["/book", "/book/:id"]}>
            <RecentlyBooked facilities={Facilities} render={
              getLastThree => (
                <>
                <Route exact path="/book">
                  <FacilitiesPage facilities={Facilities}/>
                </Route>
                <Route exact path="/book/:id">
                  <BookingPage getLastThree={getLastThree}/>
                </Route>
                </>
              )
            }/>
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
        {permissions ? 
          <Route><Redirect to="/"/></Route>
          :
          <Route exact path="/404" render={() => <div className="p-5 m-5"><h1>This subdomain does not exist.</h1><a href={`http://${process.env.REACT_DOMAIN}`}>return to home?</a></div>}/>
        }
        <Route><Redirect to="/"/></Route>
      </Switch>
      <Notification/>
    </div>
  )
}
export default Main