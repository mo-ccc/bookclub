const getWithToken = (endpoint, token) => {
    const domain = window.location.hostname.split(".")[0]
    return fetch(`http://${domain}.${process.env.REACT_APP_HOST}/${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export default getWithToken