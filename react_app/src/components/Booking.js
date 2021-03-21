import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import times from '../statics/json/times.json'
import deleteWithToken from '../api/deleteWithToken.js'
import {useSelector} from 'react-redux'
import store from '../redux/store.js'
import {setNotification} from '../redux'

const Booking = ({name, data, showCancelButton, getData}) => {
    const token = useSelector(state => state.auth.token)
    
    const deleteBooking = () => { 
        deleteWithToken(`booking/${data.id}`, token)
        .then(response => { 
            if (response.ok){
                getData()
                store.dispatch(setNotification("deleted booking", "primary"))
            }else {
                store.dispatch(setNotification("an error occurred", "danger"))
            }
            return response
        })
    }
    
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