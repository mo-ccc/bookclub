import React, {useEffect} from 'react'

const InfoCard = ({location, phone}) => {
    const styles={
        flexi: {
            display: "flex"
        }
    }
    return (
        <div style={styles.flexi}>
            <div>
                <div style={styles.flexi}>
                    <img src="https://lh3.googleusercontent.com/proxy/ElQn0_zWqxQSCXnqgeHzS4UFAnUaJcNR7hqKc8cNsAGKfhB-gKQ5mgaSfWmx-Vci6J0V6a2pP0qw-ysGY4pDGthjtKgCYIWXQg" width="3%"/>
                    <h5>{location}</h5>
                </div>
                <div style={styles.flexi}>
                    <img src="https://lh3.googleusercontent.com/proxy/ElQn0_zWqxQSCXnqgeHzS4UFAnUaJcNR7hqKc8cNsAGKfhB-gKQ5mgaSfWmx-Vci6J0V6a2pP0qw-ysGY4pDGthjtKgCYIWXQg" width="3%"/>
                    <h5>{phone}</h5>
                </div>
            </div>

        </div>
    )
}
export default InfoCard