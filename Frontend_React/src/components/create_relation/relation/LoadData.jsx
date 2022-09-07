import axios from "axios";
import React, {useEffect, useState} from "react";
import {inputBoxes_data} from "../../../store/inputBoxes_dataStore";
import ErrorModal from "../../modal/ErrorModal";
import GeneralLoader from "../../full_page_loader/GeneralLoader";
import { FaUpload } from "react-icons/fa";
import '../../../assets/css/icon.css';

const LoadData = (props) => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState('');

    const [generalLoader, setGeneralLoader] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [error, setError] = useState(null);

    const hiddenFileInput = React.useRef(null);

    useEffect(() => {
        if (data !== '') {
            inputBoxes_data.update(s => {
                s.inputBoxes = data['inputBoxes']
                s.relationName = data['relationName']
            });
            props.setIsLoadWork(true);
            console.log('Updated')
        }
    }, [data])

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    function handleError(error) {
        console.log(error);
        setError(error.toString() + "\nTry Restarting Server.");
        setGeneralLoader(false);
        setVisibility(true);
    }

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setGeneralLoader(true);
        setFile(fileUploaded);
        const data = new FormData();
        data.append('file', fileUploaded);
        axios.post('http://127.0.0.1:5000/loadData', data)
            .then(res => {
                setGeneralLoader(false);
                if (res.data !== 0) {
                    setData(res.data);
                } else
                    handleError("Error! There is some error in Flask Server.");
            }).catch(err => {
            handleError(err);
        });
        event.target.value = null;
    };

    return (
        <>
            {generalLoader && <GeneralLoader loading={generalLoader} message={<span>Extracting your work <br/>
                    Please wait...</span>}/>}
            {visibility &&
            <ErrorModal
                show={visibility}
                message={error}
                setShow={() => setVisibility(false)}
            />
            }
            <button onClick={handleClick} className='btn btn-sm btn-secondary ms-2'>
                {/*<FaUpload className='icon-FaUpload' />*/}
                Load Work
            </button>
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{display: 'none'}}
            />
        </>
    );

}

export default LoadData;