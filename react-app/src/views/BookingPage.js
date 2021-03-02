import React from 'react';
import Button from 'react-bootstrap/Button';
import Facility from '../components/Facility.js'
import {useParams} from 'react-router-dom'

const BookingPage = () => {
    let {id} = useParams()
    return(
        <h1>{id}</h1>
    )
}

export default BookingPage