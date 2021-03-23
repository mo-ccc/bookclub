const rootPost = (body) => {
    return fetch(`http://${process.env.REACT_APP_HOST}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).catch(error => {alert(error); return Promise.reject()})
}

export default rootPost