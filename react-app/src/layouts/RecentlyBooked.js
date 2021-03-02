import React from 'react'

const RecentlyBooked = (props) => {
    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    {props.children}
                </div>
                <div className="col-2 border-left m-2">
                    <h1>Hello</h1>
                </div>
            </div>
        </div>
    )
}

export default RecentlyBooked