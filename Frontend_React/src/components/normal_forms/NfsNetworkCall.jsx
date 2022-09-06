import React, {useEffect, useState} from "react";
import GeneralLoader from "../full_page_loader/GeneralLoader";
import ErrorModal from "../modal/ErrorModal";
import axios from "axios";
import my_data from "../../store/data";
import {inputBoxes_data} from "../../store/inputBoxes_dataStore";

const NfsNetworkCall = (props) => {
    const inputBoxes = my_data.getRawState().inputBoxes;
    const relationName = inputBoxes_data.getRawState().relationName;

    const [generalLoader, setGeneralLoader] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [error, setError] = useState(null);

    function handleError(error) {
        console.log(error);
        setError(error.toString() + "\nTry Restarting Server.");
        setGeneralLoader(false);
        setVisibility(true);
    }

    useEffect(() => {
        setGeneralLoader(true);
        axios.post(props.url, {inputBoxes, relationName})
            .then(res => {
                props.setData(res.data['result']);
                props.setRelationNames(res.data['relation_names']);
                setGeneralLoader(false);
            }).catch(error => {
                handleError(error);
        })
    }, [])

    return (
        <>
            {generalLoader && <GeneralLoader loading={generalLoader} message={<span>Loading...</span>}/>}
            {visibility &&
            <ErrorModal
                show={visibility}
                message={error}
                setShow={() => setVisibility(false)}
            />
            }
        </>
    );
}

export default NfsNetworkCall;