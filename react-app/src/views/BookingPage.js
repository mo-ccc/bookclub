import React, {useState} from 'react';
import {useParams, useLocation} from 'react-router-dom'
import DayPicker from '../components/TimePicker/DayPicker.js'


const BookingPage = () => {
    let {id} = useParams()
    let {state} = useLocation()

    return(
        <div className="container">
            <h1>{state.name}</h1>
            <h3>availabilities:</h3>
            {Object.keys(state.availabilities).map((item, i)=>{
                return <p key={i}>{item}:{state.availabilities[item]}</p>
            })}
            <hr/>
            <DayPicker fid={id}/>
        </div>
    )
}

export default BookingPage