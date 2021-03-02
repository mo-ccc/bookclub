import React from 'react'
import Button from 'react-bootstrap/Button'
import placeholder from '../statics/images/placeholder.jpg'

const Facility = ({facility}) => {
  const style = {
    padding: {
      padding: "50px 30px"
    },
    maxwidth: {
      maxWidth: "100%"
    }
  }
  console.log(facility)
  return(
      <div className="col-lg-4 col-md-7 col-sm-8">
        <div style={style.padding}>
          <div >
            {facility.img ? <img src={facility.img} style={style.maxwidth}/>:<img src={placeholder} style={style.maxwidth}/>}
          </div>
          <div className="text-center">
            <h4>{facility.name}</h4>
            <p>{facility.description}</p>
            <Button>Book</Button>
          </div>
        </div>
      </div>
  )
}

export default Facility