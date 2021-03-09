import React, {useState} from 'react';
import {useParams, useLocation} from 'react-router-dom'
import DayPicker from '../components/TimePicker/DayPicker.js'
import placeholder from '../statics/images/placeholder.jpg'


const BookingPage = () => {
    let {id} = useParams()
    let {state} = useLocation()


    let times = []

    const values = [["mondayStart", "mondayEnd"], ["tuesdayStart", "tuesdayEnd"], ["wednesdayStart", "wednesdayEnd"], ["thursdayStart", "thursdayEnd"], ["fridayStart", "fridayEnd"], ["saturdayStart", "saturdayEnd"], ["sundayStart", "sundayEnd"]]
    console.log(state.availabilities)
    if (!state.availabilities) {
        times = Array(7).fill("everyday: 12:00 AM - 11:59 PM", 0, 9)
    }
    else {
        for (let x of values) {
            let stringfrmt = x[0].slice(0, -5) + ": " // string to start with. a day in the week
            let count = 0
            for (let y of x){
                let d = new Date()
                d.setHours(0, 0, 0, 0,) //initialize a new date to 12AM
                if (y in state.availabilities) {
                    d.setMinutes(30 * state.availabilities[y]) //
                }else {
                    if (count === 0) {
                        d.setMinutes(0) // if a start time set to 12AM
                    }else {
                        d.setMinutes((30 * 48) - 1) // if an end time set to 11:59PM
                    }
                }
                stringfrmt += d.toLocaleString().substring(d.toLocaleString().indexOf(" ")) // add the time to the string
                if (count === 0) { // if it's a start time add - to the end i.e. 12AM+' - '+12PM
                    stringfrmt += " - "
                }
                count += 1
            }
            times.push(stringfrmt) // push the time onto the times array
        }
    }
    console.log(times)

    return(
        <div className="container" style={{marginBottom: 250}}>
            <div className="row pt-3">
                <div className="col-10 col-md-4 mx-auto mt-3">
                    <img className="w-75 d-block mx-auto" src={placeholder}/>
                    <h1 className="text-center mt-2">{state.name}</h1>
                </div>
                <div className="col-10 col-md-6 mx-auto">
                    <h3>availabilities:</h3>
                    {times.map((item, i)=>{
                        return <p key={i}>{item}</p>
                    })}
                </div>
            </div>
            <hr/>
            <DayPicker fid={id}/>
        </div>
    )
}

export default BookingPage