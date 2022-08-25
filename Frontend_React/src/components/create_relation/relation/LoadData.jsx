import axios from "axios";
import React, {useEffect, useState} from "react";
import {inputBoxes_data} from "../../../store/inputBoxes_dataStore";
import ErrorModal from "../../modal/ErrorModal";


const LoadData = (props) => {
    const [file, setFile] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [data, setData] = useState('');

    // const [error, setError] = useState(null);
    let error = '';
    const hiddenFileInput = React.useRef(null);
    //
    // const saveDataClickHandler = (e) => {
    //     const data = new FormData();
    //     data.append('file', file);
    //     axios.post('http://127.0.0.1:5000/loadData', data)
    //         .then(res => {
    //             if (res.data !== 0) {
    //                 console.log('=> Data:', res.data);
    //                 setData(res.data);
    //             }
    //         }).catch(err => {
    //         console.log(err);
    //         error = err.toString();
    //     });
    // }

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

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded);
        const data = new FormData();
        data.append('file', fileUploaded);
        axios.post('http://127.0.0.1:5000/loadData', data)
            .then(res => {
                if (res.data !== 0) {
                    // console.log('=> Data:', res.data);
                    setData(res.data);
                }
            }).catch(err => {
            console.log(err);
            error = err.toString();
            setVisibility(true);
        });
        event.target.value = null;
    };
    const setShow = () => setVisibility(false);
    return (
        <>
            {visibility &&
            <ErrorModal
                show={visibility}
                message={error}
                setShow={setShow}
            />
            }
            <button onClick={handleClick} className='btn btn-sm btn-secondary ms-2'>
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