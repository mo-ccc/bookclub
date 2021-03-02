import React from 'react';
import Button from 'react-bootstrap/Button';
import Facility from '../components/Facility.js'
import {Switch, Route} from 'react-router-dom'

const FacilitiesPage = ({facilities}) => {
  return(
    <div>
      <div className="container">
        <div className="row justify-content-center">
        {facilities && facilities.map((i) => {
            return <Facility facility={i}/>
        })}
        </div>
      </div>
    </div>
  )
}
export default FacilitiesPage