const getNoToken = (endpoint) => {
    const domain = window.location.hostname.split(".")[0]
    return fetch(`http://${domain}.${process.env.REACT_APP_HOST}/${endpoint}`)
}
export default getNoToken