import React from 'react'

const InfoCard = ({location, phone}) => {
	const style = {
		backgroundColor: "#f6f8fc",
		maxWidth: "760px"
	}

  return (
    <div style={style} className="lead-form-wrapper mx-auto rounded p-5 m-5">
			<h3>Contact Info</h3>
			<hr/>
			<div>
				<p>📍 :  {location}</p>
				<p>📞:  {phone}</p>
			</div>
		</div>
  )
}
export default InfoCard