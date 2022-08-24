import React, {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import axios from "axios";
import './css/uploadFile.css'
import {inputBoxes_data} from "../../store/inputBoxes_dataStore";

const fileTypes = ["CSV"];

function UploadFile(props) {
    const [file, setFile] = useState(null);

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
                        inputBoxes_data.update(s => {
                            s.inputBoxes = res.data['inputBoxes']
                            s.relationName = res.data['relationName']
                        })
                        props.setIsFdMine(true);
                    }
                });
        }

    }, [file]);

    const fdMiningClickHandler = (e) => {

    }

    const fileUploaderClickHandler = (e) => {
        // setFile(null);
    }
    const handleChange = (file) => {
        setFile(file);
    };
    return (
        <div className="container pt-2">
            <FileUploader handleChange={handleChange} onClick={fileUploaderClickHandler} name="file"
                          types={fileTypes}
                          classes='upload-file col-lg-12'
                          label={'Upload or drag a file right here - Dataset to Extract Functional Dependencies'}
                          hoverTitle='Drop here'
            />
            {/*<button className='btn btn-primary btn-sm' onClick={fdMiningClickHandler}>FD Mining</button>*/}
        </div>
    );
}

export default UploadFile;