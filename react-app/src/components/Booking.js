import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import times from '../statics/json/times.json'
import deleteWithToken from '../api/deleteWithToken.js'
import {useSelector} from 'react-redux'

const Booking = ({name, data, showCancelButton, getData}) => {
    const token = useSelector(state => state.token)
    
    const deleteBooking = () => { 
        deleteWithToken(`booking/${data.id}`, token)
        .then(response => { 
            if (response.status === 200){
                getData()
            } 
            return response
        }).catch(errors => console.log(errors))}
    
    return(
        <div className="card w-100 m-1 mb-4 p-3">
            <div className="row">
                <div className="col">
                    <h6>{name}</h6>
                    <h6>{data.date} - {times[data.timeslot]}</h6>
                </div>
                {showCancelButton &&
                    <div className="col-3">
                        <Button onClick={deleteBooking}><small>Cancel</small></Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Booking