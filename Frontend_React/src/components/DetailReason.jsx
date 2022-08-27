import React, {useEffect, useState} from 'react'
import axios from "axios";
import my_data from "../store/data";
import '../assets/css/relation.css'
import {inputBoxes_data} from "../store/inputBoxes_dataStore";
import Bold from "./general_UI/Bold";


const DetailReason = (props) => {
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
    console.log('Data => ', data)

    function getfdsList(step) {
        return step !== undefined ? <ol>
            {Object.keys(step).map(i => {
                return <li key={i}> {step[i][0].toString().replaceAll(',', ', ') + " --> " + step[i][1]} </li>
            })}
        </ol> : "Error";
    }

    function minimalCover() {
        return (
            <div className="minimal-cover-result ">
                <h4>Minimal Cover Result: </h4>
                {getfdsList(data.step_3)}
            </div>
        );

    }

    const getPrimarKeys = () => {
        return inputBoxes.map(input => {
            if (input.primary) {
                return input.value;
            }
            return ''
        }).filter(i => i !== '');
    }
    const getMultiValued = () => {
        return inputBoxes.map(input => {
            if (input.multiValue) {
                return input.value;
            }
            return ''
        }).filter(i => i !== '');
    }


    function nf_2Reason() {
        let reason = [];


        const primaryKey = getPrimarKeys().toString();

        if (Object.keys(data).length >= 1) {
            for (let i = 1; i <= Object.keys(data['step_3']).length; i++) {

                for (let j = 0; j < 1; j++) {

                    reason.push(<><br/><Bold>Round {i}: </Bold></>)
                    // string += `Round ${i}`;

                    if (data['step_3'][i][j] == primaryKey || (primaryKey.includes(data['step_3'][i][j][0]) && primaryKey.includes(data['step_3'][i][j][1]))) {


                        // string += `The FD ${data['step_3'][i][j]}  --> ${data['step_3'][i][j+1]} is already in 2NF`;

                        reason.push(<span>
                            The FD <b>{data['step_3'][i][j]} </b> --> <b> {data['step_3'][i][j+1]}</b> is already in 2NF
                            </span>)

                    }

                    else  {
                        reason.push(
                          <span>
                              The FD <b>{data['step_3'][i][j]}</b> --> <b>{data['step_3'][i][j+1]}</b> is a partial dependency As LHS  <b>{data['step_3'][i][j]}</b> is a proper subset of <b>{primaryKey}</b> which is a PK , so we split it
                              {/*string += `The FD ${data['step_3'][i][j]} --> ${data['step_3'][i][j+1]} is a partial dependency As LHS  ${data['step_3'][i][j]} is a proper subset of ${primaryKey} which is a PK , so we split it`*/}
                         </span>
                        )

                    }

                }
            }
        }

        return (
            <div>
                {reason}
            </div>

        );

    }

    function nf_3Reason() {
        const primaryKey = getPrimarKeys().toString();
        let reason = []
        let string = ''
        if (Object.keys(data).length >= 1) {
            for (let i = 1; i < (Object.keys(data['step_3']).length)+1; i++) {
                // string += `Round  ${i} `
                reason.push(<><br/><Bold>Round {i}: </Bold></>)
                for (let j = 0; j < 1; j++) {
                    console.log(data['step_3'][i][j].toString())
                    console.log(primaryKey)
                    if (data['step_3'][i][j] === primaryKey || ((primaryKey.includes(data['step_3'][i][j][0]) || primaryKey.includes(data['step_3'][i][j][1])))) {
                        reason.push(
                            <span>
                                The FD <b>{data['step_3'][i][j]} </b> --> <b>{data['step_3'][i][j+1]}</b> is already in 3NF;
                            </span>
                    )}
                    else  {
                        reason.push(
                            <span>
                                The FD <b>{data['step_3'][i][j]}</b> --> <b>{data['step_3'][i][j+1]}</b> is a transitive dependency As LHS <b>{data['step_3'][i][j]}</b> is not PrimaryKey, so we split it into a new relation
                            </span>
                                )
                    }

                }

            }
        }
        return (<div>
                {reason}
            </div>
        );

    }

    function bnfReason() {
        const primaryKey = getPrimarKeys().toString();
        let reason = []
        let string = ''
        if (Object.keys(data).length >= 1) {

            for (let i = 1; i < (Object.keys(data['step_3']).length)+1; i++) {
                console.log(data['step_3'][i][i])
                reason.push(<><br/><Bold>Round {i}: </Bold></>)
                // string += `Round  ${i}`
                if ((primaryKey.includes(data['step_3'][i][i])) || (primaryKey.includes(data['step_3'][i][i]))) {
                    reason.push(
                        <span>
                            BC-NF works on Primary key dependency. As in FD <b>{data['step_3'][i][i-1]}</b> --> <b>{data['step_3'][i][i]}</b> ,LHS <b>{data['step_3'][i][i-1]}</b> is Pk so it would be separated as new relation.
                        </span>
                    )

                }
                else {
                    reason.push(
                        <span>
                            The FD <b>{data['step_3'][i][0]} </b> --> <b>{data['step_3'][i][1]}</b> is already in BCNF

                        </span>
                    )

                }

            }
        }
        return (<div>
                {reason}
            </div>
        );

    }


    function  getType(){


        if(props.type == '2nd'){
            return nf_2Reason()

        }
        else if (props.type == '3rd'){
            return nf_3Reason()
        }
        else
            return bnfReason()

    }
    return (
        <React.Fragment>
            <div className="mx-4">
                <hr></hr>
                <button onClick={() => setToggle(!toggle)}>Show Steps</button>
                {(toggle) ?
                    // <div>
                    //
                    //     { getType() }
                    // </div>

                        <div className="row mt-2">
                            <div className="col-sm-8">
                                <div className="card">
                                    <div className="card-header">
                                        Reason through Minimal Cover
                                    </div>
                                    <div className="card-body">
                                        {/*<h5 className="card-title">hth</h5>*/}
                                        <p className="card-text"> { minimalCover() }</p>
                                        <h5 className="card-title">Resolving FDs</h5>
                                        <p className="card-text"> { getType() }</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    : ''
                }
            </div>

        </React.Fragment>
    );

}

export default DetailReason