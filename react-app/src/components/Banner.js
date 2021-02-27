import React from 'react'
import {Button} from 'react-bootstrap'

const Banner = ({name, description}) => {
    console.log(name)
    return(
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <Button>Contact</Button>
        </div>
    )
}
export default Banner