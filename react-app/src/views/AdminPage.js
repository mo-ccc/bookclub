import React from 'react';
import Tabbed from '../components/Tabbed.js'
import UserInfoTab from '../tabs/UserInfoTab.js'

const AdminPage = () => {

    return (
        <div className="pl-5 pr-5">
            <Tabbed children={[[ "Account", <UserInfoTab/> ], [ "Site", <div/> ]]}/>
        </div>
    )
}

export default AdminPage