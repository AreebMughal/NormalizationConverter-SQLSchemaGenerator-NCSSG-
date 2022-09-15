import React, {useEffect, useState} from "react";
import my_data from "../../../store/data";
import axios from "axios";

const PreliminaryCheck = (props) => {
    const [data, setData] = useState('');
    let reason = []
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            for (let key in data) {
                if (data[key].length !== 0) {
                    if (key === 'countZero') {
                        console.log('=>',key, data[key].length)
                        reason.push(<>Selected Primary key is not determining any attribute which may lead to problem. Please review your primary key selection. <br/></>)
                    } else {
                        reason.push(<>You are determining more attributes with a non prime attribute. Please review your primary key selection. <br/></>)
                    }
                    Object.values(data[key]).map(list => {
                        console.log(list);
                        reason.push(<><span style={{ color: 'red' }}><b>{list[0]}</b> --> <b>{list[1]}</b></span><br/></>)
                        return ''
                    });
                }
            }
            props.setSuggestion(<p>{reason}</p>)
        }
    }, [data])


    const preliminaryCheckClickHandler = (e) => {
        if (props.onPreliminaryCheckClick(e)) {
            axios.post('http://127.0.0.1:5000/preliminaryCheck', {
                inputBoxes: my_data.getRawState().inputBoxes,
                relationName: my_data.getRawState().relationName
            })
                .then(res => {
                    console.log(res.data);
                    setData(res.data);
                    props.setShowNavbarContent(true);
                })
        }
    }
    return (
        <button
            className='btn btn-sm btn-primary ms-2'
            onClick={preliminaryCheckClickHandler}
        >
            Preliminary Check to Proceed
        </button>
    );
}

export default PreliminaryCheck;