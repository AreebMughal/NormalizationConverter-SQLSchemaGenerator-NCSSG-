import React, {useEffect, useState} from 'react'
import axios from "axios";
function FetchData() {
    const [data, setData] = useState([{}])

    // useEffect(() => {
    //     fetch("/members").then(
    //         res => res.json()
    //     ).then(
    //         data => {
    //             setData(data)
    //             console.log(data)
    //         }
    //     )
    // }, [])

    const handleSubmit = event => {
        event.preventDefault();
        const data = {"members": ["Member1", "Member2", "Member3"]}
        console.log(data)
        const name = data

        axios.post('http://127.0.0.1:5000/members', { name })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    return (
        <div>
            {/*{(typeof data === undefined) ? (<p>.. Loading</p>)*/}
            {/*    : (*/}
            {/*    data.members.map((member, i) => <p key={i}>member</p>)*/}
            {/*)*/}
            {/*}*/}
            <button type='submit' onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default FetchData