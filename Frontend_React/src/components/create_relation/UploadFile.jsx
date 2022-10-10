import React, {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import axios from "axios";
import './css/uploadFile.css'
import {inputBoxes_data} from "../../store/inputBoxes_dataStore";
import ErrorModal from "../modal/ErrorModal";
import Bold from "../general_UI/Bold";

const fileTypes = ["CSV"];

function UploadFile(props) {
    const [file, setFile] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState('');
    const fileUploaderRef = React.useRef();
    const fileUploaderLabel = 'Upload or drag a CSV file right here - Dataset to Extract Functional Dependencies (CSV File Only)';

    const handleError = (errMsg) => {
        console.log(errMsg);
        setError(errMsg);
        setFile(null);
        setVisibility(true);
        props.setIsFdMine(false);
        props.setLoader(false);
    }

    useEffect(() => {
        if (file !== null) {
            props.setLoader(true);
            const data = new FormData();
            data.append('file', file);
            console.log(data)
            axios.post("http://127.0.0.1:5000/fdMining", data)
                .then(res => {
                    if (res.data !== 0) {
                        console.log('=> Data:', res.data);
                        setData(res.data);
                    } else setError('Error! There is some problem in Flask Server.');
                }).catch(err => {
                handleError(err.toString());
                props.setSuggestion('');
            });
        }
    }, [file]);

    useEffect(() => {
        if (data !== '') {
            inputBoxes_data.update(s => {
                s.inputBoxes = data['data']['inputBoxes']
                s.relationName = data['data']['relationName']
            })
            props.setIsFdMine(true);
            props.setSuggestion(getSuggestion());
        }
    }, [data])

    useEffect(() => {
        if (file === null) {
            // const FileUploader = fileUploaderRef.current
            fileUploaderRef.current.childNodes[0].childNodes[0].value = null;
        }
    }, [file]);


    const handleChange = (file) => {
        console.log(file);
        setFile(file);
    }

    const setShow = () => setVisibility(false);

    const getSuggestion = () => {
        if (data !== undefined && Object.keys(data).length > 0 && data['keys'].length > 0) {
            const keys = '{' + data['keys'].toString().replaceAll(',', ', ') + '}'
            return (
                <span>
                    {/*<Bold>Note: </Bold> <br/>*/}
                    All Functional Dependencies are first extracted and then filtered through Minimal Cover.
                    <br/>
                    And the set <Bold>{keys}</Bold> is identifying most attributes, that why we made it <Bold>Primary Key</Bold>. <br/>
                    You can change Primary key and Functional Dependencies as per your need.
                </span>
            );
        }
        return '';
    }

    const my_error = (err) => {
        console.log(err.toString().toLowerCase().includes('file type is not supported'));
        if (err.toString().toLowerCase().includes('file type is not supported')) {
            console.log('YES');
            handleError(err + '.\nOnly "CSV" file is supported.');
        }
    }
    return (
        <>
            {visibility &&
            <ErrorModal
                show={visibility}
                message={error}
                setShow={setShow}
            />
            }
            <div className="container pt-2" ref={fileUploaderRef}>
                <FileUploader handleChange={handleChange} name="file"
                              types={fileTypes}
                              classes='upload-file col-lg-12'
                              label={fileUploaderLabel}
                              hoverTitle='Drop here'
                              onTypeError={(err) => my_error(err)}
                />
            </div>
        </>
    );
}

export default UploadFile;