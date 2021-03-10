import React from 'react';
import Button from 'react-bootstrap/Button';
import InfoCard from '../components/InfoCard.js'
import placeholder from '../statics/images/placeholder.jpg'
import Facility from '../components/Facility.js'

const Landing = ({tenantInfo, facilities}) => {
  return(
  <div className="container">
    <div className="row">
      <div className="col-12 col-md-8 pt-5 mb-5 pr-5">
        <h1 className="pd-md-5 font-weight-bold lg mb-5 text-left">{tenantInfo.domain_name}</h1>
        <p className="text-left mb-4">{tenantInfo.description}</p>
        <p className="small text-muted">{tenantInfo.statement}</p>
        <Button variant="outline-dark">Contact</Button>
      </div>
      <div className="col-12 col-md-4 mb-5">
        {tenantInfo.img ? <img className="float-right mw-100" src={tenantInfo.img}/> : <img className="float-right mw-100" src={placeholder}/>}
      </div>
    </div>
    <hr/>
      <div className="container">
        <div className="row">
          {facilities && facilities.map((f, i) => (
            <div className="col-12 col-md-3">
              <Facility key={i} data={f}/>
            </div>
          ))}
        </div>
      </div>
    <hr/>
    <InfoCard phone={tenantInfo.phone} location={tenantInfo.location}/>
  </div>

       
    )
}

export default Landing