import React, {useState} from 'react';
import {useParams, useLocation} from 'react-router-dom'
import DayPicker from '../components/TimePicker/DayPicker.js'


const BookingPage = () => {
    let {id} = useParams()
    let {state} = useLocation()

    let d = new Date();
    d.setUTCDate(d.getUTCDate() + (7 - d.getUTCDay()) % 7 + 1);
    let iso = d.toISOString()
    let d2 = new Date(iso.substring(0, iso.indexOf("T")))
    console.log(d2.toISOString())
    console.log(state.availabilities)

    const values = [["mondayStart", "mondayEnd"], ["tuesdayStart", "tuesdayEnd"], ["wednesdayStart", "wednesdayEnd"], ["thursdayStart", "thursdayEnd"], ["fridayStart", "fridayEnd"], ["saturdayStart", "saturdayEnd"], ["sundayStart", "sundayEnd"]]
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

    let new_times = []
    for (let x of values) {
        for (let y of x) {
            let d3 = new Date(d2.valueOf())
            if (y in state.availabilities) {
                d3.setMinutes(d3.getMinutes() + 30*state.availabilities[y])
                let d4 = new Date(d3.toLocaleString())
                new_times.push([d4.getDay(), d3.toLocaleString().substring(d3.toLocaleString().indexOf(" "))])
            }
            else {
                let d4 = new Date(d3.toLocaleString())
                new_times.push([d4.getDay(), d3.toLocaleString().substring(d3.toLocaleString().indexOf(" "))])
            }
        }
        d2.setDate(d2.getDate() + 1)
    }
    console.log(new_times)
    const availabilities = () => {
        let elements=[]
        for (let x=0; x<new_times.length; x+=2) {
            elements.push(<p key={x}>{days[new_times[x][0]]},{[new_times[x][1]]} - {days[new_times[x+1][0]]},{[new_times[x+1][1]]}</p>)
        }
        return elements
    }

    return(
        <div className="container">
            <h1>{state.name}</h1>
            <h3>availabilities:</h3>
            {availabilities()}
            <hr/>
            <DayPicker fid={id}/>
        </div>
    )
}

export default BookingPage