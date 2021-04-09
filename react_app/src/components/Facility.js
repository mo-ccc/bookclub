import React from 'react'
import Button from 'react-bootstrap/Button'
import placeholder from '../statics/images/placeholder.jpg'
import {Link} from 'react-router-dom'

const Facility = ({data, edit, children}) => {
  const style = {
    padding: {
      padding: 50,
      paddingTop: 10
    },
    maxwidth: {
      maxWidth: "100%"
    }
  }
  const linkto = `/book/${data.id}`
  return(
    <div style={style.padding}>
      <div >
        {data.img ? <img src={data.img} style={style.maxwidth}/>:<img src={placeholder} style={style.maxwidth}/>}
      </div>
      <div className="text-center">
        <h4>{data.name}</h4>
        <p>{data.description}</p>
        {!edit && <Link to={{pathname:linkto, state:data}}><Button variant={data.disabled ? "dark":"primary"} disabled={data.disabled}>{data.disabled ? "Unavailable":"Book"}</Button></Link>}
        {children}
      </div>
    </div>
  )
}

export default Facility