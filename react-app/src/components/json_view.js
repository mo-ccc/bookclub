import React, {useState, useEffect} from 'react';

const JW = () => {
    const x = window.location.hostname.split(".")[0]
    const [Json, setJson] = useState('')

    useEffect(() => {
        fetch(`http://${x}.localhost:5000/`)
        .then(response => response.json())
        .then(json => setJson(JSON.stringify(json)));
    }, [])
    
    return (
        <div>api:{Json}</div>
    )
}

export default JW;