import React from 'react';
import Banner from '../components/Banner.js'

const Landing = ({tenantInfo}) => {
    return(
        <div>
            <Banner name={tenantInfo.domain_name}/>
        </div>
       
    )
}

export default Landing