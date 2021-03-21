import React from 'react';
import Tabbed from '../components/Tabbed.js'
import UserInfoTab from '../tabs/UserInfoTab.js'
import SiteInfoTab from '../tabs/SiteInfoTab.js'
import UserManagementTab from '../tabs/UserManagementTab.js'
import FacilityManagementTab from '../tabs/FacilityManagementTab.js'

const SettingsPage = ({permissions, triggerFetchFacility, facilities, tenantInfo}) => {
  let pages = [
    [ "Account", <UserInfoTab/> ],
  ]

  if (permissions.is_admin || permissions.is_owner) {
    pages.push(["User Management", <UserManagementTab/> ])
    pages.push([ "Facility Management", <FacilityManagementTab triggerFetchFacility={triggerFetchFacility} facilities={facilities} /> ])
  }

  if (permissions.is_owner) {
    pages.push([ "Site Management", <SiteInfoTab data={tenantInfo} /> ])
  }


  return (
    <div>
      <Tabbed children={pages}/>
    </div>
  )
}

export default SettingsPage