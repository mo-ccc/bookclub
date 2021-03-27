export const getNoToken = (endpoint) => {
    const domain = window.location.hostname.split(".")[0]
    return fetch(`${process.env.REACT_APP_PROTOCOL}://${domain}.${process.env.REACT_APP_HOST}/${endpoint}`)
}

export const deleteWithToken = (endpoint, token) => {
    const domain = window.location.hostname.split(".")[0]
    return fetch(`${process.env.REACT_APP_PROTOCOL}://${domain}.${process.env.REACT_APP_HOST}/${endpoint}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getWithToken = (endpoint, token) => {
    const domain = window.location.hostname.split(".")[0]
    return fetch(`${process.env.REACT_APP_PROTOCOL}://${domain}.${process.env.REACT_APP_HOST}/${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const patchWithToken = (endpoint, body, token) => {
    const domain = window.location.hostname.split(".")[0]
    return fetch(`${process.env.REACT_APP_PROTOCOL}://${domain}.${process.env.REACT_APP_HOST}/${endpoint}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
}

export const postNoToken = (endpoint, body) => {
    const domain = window.location.hostname.split(".")[0]
    return fetch(`${process.env.REACT_APP_PROTOCOL}://${domain}.${process.env.REACT_APP_HOST}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export const postWithToken = (endpoint, body, token) => {
    const domain = window.location.hostname.split(".")[0]
    return fetch(`${process.env.REACT_APP_PROTOCOL}://${domain}.${process.env.REACT_APP_HOST}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
}

export const rootPost = (body) => {
    return fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOST}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).catch(error => {alert(error); return Promise.reject()})
}