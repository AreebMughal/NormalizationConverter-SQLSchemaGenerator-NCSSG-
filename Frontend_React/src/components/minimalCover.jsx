import React, {useEffect, useLayoutEffect, useState} from 'react'
import axios from "axios";
import my_data from "../store/data";
import FdList from "./drawing_tool/fdList";
import '../assets/css/relation.css'


function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

function MinimalCover() {
    const [width, height] = useWindowSize();
    const inputBoxes = my_data.getRawState().inputBoxes
    const relationName = my_data.getRawState().relationName
    const [data, setData] = useState([{}])


    useEffect(() => {
        axios.post('http://127.0.0.1:5000/members', {inputBoxes, relationName})
            .then(res => {
                console.log(res.data)
                setData(res.data['result'])
            })
    }, [inputBoxes, relationName])


    function getfdsList(step) {
        return step !== undefined ? <ol>
            {Object.keys(step).map(i => {
                return <li key={i}> {step[i][0].toString().replaceAll(',', ', ') + " --> " + step[i][1]} </li>
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

    return (
        <div className='m-3'>
            {(checkFds()) ?
                <div className="main d-flex flex-wrap ms-3">
                    <div className="minimal-cover-result col-lg-5 col-md-5 col-sm-12">
                        <div className="Fds-list">
                            <FdList
                                key={1}
                                inputBoxes={inputBoxes}
                            />
                        </div>
                        <div className="minimal-cover-result ">
                            <h4>Minimal Cover Result: </h4>
                            {getfdsList(data.step_3)}
                        </div>
                    </div>
                    {(width >= 880) &&
                    <div className='vertical-line ms-5 me-5'/>
                    }
                    {(width < 880) &&
                    <hr className='col-sm-12 horizontal-line'/>
                    }
                    <div className='minimal-cover-steps col-lg-5 col-md-5 col-sm-12'>
                        <h4>Steps:</h4>
                        <div className="step-1">
                            <h5>Step-1 - Splitting LHS From FDs: </h5>
                            {getfdsList(data.step_1)}
                        </div>
                        <div className="step-2">
                            <h5>Step-2 - Remove Extraneous Attribute (RHS): </h5>
                            {getfdsList(data.step_2)}
                        </div>
                        <div className="step-3">
                            <h5>Step-3 - Remove Redundant FD: </h5>
                            {getfdsList(data.step_3)}
                        </div>
                    </div>

                </div>
                :
                <div className="alert alert-danger">
                    <h5 className="">No Dependency Found</h5>
                </div>
            }
        </div>
    );
}

export default MinimalCover