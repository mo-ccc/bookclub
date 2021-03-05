const getNoToken = (endpoint) => {
    const domain = window.location.hostname.split(".")[0]
    return fetch(`http://${domain}.${process.env.REACT_APP_HOST}:5000/${endpoint}`)
}
export default getNoToken