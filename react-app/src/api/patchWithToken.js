const patchWithToken = (endpoint, body, token) => {
    const domain = window.location.hostname.split(".")[0]
    return fetch(`http://${domain}.${process.env.REACT_APP_HOST}:5000/${endpoint}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
}

export default patchWithToken