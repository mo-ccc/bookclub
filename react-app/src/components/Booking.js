import React from 'react'
import Button from 'react-bootstrap/Button'
import placeholder from '../statics/images/placeholder.jpg'
import times from '../statics/json/times.json'

const Booking = ({name, date, timeslot, showCancelButton}) => {

    return(
        <div className="card w-100 m-1 mb-4 p-3">
            <div className="row">
                <div className="col">
                    <h6>{name}</h6>
                    <h6>{date} - {times[timeslot]}</h6>
                </div>
                {showCancelButton &&
                    <div className="col-3">
                        <Button><small>Cancel</small></Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Booking