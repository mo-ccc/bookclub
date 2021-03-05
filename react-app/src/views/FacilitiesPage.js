import React from 'react';
import Facility from '../components/Facility.js'

const FacilitiesPage = ({facilities}) => {
  return(
    <div>
      <div className="container">
        <div className="row">
          {facilities && facilities.map((f, i) => {
            return <Facility key={i} data={f}/>
          })}
        </div>
      </div>
    </div>
  )
}
export default FacilitiesPage