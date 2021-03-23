import React from 'react'
import {useSelector} from 'react-redux'
import store from '../redux/store.js'
import {setNotification} from '../redux/index.js'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const success = useSelector(state => state.notification.text)
  const status = useSelector(state => state.notification.status)

  const style = {
    "position": "fixed",
    "bottom": "0px",
    "left": "10px",
    "right": "10px",
    "zIndex": "99999"
  }

  if (success) {
    setTimeout(() => {store.dispatch(setNotification(""))}, 2000)
    return(
      <div style={style}>
        <Alert variant={status ?? "primary"} onClose={() => store.dispatch(setNotification("", ""))} dismissible>
          <p>
            {success}
          </p>
        </Alert>
      </div>
    )}else {
    return(null)
  }
}
export default Notification

