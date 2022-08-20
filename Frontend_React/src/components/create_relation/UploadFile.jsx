import React, {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import axios from "axios";
import './css/uploadFile.css'
import {inputBoxes_data, suggestion_store} from "../../store/inputBoxes_dataStore";
import ErrorModal from "../modal/ErrorModal";
import Bold from "../general_UI/Bold";

const fileTypes = ["CSV"];

function UploadFile(props) {
    const [file, setFile] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState('');
    const fileUploaderRef = React.useRef();
    const fileUploaderLabel = 'Upload or drag a file right here - Dataset to Extract Functional Dependencies';

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
                    }
                }).catch(err => {
                console.log(err);
                setError(err.toString());
                setFile(null);
                setVisibility(true);
                props.setIsFdMine(false);
                props.setLoader(false);
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
        setFile(file);
    }

    const setShow = () => setVisibility(false);

    const getSuggestion = () => {
        if (data !== undefined && Object.keys(data).length > 0 && data['keys'].length > 0) {
            const keys = '{' + data['keys'].toString().replaceAll(',', ', ') + '}'
            return (
                <span>
                    <Bold>Note: </Bold> <br/>
                    All Functional Dependencies are first extracted by <a href="https://pypi.org/project/fdtool/" target='_blank'>FDtool</a> and then filtered through Minimal Cover.
                    <br/>
                    And the set <Bold>{keys}</Bold> is identifying most attributes, that why we made it <Bold>Primary Key</Bold>. <br/>
                    You can change Primary key and Functional Dependencies as per your need.
                </span>
            );
        }
        return '';
    }
    getSuggestion();
    return (
        <>
            {visibility &&
            <ErrorModal
                show={visibility}
                message={error}
                setShow={setShow}
            />
            }
            <div className="container pt-2" ref={fileUploaderRef} >
                <FileUploader handleChange={handleChange} name="file"
                              types={fileTypes}
                              classes='upload-file col-lg-12'
                              label={fileUploaderLabel}
                              hoverTitle='Drop here'
                />
            </div>
        </>
    );
}

export default UploadFile;