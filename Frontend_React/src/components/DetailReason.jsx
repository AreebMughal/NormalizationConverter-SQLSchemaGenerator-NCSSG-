import React, {useEffect, useState} from 'react'
import axios from "axios";
import my_data from "../store/data";

import '../assets/css/relation.css'
import {inputBoxes_data} from "../store/inputBoxes_dataStore";
import StaticMinimalCover from "./StaticMinimalCover";
import {forEach} from "react-bootstrap/ElementChildren";


const DetailReason = () => {
    const [toggle, setToggle] = useState(false);
    const inputBoxes = my_data.getRawState().inputBoxes
    const relationName = inputBoxes_data.getRawState().relationName
    const [data, setData] = useState([{}])


    useEffect(() => {
        axios.post('http://127.0.0.1:5000/minimalCover', {inputBoxes, relationName})
            .then(res => {
                console.log(res.data)
                setData(res.data['result'])
            })
    }, [inputBoxes, relationName])
    console.log(data)

    function getfdsList(step) {
        return step !== undefined ? <ol>
            {Object.keys(step).map(i => {
                return <li key={i}> {step[i][0].toString().replaceAll(',', ', ') + " --> " + step[i][1]} </li>
            })}
        </ol> : "Error";
    }
    function minimalCover(){
        return (
            <div className="minimal-cover-result ">
                <h4>Minimal Cover Result: </h4>
                {getfdsList(data.step_3)}
            </div>
        );

    }
    function fds(){
        //console.log(typeof data.step_3);
        if(Object.keys(data).length>=1){
            for(let i = 0;i<data['step_3'].length;i++){
                console.log('---',data['step_3'][i]);
            }
        }


    }
    fds()

    return (
        <React.Fragment>
            <div className="mx-4">
                <hr></hr>
                <button onClick={()=>setToggle(!toggle)}>Show Steps</button>
                    {toggle &&
                        minimalCover()

                    }
            </div>

        </React.Fragment>
    );

}

export default DetailReason