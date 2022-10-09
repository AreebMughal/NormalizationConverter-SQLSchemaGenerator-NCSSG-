import React, {useEffect, useState} from 'react'
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
import {isDataEmpty} from "../../assets/js/emptyDataCheck";
import {Navigate} from "react-router-dom";
import GeneralLoader from "../full_page_loader/GeneralLoader";

const MinimalCover = () => {
    const inputBoxes = my_data.getRawState().inputBoxes;
    const relationName = inputBoxes_data.getRawState().relationName;
    const [data, setData] = useState('')

    const [visibility, setVisibility] = useState(false);
    const [error, setError] = useState(null);
    const [generalLoader, setGeneralLoader] = useState(true);

    function handleError(error) {
        console.log(error);
        setError(error.toString() + "\nTry Restarting Server.");
        setVisibility(true);
    }

    const minimalCoverNetworkCall = async () => {
        await axios.post('http://127.0.0.1:5000/minimalCover', {inputBoxes, relationName})
            .then(res => {
                console.log('result', res.data);
                setData(res.data['result']);
                setGeneralLoader(false);
            }).catch(error => {
                setGeneralLoader(false);
                handleError(error);
            });
    }
    console.log('Data => ', inputBoxes);
    useEffect(() => {
        minimalCoverNetworkCall();
    }, [inputBoxes, relationName])


    function getFdsList(step) {
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
            {generalLoader && <GeneralLoader loading={generalLoader} message={<span>Loading...</span>}/>}

            {isDataEmpty(inputBoxes, relationName) ?
                <Navigate replace to={'/NC-SSG/DrawingTool'}/>
                :
                <>
                    {visibility &&
                    <ErrorModal
                        show={visibility}
                        message={error}
                        setShow={() => setVisibility(false)}
                    />
                    }

                    {(checkFds() && typeof data !== "string") ?
                        <div className="p-3 background">
                            <div className="row ps-3 pe-3">
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <MinimalCoverModal
                                        cardHeader={'Current Functional Dependencies'}
                                        cardClass={'_current-fd'}
                                        headerClass={'_current-fd-header'}
                                        fdList={true}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <MinimalCoverModal
                                        cardHeader={'Minimal Cover Result'}
                                        cardClass={'_minimal-cover-res'}
                                        headerClass={'_minimal-cover-res-header'}
                                        step3={getFdsList(data.step_3)}
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
                                            {getFdsList(data.step_1)}
                                        </div>
                                        <VerticalHorizontalLine/>
                                        <div className="step-2 m-1 flex-grow-1">
                                            <h6 className='minimal-cover-step'>Step-2 - Remove Extraneous Attribute
                                                (LHS): </h6>
                                            {getFdsList(data.step_2)}
                                        </div>
                                        <VerticalHorizontalLine/>
                                        <div className="step-3 m-1 flex-grow-1">
                                            <h6 className='minimal-cover-step'>Step-3 - Remove Redundant FD: </h6>
                                            {getFdsList(data.step_3)}
                                        </div>
                                    </div>
                                </div>
                            </CollapseDiv>
                        </div>
                        :
                        <h5 className='mt-5 ms-5'>Server has been stopped. Kindly start or restart your server.</h5>
                    }
                </>
            }
        </React.Fragment>
    );
}

export default MinimalCover