import React, {useEffect, useState} from 'react'
import axios from "axios";
import my_data from "../../store/data";
import '../../assets/css/relation.css'
import {inputBoxes_data} from "../../store/inputBoxes_dataStore";
import Bold from "../general_UI/Bold";
import './detailReason.css';
import CollapseDiv from "../div_collapse/CollapseDiv";


const DetailReason = (props) => {
    const [toggle, setToggle] = useState(false);
    const inputBoxes = my_data.getRawState().inputBoxes
    const relationName = inputBoxes_data.getRawState().relationName
    const [data, setData] = useState({});
    // const data = props.minimalCover;
    // console.log('Minimal Cover ', data)

    useEffect(() => {
        axios.post('http://127.0.0.1:5000/minimalCover', {inputBoxes, relationName})
            .then(res => {
                console.log('call', res.data['result']);
                setData(res.data['result'])
            })
    }, [])

    function getfdsList(step) {
        return step !== undefined ? <ol>
            {Object.keys(step).map(i => {
                return <li key={i}> {formatArray(step[i][0])} --> {formatArray(step[i][1])} </li>
            })}
        </ol> : "Error";
    }

    function minimalCover() {
        return (
            <div className="minimal-cover-result ">
                <span className='d-minimal-cover-header'>Minimal Cover Result: </span>
                {getfdsList(data.step_3)}
            </div>
        );
    }

    const getPrimaryKeys = () => {
        return inputBoxes.map(input => {
            if (input.primary) {
                return input.value;
            }
            return ''
        }).filter(i => i !== '');
    }

    const appendRoundComponent = (i, reason) => {
        if (i === 1)
            reason.push(<><span className='round'><Bold>Round {i}: </Bold></span></>);
        else
            reason.push(<><br/><span className='round'><Bold>Round {i}: </Bold></span></>);
    }

    const fdLine = (lhs, rhs) => {
        return <span>
            The FD <b>{`{${lhs.toString().replaceAll(',', ', ')}}`} </b> --> <b> {`{${rhs}}`}</b>
        </span>
    }
    const formatArray = (array) => {
        return <span>
            {`{${array.toString().replaceAll(',', ', ')}}`}
        </span>
    }
    function nf_2Reason() {
        let reason = [];
        const primaryKey = getPrimaryKeys().toString();

        if (Object.keys(data).length >= 1) {
            for (let i = 1; i <= Object.keys(data['step_3']).length; i++) {
                for (let j = 0; j < 1; j++) {
                    appendRoundComponent(i, reason);
                    if (data['step_3'][i][j] === primaryKey || (primaryKey.includes(data['step_3'][i][j][0]) && primaryKey.includes(data['step_3'][i][j][1])) || (data['step_3'][i][j] === primaryKey || ((primaryKey.includes(data['step_3'][i][j][0]) || primaryKey.includes(data['step_3'][i][j][1]))))) {
                        reason.push(<span>
                            {fdLine(data['step_3'][i][j], data['step_3'][i][j + 1])} is already in 2NF.
                            </span>)
                    } else {
                        reason.push(
                            <span>
                                {fdLine(data['step_3'][i][j], data['step_3'][i][j + 1])} is a partial dependency. As LHS  <b>{formatArray(data['step_3'][i][j])}</b> is a proper subset of <b>{formatArray(primaryKey)}</b> which is a PK, so we split it.
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
        const primaryKey = getPrimaryKeys().toString();
        let reason = []
        if (Object.keys(data).length >= 1) {
            for (let i = 1; i < (Object.keys(data['step_3']).length) + 1; i++) {
                appendRoundComponent(i, reason);
                for (let j = 0; j < 1; j++) {
                    if (data['step_3'][i][j] === primaryKey || ((primaryKey.includes(data['step_3'][i][j][0]) || primaryKey.includes(data['step_3'][i][j][1])))) {
                        reason.push(
                            <span>
                                {fdLine(data['step_3'][i][j], data['step_3'][i][j + 1])} is already in 3NF.
                            </span>
                        )
                    } else {
                        reason.push(
                            <span>
                                {fdLine(data['step_3'][i][j], data['step_3'][i][j + 1])} is a transitive dependency. As LHS <b>{formatArray(data['step_3'][i][j])}</b> is not Primary Key, so we split it into a new relation.
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

    function bnfReason() {
        const primaryKey = getPrimaryKeys().toString();
        let reason = []
        if (Object.keys(data).length >= 1) {
            for (let i = 1; i < (Object.keys(data['step_3']).length) + 1; i++) {
                appendRoundComponent(i, reason);
                if ((primaryKey.includes(data['step_3'][i][i])) || (primaryKey.includes(data['step_3'][i][i]))) {
                    reason.push(
                        <span>
                            BC-NF works on Primary key dependency. As in FD <b>
                            {formatArray(data['step_3'][i][i - 1])}
                            </b> --> <b>{formatArray(data['step_3'][i][i])}</b>, LHS <b>{formatArray(data['step_3'][i][i - 1])}</b> is Pk, so it would be separated as new relation.
                        </span>
                    )
                } else {
                    reason.push(
                        <span>
                            {fdLine(data['step_3'][i][0], data['step_3'][i][1])} is already in BCNF.
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

    function getType() {
        if (props.type === '2nd') {
            return nf_2Reason()
        } else if (props.type === '3rd') {
            return nf_3Reason()
        } else {
            return bnfReason()
        }
    }

    return (
        <React.Fragment>
            <div className="m-4">
                <hr/>
                <CollapseDiv
                    cardTitle={'Detail Reason Through Minimal Cover'}
                    isOpen={false}
                    bodyColor={'body-grey'}
                >
                    <div className="">
                        <p className="card-text"> {minimalCover()}</p>
                        <hr/>
                        <span className="d-minimal-cover-header">Resolving FDs</span>
                        <p className="card-text mt-1"> {getType()}</p>
                    </div>
                </CollapseDiv>
            </div>

        </React.Fragment>
    );

}

export default DetailReason