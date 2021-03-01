import React from 'react'
import {Button} from 'react-bootstrap'

const Banner = ({name, paragraph}) => {
    const styles = {
        border: "2px solid grey",
        width: "100%",
        height: "200px"
    }

    return(
        <div style={styles}>
            <h1>{name}</h1>
            <p>{paragraph}</p>
        </div>
    )
}
export default Banner