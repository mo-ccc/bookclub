import React from 'react'
import Button from 'react-bootstrap/Button'
import placeholder from '../statics/images/placeholder.jpg'
import {Link} from 'react-router-dom'

const Facility = ({data}) => {
  const style = {
    padding: {
      padding: "50px 30px"
    },
    maxwidth: {
      maxWidth: "100%"
    }
  }
  const linkto = `/book/${data.id}`
  return(
      <div className="col-lg-4 col-md-7 col-sm-8">
        <div style={style.padding}>
          <div >
            {data.img ? <img src={data.img} style={style.maxwidth}/>:<img src={placeholder} style={style.maxwidth}/>}
          </div>
          <div className="text-center">
            <h4>{data.name}</h4>
            <p>{data.description}</p>
            <Link to={{pathname:linkto, state:data}}><Button>Book</Button></Link>
          </div>
        </div>
      </div>
  )
}

export default Facility