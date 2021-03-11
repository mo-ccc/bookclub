import React from 'react';
import Facility from '../components/Facility.js'

const FacilitiesPage = ({facilities}) => {
  return(
    <div>
      <div className="container">
        <div className="row">
          {facilities && facilities.map((f, i) => (
            <div className="col-12 col-md-5">
              <Facility key={i} data={f}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default FacilitiesPage