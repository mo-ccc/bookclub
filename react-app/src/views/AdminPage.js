import React from 'react';
import Tabbed from '../components/Tabbed.js'
import UserInfoTab from '../tabs/UserInfoTab.js'
import SiteInfoTab from '../tabs/SiteInfoTab.js'
import UserManagementTab from '../tabs/UserManagementTab.js'

const AdminPage = ({permissions}) => {

    if (permissions.is_owner) {
        return (
            <div className="pl-5 pr-5">
                <Tabbed children={[
                    [ "Account", <UserInfoTab/> ], [ "Site", <SiteInfoTab/> ],
                    ["User Management", <UserManagementTab/> ]]}/>
            </div>
        )
    }else {
        return (
            <div className="pl-5 pr-5">
                <Tabbed children={[[ "Account", <UserInfoTab/> ], 
                ["User Management", <UserManagementTab/> ]]}/>
            </div>
        )
    }
}

export default AdminPage