import React from 'react';
import Tabbed from '../components/Tabbed.js'
import UserInfoTab from '../tabs/UserInfoTab.js'
import SiteInfoTab from '../tabs/SiteInfoTab.js'
import UserManagementTab from '../tabs/UserManagementTab.js'
import FacilityManagementTab from '../tabs/FacilityManagementTab.js'

const AdminPage = ({permissions}) => {
    let pages = [
        [ "Account", <UserInfoTab/> ], ["User Management", <UserManagementTab/> ],
        [ "Facility Management", <FacilityManagementTab/> ]
    ]

    if (permissions.is_owner) {
        pages.push([ "Site Management", <SiteInfoTab/> ])
    }


    return (
        <div className="pl-5 pr-5">
            <Tabbed children={pages}/>
        </div>
    )
}

export default AdminPage