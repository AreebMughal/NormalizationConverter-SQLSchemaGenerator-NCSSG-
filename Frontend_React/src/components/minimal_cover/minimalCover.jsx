import React, {useEffect, useLayoutEffect, useState} from 'react'
import axios from "axios";
import my_data from "../../store/data";
import '../../assets/css/relation.css'
import {inputBoxes_data} from "../../store/inputBoxes_dataStore";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ErrorModal from "../modal/ErrorModal";
import MinimalCoverModal from "./MinimalCoverModal";
import './minimalCover.css';
import CollapseDiv from "../div_collapse/CollapseDiv";
import VerticalHorizontalLine from "./VerticalHorizontalLine";




const MinimalCover = () => {
    const inputBoxes = my_data.getRawState().inputBoxes;
    const relationName = inputBoxes_data.getRawState().relationName;
    const [data, setData] = useState('')

    const [visibility, setVisibility] = useState(false);
    const [error, setError] = useState(null);


    // const max = document.getElementById('vertical-line').offsetHeight - height + 'px'
    // console.log(document.getElementById('vertical-line').offsetHeight, height)
    // console.log(max)
    // document.getElementById('vertical-line').style.maxHeight = max;
    function handleError(error) {
        console.log(error);
        setError(error.toString() + "\nTry Restarting Server.");
        setVisibility(true);
    }

    useEffect(() => {
        axios.post('http://127.0.0.1:5000/minimalCover', {inputBoxes, relationName})
            .then(res => {
                console.log(res.data)
                setData(res.data['result'])
            }).catch(error => {
            handleError(error);
        });
    }, [inputBoxes, relationName])


    function getfdsList(step) {
        return step !== undefined ? <ol>
            {Object.keys(step).map(i => {
                return <li key={i}> {step[i][0].toString().replaceAll(',', ', ')} <FontAwesomeIcon
                    icon={faArrowRight} className="ms-1 me-1"/> {step[i][1]} </li>
            })}
        </ol> : "Error";
    }

    function checkFds() {
        let bool = false
        for (let i = 0; i < inputBoxes.length; i++) {
            if (inputBoxes[i].dependency[0].length > 0) {
                bool = true
                break
            }
        }
        return bool
    }

    console.log(Object.keys(data).length)
    return (
        <React.Fragment>
            {visibility &&
            <ErrorModal
                show={visibility}
                message={error}
                setShow={() => setVisibility(false)}
            />
            }
            <div className="p-3 background">
                <div className="row ps-3 pe-3">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <MinimalCoverModal
                            cardHeader={'Current Functional Dependencies'}
                            cardClass={'_current-fd'}
                            headerClass={'_current-fd-header'}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <MinimalCoverModal
                            cardHeader={'Minimal Cover Result'}
                            cardClass={'_minimal-cover-res'}
                            headerClass={'_minimal-cover-res-header'}
                        />
                    </div>
                </div>
                <CollapseDiv
                    cardTitle={'Minimal Cover\'s Steps:'}
                    isOpen={true}
                >
                    <div className="ps-2 pe-2">
                        <div className="d-flex flex-wrap">
                            <div className="step-1 m-1 flex-grow-1">
                                <h6 className='minimal-cover-step'>Step-1 - Splitting RHS From FDs: </h6>
                                {getfdsList(data.step_1)}
                            </div>
                            <VerticalHorizontalLine />
                            <div className="step-2 m-1 flex-grow-1">
                                <h6 className='minimal-cover-step'>Step-2 - Remove Extraneous Attribute (LHS): </h6>
                                {getfdsList(data.step_2)}
                            </div>
                            <VerticalHorizontalLine />
                            <div className="step-3 m-1 flex-grow-1">
                                <h6 className='minimal-cover-step'>Step-3 - Remove Redundant FD: </h6>
                                {getfdsList(data.step_3)}
                            </div>
                        </div>
                    </div>
                </CollapseDiv>
            </div>

            {/* <div className='m-3'>

                {(checkFds()) ?
                    <div className="main d-flex flex-wrap ms-3">
                        <div className="minimal-cover-result col-lg-5 col-md-5 col-sm-12">
                            <div className="Fds-list">
                                <FdList
                                    key={1}
                                    inputBoxes={inputBoxes}
                                />
                            </div>
                            {(typeof data !== "string") &&
                            <div className="minimal-cover-result ">
                                <h4>Minimal Cover Result: </h4>
                                {getfdsList(data.step_3)}
                            </div>
                            }
                        </div>
                        {(typeof data !== "string") &&
                        <>
                            {(width >= 880) &&
                            <div id='vertical-line' className='vertical-line ms-5 me-5'/>
                            }
                            {(width < 880) &&
                            <hr className='col-sm-12 horizontal-line'/>
                            }
                        </>
                        }
                        {(typeof data !== "string") ?
                            <div className='minimal-cover-steps col-lg-5 col-md-5 col-sm-12'>
                                <h4>Steps:</h4>
                                <div className="step-1">
                                    <h5>Step-1 - Splitting RHS From FDs: </h5>
                                    {getfdsList(data.step_1)}
                                </div>
                                <div className="step-2">
                                    <h5>Step-2 - Remove Extraneous Attribute (LHS): </h5>
                                    {getfdsList(data.step_2)}
                                </div>
                                <div className="step-3">
                                    <h5>Step-3 - Remove Redundant FD: </h5>
                                    {getfdsList(data.step_3)}
                                </div>
                            </div>
                            :
                            <h6 className="text-danger mt-3">No Result Found from Minimal Cover. <br/> Try <Bold>restarting
                                your server.</Bold></h6>
                        }
                    </div>
                    :
                    <div className="alert alert-danger">
                        <h5 className="">No Dependency Found</h5>
                    </div>
                }
            </div>*/}
        </React.Fragment>

    );
}

export default MinimalCover