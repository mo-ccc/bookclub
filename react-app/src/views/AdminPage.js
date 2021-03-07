import React from 'react';
import Tabbed from '../components/Tabbed.js'
import UserInfoTab from '../tabs/UserInfoTab.js'
import SiteInfoTab from '../tabs/SiteInfoTab.js'

const AdminPage = () => {

    return (
        <div className="pl-5 pr-5">
            <Tabbed children={[[ "Account", <UserInfoTab/> ], [ "Site", <SiteInfoTab/> ]]}/>
        </div>
    )
}

export default AdminPage