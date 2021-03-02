import React from 'react';
import InfoCard from '../components/InfoCard.js'

const Landing = ({tenantInfo}) => {
    return(
        <div>
            <InfoCard phone={tenantInfo.phone} location={tenantInfo.location}/>
        </div>

       
    )
}

export default Landing