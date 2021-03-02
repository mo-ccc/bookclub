import React from 'react'
import Button from 'react-bootstrap/Button'
import placeholder from '../statics/images/placeholder.jpg'
import {Link} from 'react-router-dom'

const Facility = ({facility}) => {
  const style = {
    padding: {
      padding: "50px 30px"
    },
    maxwidth: {
      maxWidth: "100%"
    }
  }
  const linkto = `/book/${facility.id}`
  return(
      <div className="col-lg-4 col-md-7 col-sm-8">
        <div style={style.padding}>
          <div >
            {facility.img ? <img src={facility.img} style={style.maxwidth}/>:<img src={placeholder} style={style.maxwidth}/>}
          </div>
          <div className="text-center">
            <h4>{facility.name}</h4>
            <p>{facility.description}</p>
            <Link to={linkto}><Button>Book</Button></Link>
          </div>
        </div>
      </div>
  )
}

export default Facility