import React from 'react';
import Banner from '../components/Banner.js'
import InfoCard from '../components/InfoCard.js'

const Landing = ({tenantInfo}) => {
    return(
        <div>
            <Banner name={tenantInfo.domain_name} paragraph={tenantInfo.description}/>
            <Banner paragraph={tenantInfo.statement}/>
            <InfoCard phone={tenantInfo.phone} location={tenantInfo.location}/>
        </div>

       
    )
}

export default Landing